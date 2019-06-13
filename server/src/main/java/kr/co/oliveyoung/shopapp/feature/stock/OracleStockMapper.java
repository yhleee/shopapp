package kr.co.oliveyoung.shopapp.feature.stock;

import java.util.List;
import java.util.Map;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import org.apache.ibatis.annotations.Param;

@OracleMapper
public interface OracleStockMapper {

    List<OracleStock> selectStockStoreList(Map<String, String> map);
    List<OracleStock> selectStoreLocation(@Param("storeCode") String storeCode);
}
