package kr.co.oliveyoung.shopapp.feature.notice;

import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;

import java.util.List;

@OracleMapper
public interface CommonNoticeMapper {

    List<StoreNotice> selectCommNotice(StoreNotice params);
}
