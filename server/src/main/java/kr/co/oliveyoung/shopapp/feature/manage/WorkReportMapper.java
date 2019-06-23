package kr.co.oliveyoung.shopapp.feature.manage;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;

import java.util.List;

@MySqlMapper
public interface WorkReportMapper {

    List<WorkReport> selectWorkReport(WorkReport params);
    void insertWorkReport(WorkReport report);
    void updateWorkReport(WorkReport report);
}
