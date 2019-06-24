package kr.co.oliveyoung.shopapp.feature.notice;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;

@MySqlMapper
public interface StoreNoticeMapper {

    StoreNotice selectTbShpNotice(StoreNotice params);
    void insertTbShpNotice(StoreNotice params);
    void updateTbShpNotice(StoreNotice prams);
}
