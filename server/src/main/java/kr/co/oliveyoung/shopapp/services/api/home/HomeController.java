package kr.co.oliveyoung.shopapp.services.api.home;

import java.util.List;
import kr.co.oliveyoung.shopapp.common.utils.EnvUtils;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.home.MySqlHomeMapper;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTest;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTestMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class HomeController {

  @Autowired
  private MySqlHomeMapper mySqlHomeMapper;

  @Autowired
  private MySqlTestMapper mySqlTestMapper;

  @GetMapping("/home/notice/store")
  public String getNoticeList() {
    List<MySqlTest> testList = mySqlHomeMapper.selectStrNoticeList();
    log.info("======= ENV : {} ======", EnvUtils.getEnv());
    return JsonUtils.objectToJson(testList);
  }

  @GetMapping("/home/menu")
  public String getHomeMenuList() {
    List<MySqlTest> testList = mySqlHomeMapper.selectHomeMenuList();
    log.info("======= ENV : {} ======", EnvUtils.getEnv());
    return JsonUtils.objectToJson(testList);
  }
}
