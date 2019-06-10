package kr.co.oliveyoung.shopapp.feature.stock;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import org.apache.ibatis.annotations.Param;

@OracleMapper
public interface OracleStockMapper {

    List<OracleStock> selectStockStoreList(@Param("goodsCode") String goodsCode);
    List<OracleStock> selectStoreLocation(@Param("storeCode") String storeCode);
}
