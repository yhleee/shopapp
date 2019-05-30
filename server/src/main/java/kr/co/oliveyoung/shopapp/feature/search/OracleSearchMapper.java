package kr.co.oliveyoung.shopapp.feature.search;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import kr.co.oliveyoung.shopapp.feature.search.OracleSearch;

@OracleMapper
public interface OracleSearchMapper {

    List<OracleSearch> selectSearchProductList();
}
