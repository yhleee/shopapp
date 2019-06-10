package kr.co.oliveyoung.shopapp.services.api.product;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
public class ProductDetailParserController {

    @GetMapping("/product/barcode/{barcode}")
    public ApiResponseMessage getProductPidFromBarcode(HttpServletResponse response, @PathVariable("barcode") String barcode) {
        String barcodeUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsDetailBarcode.do?itemNo=" + barcode;
        String barcodeHtml = requestUrl(barcodeUrl);
        Document document = Jsoup.parse(barcodeHtml);
        String pid = null;
        try {
            pid = document.body().getElementById("goodsNo").attr("value");
            log.info("==== PID : {}", pid);
        } catch (Exception e) {
            log.error("바코드 상품조회 중 오류가 발생하였습니다.", e);
            response.setStatus(204);
            return null; // new ApiResponseMessage(ResponseResult.FAIL, "존재하지 않는 상품코드 입니다.", null);
        }
        return parseProductDetail(response, pid);
    }

    @GetMapping("/product/detail/parser/{pid}")
    public ApiResponseMessage parseProductDetail(HttpServletResponse response, @PathVariable("pid") String pid) {
        String productUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsDetail.do?goodsNo=" + pid;
        String productDetailUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsDesc.do?goodsNo=" + pid;
        String goodsInfoUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsArtcAjax.do?goodsNo=" + pid;
        String reviewUrl = "https://m.oliveyoung.co.kr/m/goods/getGdasSummaryAjax.do?goodsNo=" + pid;

        if (pid == null) {
            response.setStatus(400);
            return new ApiResponseMessage(ResponseResult.FAIL, "상품번호가 없습니다.", null);
        }

        ProductDetailInfo result = new ProductDetailInfo();
        result.setPid(pid);
        Document document = null;
        try {
            String html = requestUrl(productUrl);
            document = Jsoup.parse(html);
            transformProductPage(document);
            // append product detail
            String productDetailHtml = requestUrl(productDetailUrl);
            Elements tabCont = document.body().getElementsByClass("line_tab_cont");
            tabCont.get(0).children().get(0).before(productDetailHtml);
            // append goods info
            String goodsInfoHtml = requestUrl(goodsInfoUrl);
            tabCont.get(1).children().get(0).before(goodsInfoHtml);
            document.body().getElementsByClass("listBuyInfo").get(0).remove();
            try {
                Document goodsInfoDocument = Jsoup.parse(goodsInfoHtml);
                Elements trElements = goodsInfoDocument.body().getElementsByTag("tr");
                for (Element trElement : trElements) {
                    String thText = trElement.getElementsByTag("th").get(0).text();
                    log.info("===== thText[{}]", thText);
                    if (thText.contains("용량")) {
                        result.setVolume(trElement.getElementsByTag("td").get(0).text());
                    }
                }
            } catch (Exception e) {}
            // append review
            String reviewHtml = requestUrl(reviewUrl);
            Document reviewDocument = Jsoup.parse(reviewHtml);
            removeUnusedReviewElements(reviewDocument);
            document.body().getElementById("gdasWrap").append(reviewDocument.outerHtml());
            try {
                String reviewStarHtml = reviewDocument.body().getElementsByClass("star_area").outerHtml();
                result.setReviewStarHtml(reviewStarHtml);
                String reviewPoint = reviewDocument.select("p.num > strong").get(0).text();
                result.setReviewPoint(reviewPoint);
                String reviewPollHtml = reviewDocument.body().getElementsByClass("poll_sample").outerHtml();
                result.setReviewPollHtml(reviewPollHtml);
            } catch (Exception e) {}
            // append script
            document.body().children().last().after(tabScript);
            // create result info
            setProductElementInfos(result, document);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        ApiResponseMessage message = null;
        if (result == null || result.getHtml() == null) {
//            message = new ApiResponseMessage(ResponseResult.FAIL, "상품 상세가 존재하지 않습니다.", null);
            response.setStatus(204);
        } else {
            message = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
            message.setContents(result);
        }
        return message;
    }

    private void setProductElementInfos(ProductDetailInfo detailInfo, Document document) {
        Element body = document.body();
        try {
            Element titleWrap = body.getElementsByClass("titBox").get(0);
            String brandNm = titleWrap.getElementsByTag("span").get(0).text();
            detailInfo.setBrandName(brandNm);
            String name = titleWrap.getElementsByTag("h3").get(0).text();
            detailInfo.setName(name);
            String imageUrl = body.getElementById("mainImage_1").attr("src");
            detailInfo.setImageUrl(imageUrl);
        } catch (Exception e) {}
        try {
            Elements priceSaleElements = body.select(".price_area");
            for (Element priceSaleElement : priceSaleElements) {
                String price = priceSaleElement.getElementsByClass("tx_info").get(0)
                        .getElementsByClass("eng").text();
                if (priceSaleElement.hasClass("sale")) {
                    detailInfo.setSalePrice(price);
                } else {
                    detailInfo.setPrice(price);
                }
            }
        } catch (Exception e) {}
        String html = document.toString();
        detailInfo.setHtml(html);
    }

    private void removeUnusedReviewElements(Document document) {
        Element body = document.body();
        try {
            body.getElementsByClass("btn_more").get(0).remove();
        } catch (Exception e) {}
        try {
            body.getElementsByClass("review_thum").get(0).remove();
        } catch (Exception e) {}
        try {
            body.getElementsByClass("poll_result").get(0).attr("style", "padding: 20px 0px;");
        } catch (Exception e) {}
    }

    private void removeUnusedElements(Document document) {
        Element body = document.body();
        body.getElementsByTag("script").remove();
        body.getElementsByTag("form").remove();
        body.getElementsByTag("input").remove();
        body.getElementById("webBanner_detail").remove();
        body.getElementById("mHeader").remove();
        body.getElementById("titConts").remove();
        body.getElementById("mFooter").remove();
        body.getElementById("related_items").remove();
        body.getElementById("curation_wrap").remove();
        body.getElementById("btnShare").remove();
        try {
            body.getElementsByClass("price_area gubun_bar").get(0).remove();
        } catch (Exception e) {}

        body.getElementsByClass("prd_buy_wrap").get(0).remove();
        Elements priceDetails = body.getElementsByClass("prd_detail_info").get(0).children();
        int priceDetailIndex = 0;
        for (Element element : priceDetails) {
            if (priceDetailIndex > 0) {
                element.remove();
            }
            priceDetailIndex++;
        }
        body.getElementById("moveBrandShop").remove();
        body.getElementsByClass("offlineBurialLink").get(0).remove();
        body.getElementById("regGdasBtn").parent().remove();
        body.getElementById("qnaInfo").remove();
    }

    private void transformProductPage(Document document) {
        document.head().children().last().after(this.style);
        removeUnusedElements(document);
        try {
            Elements tabMenus = document.body().getElementsByClass("line_tab_list").get(0).children();
            for (Element tabMenu : tabMenus) {
                tabMenu.attr("style", "width: 33.33%");
            }
        } catch (Exception e) {
            log.error("탭 메뉴 조작 중 에러", e);
        }
    }

    private void setMobileHeader(GetMethod method) {
        method.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36");
        method.setRequestHeader("Host", "m.oliveyoung.co.kr");
        method.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
    }

    private String requestUrl(String url) {
        try {
            HttpClientParams httpParams = new HttpClientParams();
            httpParams.setConnectionManagerClass(SimpleHttpConnectionManager.class);
            HttpClient client = new HttpClient(httpParams);
            GetMethod method = null;
            try {
                method = new GetMethod(url);
                setMobileHeader(method);
                int code = client.executeMethod(method);
                String response = IOUtils.toString(method.getResponseBodyAsStream(), "UTF-8");
                if (code != 200) {
                    throw new Exception("unexcepted result: " + code + " " + response);
                }
                return response;
            } catch (Exception e) {
            } finally {
                if (method != null) {
                    method.releaseConnection();
                }
            }
        } catch (Exception e) {
            return null;
        }
        return null;
    }

    private String style = "<style>\n" +
            "@media screen and (min-width: 500px) { #mContainer {zoom: 2;} }\n" +
            "</style>";

    private String tabScript = "<script>\n" +
            " var tabMenu1 = document.getElementById('productInfo');\n" +
            " var details = document.getElementsByClassName('line_tab_cont');\n" +
            " var tabMenu2 = document.getElementById('buyInfo');\n" +
            " var tabMenu3 = document.getElementById('gdasInfo');\n" +
            "\n" +
            " var clickTab1 = function () {\n" +
            "   if (tabMenu1.classList.value.indexOf('on') === -1) {\n" +
            "     tabMenu1.classList.add('on');\n" +
            "   }\n" +
            "   tabMenu2.classList.remove('on');\n" +
            "   tabMenu3.classList.remove('on');\n" +
            "\n" +
            "   if (details[0].classList.value.indexOf('show') === -1) {\n" +
            "     details[0].classList.add('show');\n" +
            "   }\n" +
            "   details[1].classList.remove('show');\n" +
            "   details[2].classList.remove('show');\n" +
            "   window.location.href='#productInfo';\n" +
            " }\n" +
            "\n" +
            " var clickTab2 = function () {\n" +
            "   if (tabMenu2.classList.value.indexOf('on') === -1) {\n" +
            "     tabMenu2.classList.add('on');\n" +
            "   }\n" +
            "   tabMenu1.classList.remove('on');\n" +
            "   tabMenu3.classList.remove('on');\n" +
            "\n" +
            "   if (details[1].classList.value.indexOf('show') === -1) {\n" +
            "     details[1].classList.add('show');\n" +
            "   }\n" +
            "   details[0].classList.remove('show');\n" +
            "   details[2].classList.remove('show');\n" +
            "   window.location.href='#productInfo';\n" +
            " }\n" +
            "\n" +
            " var clickTab3 = function () {\n" +
            "   if (tabMenu3.classList.value.indexOf('on') === -1) {\n" +
            "     tabMenu3.classList.add('on');\n" +
            "   }\n" +
            "   tabMenu2.classList.remove('on');\n" +
            "   tabMenu1.classList.remove('on');\n" +
            "\n" +
            "   if (details[2].classList.value.indexOf('show') === -1) {\n" +
            "     details[2].classList.add('show');\n" +
            "   }\n" +
            "   details[0].classList.remove('show');\n" +
            "   details[1].classList.remove('show');\n" +
            "   window.location.href='#productInfo';\n" +
            " }\n" +
            "\n" +
            "var mgoods = {};\nmgoods['detail'] = {};\n" +
            "mgoods.detail.openGiftFullPop = function () {\n" +
            " document.getElementById('giftFullPop').style.display = 'block';\n" +
            " document.getElementById('mContents').style.display = 'none';\n" +
            "}\n" +
            "var common = {};\n" +
            "common.popFullClose = function () {\n" +
            "   document.getElementById('giftFullPop').style.display = 'none';  \n" +
            "   document.getElementById('mContents').style.display = 'block';  \n" +
            "}\n" +
            " window.onload = function () {\n" +
            "   tabMenu1.addEventListener('click', clickTab1);\n" +
            "   tabMenu2.addEventListener('click', clickTab2);\n" +
            "   tabMenu3.addEventListener('click', clickTab3);\n" +
            " }\n" +
            "</script>";
}
