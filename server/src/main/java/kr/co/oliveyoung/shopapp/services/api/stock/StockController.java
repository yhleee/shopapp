package kr.co.oliveyoung.shopapp.services.api.stock;

import java.util.List;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStock;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStockMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class StockController {

    @Autowired
    private OracleStockMapper oracleStockMapper;

    @GetMapping("/stock/stores/list/{goodsCode}")
    public String selectSearchProductList(@PathVariable("goodsCode") String goodsCode) {
        List<OracleStock> storeList = oracleStockMapper.selectStockStoreList(goodsCode);
        return JsonUtils.objectToJson(storeList);
    }
}
