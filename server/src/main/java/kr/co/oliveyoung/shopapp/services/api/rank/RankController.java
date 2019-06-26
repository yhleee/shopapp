package kr.co.oliveyoung.shopapp.services.api.rank;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.feature.notice.CommonNotice;
import kr.co.oliveyoung.shopapp.feature.rank.Rank;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Slf4j
@RequestMapping("/rank/")
@RestController
public class RankController {

    @Autowired
    RankService service;

    @GetMapping("/mainList")
    public ApiResponseMessage getMainList(HttpServletResponse response) {
        List<Rank> rankList = service.selectRankList();
        if (rankList == null) {
            response.setStatus(204);
            return null;
        }
        ApiResponseMessage result = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        result.setContents(rankList);
        return result;
    }

    @PostMapping("/catList")
    public ApiResponseMessage getCatList(@RequestBody Rank param, HttpServletResponse response) {

        ApiResponseMessage result = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        System.out.println("RANK ::::::::::::::: " + param.toString());
//        System.out.println(param.getStrCd() + " || " + param.getStart() + " || " + param.getEnd());
        if (param.getStrCd() == null || param.getPeriod() == null) {
            result.setResult(ResponseResult.FAIL);
            result.setMessage("필수 파라미터를 확인하세요.");
            return result;
        }

        List<Rank> catList = service.selectCategoryList(param);
        if (catList == null) {
            response.setStatus(204);
            return null;
        }
        result.setContents(catList);
        return result;
    }
}
