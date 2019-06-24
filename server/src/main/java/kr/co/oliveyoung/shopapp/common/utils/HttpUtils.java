package kr.co.oliveyoung.shopapp.common.utils;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethodBase;
import org.apache.commons.httpclient.SimpleHttpConnectionManager;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpClientParams;
import org.apache.commons.io.IOUtils;

public class HttpUtils {
    public static String requestMobileUrl(String url) {
        GetMethod method = new GetMethod(url);
        method.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Mobile Safari/537.36");
        method.setRequestHeader("Host", "m.oliveyoung.co.kr");
        method.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
        return requestUrl(method);
    }

    public static String requestUrl(HttpMethodBase method) {
        try {
            HttpClientParams httpParams = new HttpClientParams();
            httpParams.setConnectionManagerClass(SimpleHttpConnectionManager.class);
            HttpClient client = new HttpClient(httpParams);
            try {
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
}
