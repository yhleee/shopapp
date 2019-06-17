package kr.co.oliveyoung.shopapp.services.api.search;

import java.util.List;
import java.util.Map;
import kr.co.oliveyoung.shopapp.common.utils.EnvUtils;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.common.OracleBrandMapper;
import kr.co.oliveyoung.shopapp.feature.common.OracleCategoryMapper;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearch;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearchMapper;
import kr.co.oliveyoung.shopapp.services.api.common.CommonUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SearchController {

    @Autowired
    private OracleSearchMapper oracleSearchMapper;

    @Autowired
    private OracleCategoryMapper oracleCategoryMapper;

    @Autowired
    private OracleBrandMapper oracleBrandMapper;

    private CommonUtil commonUtil = new CommonUtil();

    @GetMapping("search/params/brand")
    public String selectSearchBrandList(){
        return JsonUtils.objectToJson(commonUtil.getBrandList(oracleBrandMapper));
    }

    @GetMapping("/search/params/category")
    public String selectSearchParamsList(@RequestParam Map<String, String> map) {
        return JsonUtils.objectToJson(commonUtil.getCategories(oracleCategoryMapper));
    }

    @GetMapping("/search/product")
    public String selectSearchProductList(@RequestParam Map<String, Object> map) {
        // 브랜드 파라미터 Array 전환
        if(map.get("brand") != null && !"".equals(map.get("brand"))){
            String[] brandCodes = map.get("brand").toString().split(",");
            map.put("brandCodes", brandCodes);
        }
        // 혜택 파라미터 Array 전환
        if(map.get("benefit") != null && !"".equals(map.get("benefit"))){
            String[] benefitCodes = map.get("benefit").toString().split(",");
            map.put("benefitCodes", benefitCodes);
        }
        List<OracleSearch> productList = oracleSearchMapper.selectSearchProductList(map);
        log.info("======= ENV : {} ======", EnvUtils.getEnv());
        return JsonUtils.objectToJson(productList);
    }

}
