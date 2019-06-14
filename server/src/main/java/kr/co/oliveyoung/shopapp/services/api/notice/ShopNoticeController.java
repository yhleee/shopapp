package kr.co.oliveyoung.shopapp.services.api.notice;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.common.utils.JsonUtils;
import kr.co.oliveyoung.shopapp.feature.notice.ShopNotice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequestMapping("/notice/shop/")
@RestController
public class ShopNoticeController {

    @Autowired
    private ShopNoticeService service;

    @GetMapping("/{storeCode}")
    public ApiResponseMessage shopNotice(HttpServletResponse response, @PathVariable("storeCode" ) String storeCode) {
        ShopNotice notice = service.getShopNotice(storeCode);
        if (notice == null) {
            response.setStatus(204);
            return null;
        }
        ApiResponseMessage result = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        result.setContents(notice);
        return result;
    }

    @RequestMapping(value = "/insert", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponseMessage addShopNotice(HttpServletResponse response, @RequestBody ShopNotice params) {
        try {
            log.info("------------------------------------");
            log.info(JsonUtils.objectToJson(params));
            log.info("------------------------------------");
            if (params.getStrCd() == null || params.getText() == null) {
                response.setStatus(400);
                return null;
            }
            service.addShopNotice(params.getStrCd(), params.getText(), params.getWrtrUsrId());
            response.setStatus(201);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            response.setStatus(500);
        }
        return null;
    }
}
