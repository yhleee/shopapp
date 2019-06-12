package kr.co.oliveyoung.shopapp.services.api.stock;

import java.util.List;
import java.util.Map;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStock;
import kr.co.oliveyoung.shopapp.feature.stock.OracleStockMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class StockController {

    @Autowired
    private OracleStockMapper oracleStockMapper;

    @GetMapping("/stock/stores/list")
    public String selectSearchProductList(@RequestParam Map<String, String> map) {
        List<OracleStock> storeList = oracleStockMapper.selectStockStoreList(map);
        return JsonUtils.objectToJson(storeList);
    }
}
