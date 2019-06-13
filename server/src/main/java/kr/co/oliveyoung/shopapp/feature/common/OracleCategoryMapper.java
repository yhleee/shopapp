package kr.co.oliveyoung.shopapp.feature.common;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;

@OracleMapper
public interface OracleCategoryMapper {

    List<OracleCategory> selectCategoryList(String id, int level);
}
