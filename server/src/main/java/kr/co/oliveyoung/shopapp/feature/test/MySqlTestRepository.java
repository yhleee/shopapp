package kr.co.oliveyoung.shopapp.feature.test;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MySqlTestRepository {

    private static final String NAMESPACE = "kr.co.oliveyoung.shopapp.feature.test.MySqlTestMapper.";

    @Autowired
    @Qualifier("mySqlSession")
    private SqlSessionTemplate sqlSession;

    public List<MySqlTest> selectTest() {
        return sqlSession.selectList(NAMESPACE + "selectTest");
    }

    public List<MySqlTest> selectStrNoticeList() {
        return sqlSession.selectList(NAMESPACE + "selectStrNoticeList");
    }

    public List<MySqlTest> selectHomeMenuList() {
        return sqlSession.selectList(NAMESPACE + "selectHomeMenuList");
    }
}
