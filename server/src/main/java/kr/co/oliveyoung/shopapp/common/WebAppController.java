package kr.co.oliveyoung.shopapp.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebAppController {

  /**
   * react app endpoint
   */
  @GetMapping(value = {"/", "/app/**"})
  public String app() {
    return "index";
  }
}
