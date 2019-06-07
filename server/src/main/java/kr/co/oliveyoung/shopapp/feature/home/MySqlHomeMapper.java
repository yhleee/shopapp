package kr.co.oliveyoung.shopapp.feature.home;

import java.util.List;
import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;
import kr.co.oliveyoung.shopapp.feature.test.MySqlTest;

@MySqlMapper
public interface MySqlHomeMapper {

    List<MySqlTest> selectStrNoticeList();
    List<MySqlTest> selectHomeMenuList();
}
