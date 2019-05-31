package kr.co.oliveyoung.shopapp.feature.search;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import org.apache.ibatis.annotations.Param;

@OracleMapper
public interface OracleSearchMapper {

    List<OracleSearch> selectSearchProductList(@Param("page") Integer page);
}
