package kr.co.oliveyoung.shopapp.config;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;
import kr.co.oliveyoung.shopapp.config.mybatis.MybatisMySqlConfigurationSupport;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@MapperScan(
    basePackages = "kr.co.oliveyoung.shopapp.feature",
    annotationClass = MySqlMapper.class,
    sqlSessionFactoryRef = "mySqlSessionFactory")
public class MySqlDataSourceConfig {

  @Autowired
  private MybatisMySqlConfigurationSupport mybatisMySqlConfigurationSupport;

  @Bean(name = "mySqlDataSource")
  @ConfigurationProperties(prefix = "spring.mysql.datasource")
  public DataSource mySqlDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Bean(name = "mySqlSessionFactory")
  public SqlSessionFactory mySqlSessionFactory(
      @Qualifier("mySqlDataSource") DataSource dataSource) throws Exception {
    return mybatisMySqlConfigurationSupport.build(dataSource);
  }

}
