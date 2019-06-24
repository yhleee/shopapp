package kr.co.oliveyoung.shopapp.common.model;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import lombok.Data;

import java.io.Serializable;

@Data
public class ApiResponseMessage implements Serializable {
    private static final long serialVersionUID = 9189489544166339048L;
    private ResponseResult result;
    private String message;
    private String redirectUrl;
    private Object contents;
    private String key;
    private Object params;

    public ApiResponseMessage() {}
    public ApiResponseMessage(ResponseResult result, String message, String redirectUrl) {
        this.result = result;
        this.message = message;
        this.redirectUrl = redirectUrl;
    }

    public ApiResponseMessage(ResponseResult result, String key) {
        this.result = result;
        this.key = key;
    }
}
