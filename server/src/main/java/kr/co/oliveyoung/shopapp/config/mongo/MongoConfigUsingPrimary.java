package com.naver.shopping.config.mongo;

import com.naver.shopping.repository.MongoQueryRepositoryImpl;
import com.naver.shopping.repository.MongoReactiveQueryRepositoryImpl;
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
    mongoTemplateRef = "mongoTemplateUsingPrimary",
    basePackages = "com.naver.shopping",
    repositoryBaseClass = MongoQueryRepositoryImpl.class,
    includeFilters = @Filter(UsingPrimaryNode.class)
)
@EnableReactiveMongoRepositories(
    reactiveMongoTemplateRef = "reactiveMongoTemplateUsingPrimary",
    basePackages = "com.naver.shopping",
    repositoryBaseClass = MongoReactiveQueryRepositoryImpl.class,
    includeFilters = @Filter(UsingPrimaryNode.class)
)
public class MongoConfigUsingPrimary {

  @Bean
  public MongoTemplate mongoTemplateUsingPrimary(
      @Qualifier("mongoDbFactoryWithPrimary") MongoDbFactory mongoDbFactory,
      @Qualifier("mappingMongoConverterWithPrimary") MappingMongoConverter mappingMongoConverter) {
    return new MongoTemplate(mongoDbFactory, mappingMongoConverter);
  }

  @Bean
  public ReactiveMongoTemplate reactiveMongoTemplateUsingPrimary(
      @Qualifier("reactiveMongoDatabaseFactoryWithPrimary") ReactiveMongoDatabaseFactory reactiveMongoDatabaseFactory,
      @Qualifier("reactiveMappingMongoConverter") MappingMongoConverter mappingMongoConverter) {
    return new ReactiveMongoTemplate(reactiveMongoDatabaseFactory, mappingMongoConverter);
  }


}