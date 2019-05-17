package kr.co.oliveyoung.shopapp.config;

import javax.sql.DataSource;

import kr.co.oliveyoung.shopapp.config.mybatis.MybatisConfigurationSupport;
import kr.co.oliveyoung.shopapp.config.mybatis.OracleMapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(
    basePackages = "kr.co.oliveyoung.shopapp.feature",
    annotationClass = OracleMapper.class,
    sqlSessionFactoryRef = "oracleSessionFactory")
public class OracleDataSourceConfig {

  @Autowired
  private MybatisConfigurationSupport myBatisConfigurationSupport;

  @Bean(name = "oracleDataSource")
  @ConfigurationProperties(prefix = "spring.datasource-oracle")
  public DataSource oracleDataSource() {
    return DataSourceBuilder.create().build();
  }

  @Bean(name = "oracleSessionFactory")
  public SqlSessionFactory oracleSessionFactory(
      @Qualifier("oracleDataSource") DataSource dataSource) throws Exception {
    return myBatisConfigurationSupport.build(dataSource);
  }

}
