package kr.co.oliveyoung.shopapp.services.api.product;

import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.common.utils.Generics;
import kr.co.oliveyoung.shopapp.common.utils.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.httpclient.methods.PostMethod;
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
        String encodeQuery = params.getQuery();
        try {
            encodeQuery = URLEncoder.encode(params.getQuery(), "UTF-8");
        } catch (Exception e) {}
        PostMethod method = new PostMethod("https://m.oliveyoung.co.kr/m/search/mSearchMainAjax.do?query=" + encodeQuery);
        method.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36");
        method.setRequestHeader("Host", "m.oliveyoung.co.kr");
        method.setRequestHeader("Accept", "*/*");
        method.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        method.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        String html = HttpUtils.requestUrl(method);
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
}
