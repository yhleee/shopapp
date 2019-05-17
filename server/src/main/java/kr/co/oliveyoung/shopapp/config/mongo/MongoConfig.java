package kr.co.oliveyoung.shopapp.config.mongo;

import kr.co.oliveyoung.shopapp.repository.MongoQueryRepositoryImpl;
import kr.co.oliveyoung.shopapp.repository.MongoReactiveQueryRepositoryImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories;

@Configuration
@EnableMongoRepositories(
    basePackages = "kr.co.oliveyoung.shopapp",
    repositoryBaseClass = MongoQueryRepositoryImpl.class,
    excludeFilters = @Filter(UsingPrimaryNode.class)
)
@EnableReactiveMongoRepositories(
    basePackages = "kr.co.oliveyoung.shopapp",
    repositoryBaseClass = MongoReactiveQueryRepositoryImpl.class,
    excludeFilters = @Filter(UsingPrimaryNode.class)
)
public class MongoConfig {

  @Bean
  public MongoTemplate mongoTemplate(MongoDbFactory mongoDbFactory,
      MappingMongoConverter mappingMongoConverter) {
    return new MongoTemplate(mongoDbFactory, mappingMongoConverter);
  }

  @Bean
  public ReactiveMongoTemplate reactiveMongoTemplate(
      ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory,
      @Qualifier("reactiveMappingMongoConverter") MappingMongoConverter mappingMongoConverter) {
    return new ReactiveMongoTemplate(reactiveMongoDatabaseFactory, mappingMongoConverter);
  }


}