package kr.co.oliveyoung.shopapp.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("monitor")
public class MonitorController {

  @ResponseBody
  @GetMapping("l7check")
  public String l7check() {
    return "OK";
  }
}
