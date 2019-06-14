package kr.co.oliveyoung.shopapp.services.api.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.common.OracleBrandMapper;
import kr.co.oliveyoung.shopapp.feature.common.OracleCategoryMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class CategoryController {

    @Autowired
    private OracleCategoryMapper oracleCategoryMapper;

    @Autowired
    private OracleBrandMapper oracleBrandMapper;

    private CommonUtil commonUtil = new CommonUtil();

    @GetMapping("/search/params")
    public String selectSearchParamsList(@RequestParam Map<String, String> map) {

        Map<String, List> result = new HashMap<>();
        result.put("brandList", commonUtil.getBrandList(oracleBrandMapper));
        result.put("categoryList", commonUtil.getCategories(oracleCategoryMapper));
        log.info("===========BRAND list = {} ", result.get("brandList").toString());
        log.info("===========CATE list = {} ", result.get("categoryList").toString());
        return JsonUtils.objectToJson(result);
    }

    @GetMapping("/category/search")
    public String selectCategoryList(@RequestParam Map<String, String> map) {
        return JsonUtils.objectToJson(commonUtil.getCategories(oracleCategoryMapper));
    }
}

