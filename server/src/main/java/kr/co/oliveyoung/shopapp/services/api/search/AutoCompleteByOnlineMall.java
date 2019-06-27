package kr.co.oliveyoung.shopapp.services.api.search;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.common.utils.Generics;
import kr.co.oliveyoung.shopapp.common.utils.HttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.List;

@RequestMapping("/search/onlinemall/autocomplete")
@Slf4j
@RestController
public class AutoCompleteByOnlineMall {

    @Cacheable(value = "onlineMallAutoComplete", key = "#query")
    @GetMapping("/product/{query}")
    public String onlineMallAutoComplete(HttpServletResponse response,  @PathVariable("query") String query) {
        try {
            query = URLEncoder.encode(query, "UTF-8");
        } catch (Exception e) {}
        String url = "https://m.oliveyoung.co.kr/m/search/getArkAjax.do";
        List<NameValuePair> params = Generics.list();
        params.add(new BasicNameValuePair("convert", "fw"));
        params.add(new BasicNameValuePair("charset", "UTF-8"));
        params.add(new BasicNameValuePair("datatype", "json"));
        params.add(new BasicNameValuePair("target", ""));
        params.add(new BasicNameValuePair("query", query));

        try {
            return HttpUtils.requestForm(url, params);
        } catch(Exception e) {
            log.error(e.getMessage(), e);
            response.setStatus(500);
        }
        return null;
    }
}
