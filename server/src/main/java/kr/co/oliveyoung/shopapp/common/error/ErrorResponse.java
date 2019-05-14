package kr.co.oliveyoung.shopapp.common.error;

import java.util.List;
import lombok.Data;

@Data
public class ErrorResponse<T> {

  private String message;
  private List<T> errors;

  public ErrorResponse(String message) {
    this.message = message;
  }
}
