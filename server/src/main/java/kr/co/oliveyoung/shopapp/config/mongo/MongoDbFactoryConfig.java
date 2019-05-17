package com.naver.shopping.config.mongo;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientURI;
import com.naver.shopping.config.nclavis.NClavisEnvoy;
import com.naver.shopping.config.nclavis.RepositoryAccessInfo;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.SimpleReactiveMongoDatabaseFactory;

@Configuration
@EnableConfigurationProperties(MongoNClavisProperty.class)
public class MongoDbFactoryConfig {

  @Autowired
  private MongoNClavisProperty mongoNClavisProperty;

  @Autowired
  private MongoConnectOption mongoConnectOption;

  @Primary
  @Bean
  public MongoDbFactory mongoDbFactory() {
    return new SimpleMongoDbFactory(new MongoClientURI(connectUrlSecondaryPreferred()));
  }

  private String connectUrlSecondaryPreferred() {
    return uriFromNClavis() + mongoConnectOption.getSecondaryPreferred();
  }

  private String uriFromNClavis() {
    RepositoryAccessInfo accessInfo = NClavisEnvoy.getAccessInfo(mongoNClavisProperty);
    try {
      String encodedPw = URLEncoder
          .encode(accessInfo.getPassword(), StandardCharsets.UTF_8.toString());
      return "mongodb://" + accessInfo.getUserName() + ":" + encodedPw + "@" + accessInfo.getUri();
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  @Bean
  public MongoDbFactory mongoDbFactoryWithPrimary() {
    return new SimpleMongoDbFactory(new MongoClientURI(connectUrl()));
  }

  private String connectUrl() {
    return uriFromNClavis() + mongoConnectOption.getDefault();
  }

  @Primary
  @Bean
  public ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory() {
    try {
      return new SimpleReactiveMongoDatabaseFactory(
          new ConnectionString(connectUrlSecondaryPreferred()));
    } catch (UnknownHostException e) {
      throw new RuntimeException(e);
    }
  }

  @Bean
  public ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactoryWithPrimary() {
    try {
      return new SimpleReactiveMongoDatabaseFactory(new ConnectionString(connectUrl()));
    } catch (UnknownHostException e) {
      throw new RuntimeException(e);
    }
  }
}
