package kr.co.oliveyoung.shopapp.services.api.notice;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.feature.notice.StoreNotice;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@RequestMapping("/notice/shop/")
@RestController
public class StoreNoticeController {

    @Autowired
    private StoreNoticeService service;

    @GetMapping("/{storeCode}")
    public ApiResponseMessage storeNotice(HttpServletResponse response, @PathVariable("storeCode" ) String storeCode) {
        StoreNotice notice = service.getStoreNotice(storeCode);
        if (notice == null) {
            response.setStatus(204);
            return null;
        }
        ApiResponseMessage result = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        result.setContents(notice);
        return result;
    }

    @RequestMapping(value = "/insert", method = {RequestMethod.POST, RequestMethod.PUT})
    public ApiResponseMessage addStoreNotice(HttpServletResponse response, @RequestBody StoreNotice params) {
        try {
            if (params.getStrCd() == null || params.getText() == null) {
                response.setStatus(400);
                return null;
            }
            service.addStoreNotice(params.getStrCd(), params.getText(), params.getRegUsrId());
            response.setStatus(201);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            response.setStatus(500);
        }
        return null;
    }

    @GetMapping("/common")
    public ApiResponseMessage storeCommonNotice(HttpServletResponse response) {
        List<StoreNotice> notice = service.getCommonNotice();
        if (notice == null) {
            response.setStatus(204);
            return null;
        }
        ApiResponseMessage result = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        result.setContents(notice);
        return result;
    }
}
