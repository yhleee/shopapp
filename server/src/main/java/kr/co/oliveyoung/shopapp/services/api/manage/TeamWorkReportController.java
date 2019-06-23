package kr.co.oliveyoung.shopapp.services.api.manage;

import kr.co.oliveyoung.shopapp.common.enums.ResponseResult;
import kr.co.oliveyoung.shopapp.common.model.ApiResponseMessage;
import kr.co.oliveyoung.shopapp.feature.manage.WorkReport;
import kr.co.oliveyoung.shopapp.feature.manage.WorkReportCriteria;
import kr.co.oliveyoung.shopapp.feature.manage.WorkReportMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateUtils;
import org.codehaus.plexus.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Slf4j
@RequestMapping("/manage/team/work/report")
@RestController
public class TeamWorkReportController {

    @Autowired
    private WorkReportMapper mapper;

    @RequestMapping(value = "/list", method = {RequestMethod.POST})
    public ApiResponseMessage getWorkReport(HttpServletResponse response, @RequestBody WorkReport params) {
        List<WorkReport> list = null;
        try {
            list = mapper.selectWorkReport(params);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            response.setStatus(500);
            return null;
        }
        if (list == null) {
            response.setStatus(400);
            return null;
        }
        ApiResponseMessage message = new ApiResponseMessage(ResponseResult.SUCCESS, null, null);
        message.setContents(list);
        return message;
    }

    @RequestMapping(value = "/upsert", method = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH})
    public ApiResponseMessage upsertWorkReport(HttpServletResponse response, @RequestBody WorkReport report) {
        Long no = report.getNo();
        try {
            if (no == null) {
                mapper.insertWorkReport(report);
                response.setStatus(201);
            } else {
                mapper.updateWorkReport(report);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            response.setStatus(500);
        }
        return null;
    }
}
