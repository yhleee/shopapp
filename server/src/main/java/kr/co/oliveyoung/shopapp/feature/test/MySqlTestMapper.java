package kr.co.oliveyoung.shopapp.feature.test;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;

import java.util.List;

@MySqlMapper
public interface MySqlTestMapper {

    List<MySqlTest> selectTest();
    List<MySqlTest> selectStrNoticeList();
    List<MySqlTest> selectHomeMenuList();
}
