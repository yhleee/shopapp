package kr.co.oliveyoung.shopapp.services.api;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class ProductDetailParserController {

    @GetMapping("/product/detail/parser")
    public String ParseProductDetail(String pid) {
        String productUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsDetail.do?goodsNo=" + pid;
        String productDetailUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsDesc.do?goodsNo=" + pid;
        String goodsInfoUrl = "https://m.oliveyoung.co.kr/m/goods/getGoodsArtcAjax.do?goodsNo=" + pid;
        String reviewUrl = "https://m.oliveyoung.co.kr/m/goods/getGdasSummaryAjax.do?goodsNo=" + pid;

        Document document = null;
        try {
            String html = getHTML(productUrl);
            document = Jsoup.parse(html);
            document.body().getElementById("webBanner_detail").remove();
            document.body().getElementById("mHeader").remove();
            document.body().getElementById("titConts").remove();
            document.body().getElementById("mFooter").remove();
            document.body().getElementById("related_items").remove();
            document.body().getElementById("curation_wrap").remove();
            document.body().getElementById("btnShare").remove();

            document.body().getElementsByClass("price_area gubun_bar").get(0).remove();

            document.body().getElementsByClass("prd_buy_wrap").get(0).remove();
            Elements priceDetails = document.body().getElementsByClass("prd_detail_info").get(0).children();
            int priceDetailIndex = 0;
            for (Element element : priceDetails) {
                if (priceDetailIndex > 0) {
                    element.remove();
                }
                priceDetailIndex++;
            }
            document.body().getElementById("moveBrandShop").remove();
            document.body().getElementsByClass("offlineBurialLink").get(0).remove();
            document.body().getElementById("regGdasBtn").parent().remove();

            document.body().getElementsByTag("script").remove();
            document.body().getElementsByTag("form").remove();
            document.body().getElementsByTag("input").remove();
            document.body().getElementById("qnaInfo").remove();

            try {
                Elements tabMenus = document.body().getElementsByClass("line_tab_list").get(0).children();
                for (Element tabMenu : tabMenus) {
                    tabMenu.attr("style", "width: 33.33%");
                }
            } catch (Exception e) {
                log.error("탭 메뉴 조작 중 에러", e);
            }

            // append product detail
            String productDetailHtml = getHTML(productDetailUrl);
            Elements tabCont = document.body().getElementsByClass("line_tab_cont");
            tabCont.get(0).children().get(0).before(productDetailHtml);

            // append goods info
            String goodsInfoHtml = getHTML(goodsInfoUrl);
            tabCont.get(1).children().get(0).before(goodsInfoHtml);

            // append review
            String reviewHtml = getHTML(reviewUrl);
            Document reviewDocument = Jsoup.parse(reviewHtml);
            reviewDocument.body().getElementsByClass("btn_more").get(0).remove();
            reviewDocument.body().getElementsByClass("review_thum").get(0).remove();
            reviewDocument.body().getElementsByClass("poll_result").get(0).attr("style", "padding: 20px 0px;");
            document.body().getElementById("gdasWrap").append(reviewDocument.outerHtml());

            // append script
            document.body().children().last().after(tabScript);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

        return document.toString();
    }

    private String getHTML(String url) {
        try {
            HttpClientParams httpParams = new HttpClientParams();
            httpParams.setConnectionManagerClass(SimpleHttpConnectionManager.class);
            HttpClient client = new HttpClient(httpParams);
            GetMethod method = null;
            try {
                method = new GetMethod(url);
                method.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36");
                method.setRequestHeader("Host", "m.oliveyoung.co.kr");
                method.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
                int code = client.executeMethod(method);
                String response = IOUtils.toString(method.getResponseBodyAsStream(), "UTF-8");
                if (code != 200) {
                    throw new Exception("unexcepted result: " + code + " " + response);
                }

                return response;
            } catch (Exception e) {
                try {
                    throw e;
                } catch (Exception e1) {
                    throw e1;
                }
            } finally {
                if (method != null) {
                    method.releaseConnection();
                }
            }

        } catch (Exception e) {
            return null;
        }
    }

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
