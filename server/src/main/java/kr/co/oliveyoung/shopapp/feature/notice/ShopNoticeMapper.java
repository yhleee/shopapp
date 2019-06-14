package kr.co.oliveyoung.shopapp.feature.notice;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;

import java.util.List;

@MySqlMapper
public interface ShopNoticeMapper {

    ShopNotice selectTbShpNotice(ShopNotice params);
    void insertTbShpNotice(ShopNotice params);
    void updateTbShpNotice(ShopNotice prams);
}
