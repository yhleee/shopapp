package kr.co.oliveyoung.shopapp.config;

import javax.sql.DataSource;

import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import kr.co.oliveyoung.shopapp.config.mybatis.MybatisOracleConfigurationSupport;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Primary
@Configuration
@MapperScan(
    basePackages = "kr.co.oliveyoung.shopapp.feature",
    annotationClass = OracleMapper.class,
    sqlSessionFactoryRef = "oracleSessionFactory")
public class OracleDataSourceConfig {

  @Autowired
  private MybatisOracleConfigurationSupport myBatisConfigurationSupport;

  @Primary
  @Bean(name = "oracleDataSource")
  @ConfigurationProperties(prefix = "spring.oracle.datasource")
  public DataSource oracleDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Primary
  @Bean(name = "oracleSessionFactory")
  public SqlSessionFactory oracleSessionFactory(
      @Qualifier("oracleDataSource") DataSource dataSource) throws Exception {
    return myBatisConfigurationSupport.build(dataSource);
  }

}
