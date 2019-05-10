package kr.co.oliveyoung.shopapp.common.config;

import javax.sql.DataSource;
import kr.co.oliveyoung.shopapp.common.config.mybatis.MySqlMapper;
import kr.co.oliveyoung.shopapp.common.config.mybatis.MybatisConfigurationSupport;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@MapperScan(
    basePackages = "kr.co.oliveyoung.shopapp.feature",
    annotationClass = Mapper.class,
    sqlSessionFactoryRef = "mySqlSessionFactory")
public class MySqlDataSourceConfig {

  @Autowired
  private MybatisConfigurationSupport myBatisConfigurationSupport;

  @Bean(name = "mySqlDataSource")
  @ConfigurationProperties(prefix = "spring.datasource")
  public DataSource mySqlDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Bean(name = "mySqlSessionFactory")
  public SqlSessionFactory mySqlSessionFactory(
      @Qualifier("mySqlDataSource") DataSource dataSource) throws Exception {
    log.info("================================");
//    log.info(dataSource.);
    log.info("================================");
    return myBatisConfigurationSupport.build(dataSource);
  }

}
