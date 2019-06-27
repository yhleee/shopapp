package kr.co.oliveyoung.shopapp.common.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

@Slf4j
public class JsonUtils {
    public static String objectToJson(Object object) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static JSONObject stringToJson(String jsonString) {
        JSONObject json = null;
        try {
            json = new JSONObject(jsonString);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
        return json;
    }
}