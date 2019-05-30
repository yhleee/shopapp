package kr.co.oliveyoung.shopapp.services.api;

import java.util.List;
import kr.co.oliveyoung.shopapp.common.utils.EnvUtils;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearchMapper;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearch;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTest;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTestMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/search")
@Slf4j
@RestController
public class SearchController {

    @Autowired
    private OracleSearchMapper oracleSearchMapper;

    @Autowired
    private MySqlTestMapper mySqlTestMapper;


    @GetMapping("/db/selectSearchProductList")
    public String selectSearchProductList() {
        List<OracleSearch> productList = oracleSearchMapper.selectSearchProductList();
        log.info("======= ENV : {} ======", EnvUtils.getEnv());
        return JsonUtils.objectToJson(productList);
    }

    @GetMapping("/db/mysql")
    public String getDbMySqlTest() {
        List<MySqlTest> testList = mySqlTestMapper.selectTest();
        log.info("======= ENV : {} ======", EnvUtils.getEnv());
        return JsonUtils.objectToJson(testList);
    }
}
