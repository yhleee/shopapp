package kr.co.oliveyoung.shopapp.services.api.search;

import java.util.List;
import kr.co.oliveyoung.shopapp.common.utils.EnvUtils;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearch;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearchMapper;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTest;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTestMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SearchController {

    @Autowired
    private OracleSearchMapper oracleSearchMapper;

    @Autowired
    private MySqlTestMapper mySqlTestMapper;

    @GetMapping("/search/product/{page}")
    public String selectSearchProductList(@PathVariable("page") String page) {
        log.info("===========PAGE : {} ============ :  ", page);
        List<OracleSearch> productList = oracleSearchMapper.selectSearchProductList(Integer.parseInt(page));
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
