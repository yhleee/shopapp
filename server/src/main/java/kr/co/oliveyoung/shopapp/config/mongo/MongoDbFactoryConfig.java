package kr.co.oliveyoung.shopapp.config.mongo;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientURI;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.SimpleReactiveMongoDatabaseFactory;

@Configuration
public class MongoDbFactoryConfig {

  @Autowired
  private MongoConnectOption mongoConnectOption;

  @Bean
  public MongoAccessInfo mongoAccessInfo() {
    return new MongoAccessInfo();
  }


  @Primary
  @Bean
  public MongoDbFactory mongoDbFactory() {
    return new SimpleMongoDbFactory(new MongoClientURI(connectUrlSecondaryPreferred()));
  }

  private String connectUrlSecondaryPreferred() {
    return uriFrom() + mongoConnectOption.getSecondaryPreferred();
  }

  private String uriFrom() {
    try {
      String encodedPw = URLEncoder
          .encode(mongoAccessInfo().getPassword(), StandardCharsets.UTF_8.toString());
      return "mongodb://" + mongoAccessInfo().getUsername() + ":" + encodedPw + "@" + mongoAccessInfo().getUri();
    } catch (UnsupportedEncodingException e) {
      throw new RuntimeException(e);
    }
  }

  @Bean
  public MongoDbFactory mongoDbFactoryWithPrimary() {
    return new SimpleMongoDbFactory(new MongoClientURI(connectUrl()));
  }

  private String connectUrl() {
    return uriFrom() + mongoConnectOption.getDefault();
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
