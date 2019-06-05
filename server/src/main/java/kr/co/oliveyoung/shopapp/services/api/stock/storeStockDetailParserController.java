package kr.co.oliveyoung.shopapp.services.api.stock;

import java.util.List;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStock;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStockMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.io.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class storeStockDetailParserController {

  @Autowired
  private OracleStockMapper oracleStockMapper;

  @GetMapping("/stock/detail/parser")
  public String ParseStoreDetail(String storeId) {
    String storeDescUrl = "https://m.oliveyoung.co.kr/m/store/getStoreDetail.do?strNo=" + storeId;

    Document document = null;
    try {
      String html = getHTML(storeDescUrl);
      log.info("===========STORE HTML = : {} ============ :  ", html);
      document = Jsoup.parse(html);
      document.head().children().last().after(style);

      document.body().getElementsByTag("script").remove();
      document.body().getElementsByTag("form").remove();
      document.body().getElementsByTag("input").remove();
      document.body().getElementById("skip_navi").remove();
      document.body().getElementById("mHeader").remove();
      document.body().getElementById("mSearchWrapper").remove();
      document.body().getElementById("pop-full-wrap").remove();
      document.body().getElementById("LAYERPOP01").remove();
      document.body().getElementById("searchZipcode").remove();
      document.body().getElementById("QUICKLAYERPOP").remove();
      document.body().getElementById("SNSLAYER").remove();
      document.body().getElementById("fixBtn").remove();
      document.body().getElementById("mFooter").remove();
      document.body().getElementById("storeEvtLayer").remove();
      document.body().getElementById("titConts").remove();
      document.body().getElementById(storeId+"li").remove();

      List<OracleStock> storeDetailLocation = oracleStockMapper.selectStoreLocation(storeId);
      // append script
      document.body().children().last().after(getMapScript(storeDetailLocation.get(0).getLat(), storeDetailLocation.get(0).getLng()));
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

  private String style = "<style>\n" +
      "@media screen and (min-width: 500px) { #mContainer {zoom: 2;} }\n" +
      "</style>";

  private String getMapScript(String lat, String lng){
    String mapScript = "<script type=\"text/javascript\" src=\"//dapi.kakao.com/v2/maps/sdk.js?appkey=a4d4d0284fa63602aa442aa70a07a543\"></script>\n" +
        "<script charset=\"UTF-8\" src=\"https://t1.daumcdn.net/mapjsapi/js/main/4.0.10/kakao.js\"></script>\n" +
        "<script src=\"https://m.oliveyoung.co.kr/mc-static-root/js/store/store.js?dumm=2019057365203\" charset=\"utf-8\"></script>\n" +
        "<script type=\"text/javascript\" id=\"\" src=\"//adimg.daumcdn.net/rt/roosevelt.js\"></script>\n" +
        "<script type=\"text/javascript\" id=\"\" charset=\"UTF-8\" src=\"//t1.daumcdn.net/adfit/static/kp.js\"></script>\n" +
        "<script type=\"text/javascript\" id=\"\">kakaoPixel(\"8451652009131684431\").pageView();</script>\n" +
        "<script>\n" +
        "  $(document).ready(function() {\n" +
        "    mstore.detail.init();\n" +
        "    mstore.detail.mapApInit(" + lat + "," + lng + " );\n" +
        "  });\n"
        ;

    return mapScript;
  }
}
