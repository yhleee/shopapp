package kr.co.oliveyoung.shopapp.services.api.product;

import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.common.utils.Generics;
import kr.co.oliveyoung.shopapp.common.utils.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.List;

@RequestMapping("/product/online")
@Slf4j
@RestController
public class ProductSearchByOnlineMall {

    @Cacheable(value = "searchProductOnline", key = "#params.toString()")
    @PostMapping("/search")
    public ApiResponseMessage searchProductOnline (HttpServletResponse response, @RequestBody ProductSearchCriteria params) {
        ApiResponseMessage message = new ApiResponseMessage();
        message.setParams(params);
        String url = "https://m.oliveyoung.co.kr/m/search/mSearchMainAjax.do";
        String html = HttpUtils.requestForm(url, getNameValuePairs(params));
        Document document = Jsoup.parse(html);
        Elements goodsList = document.getElementsByClass("goods");
        List<ProductListItem> products = Generics.list();
        if (CollectionUtils.isNotEmpty(goodsList)) {
            for (Element goods : goodsList) {
                try {
                    String brandName = goods.getElementsByClass("name").get(0).text();
                    String productName = goods.getElementsByClass("text").get(0).text();
                    String price = goods.getElementsByClass("won").get(0).text().split("<em>")[0];
                    String imageUrl = goods.getElementsByTag("img").get(0).attr("src");
                    ProductListItem product = new ProductListItem(brandName, productName, price, imageUrl);
                    products.add(product);
                } catch (Exception e) {
                    log.error(e.getMessage(), e);
                    response.setStatus(500);
                    return null;
                }
            }
        }
        message.setContents(products);
        return message;
    }

    public List<NameValuePair> getNameValuePairs(ProductSearchCriteria criteria) {
        List<NameValuePair> params = Generics.list();
        params.add(new BasicNameValuePair("query", criteria.getQuery()));
        params.add(new BasicNameValuePair("startCount", String.valueOf(criteria.getStartCount())));
        params.add(new BasicNameValuePair("displayCateId", criteria.getDisplayCateId()));
        params.add(new BasicNameValuePair("cateId1", criteria.getCateId1()));
        params.add(new BasicNameValuePair("cateId2", criteria.getCateId2()));
        params.add(new BasicNameValuePair("cateId3", criteria.getCateId3()));
        params.add(new BasicNameValuePair("sale_below_price", criteria.getSale_below_price()));
        params.add(new BasicNameValuePair("sale_over_price", criteria.getSale_over_price()));
        params.add(new BasicNameValuePair("goods_sort", criteria.getGoods_sort()));
        params.add(new BasicNameValuePair("brandCheck", criteria.getBrandCheck()));
        params.add(new BasicNameValuePair("benefitCheck", criteria.getBenefitCheck()));
        params.add(new BasicNameValuePair("quickYn", criteria.getQuickYn()));
        params.add(new BasicNameValuePair("typeChk", criteria.getTypeChk()));
        return params;
    }
}
