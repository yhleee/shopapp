package kr.co.oliveyoung.shopapp.feature.search;

import java.util.List;
import java.util.Map;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;

@OracleMapper
public interface OracleSearchMapper {

    List<OracleSearch> selectSearchProductList(Map<String, String> map);
}
