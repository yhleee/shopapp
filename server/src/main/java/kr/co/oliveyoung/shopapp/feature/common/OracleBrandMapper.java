package kr.co.oliveyoung.shopapp.feature.common;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;

@OracleMapper
public interface OracleBrandMapper {

    List<OracleBrand> selectBrandList();
}
