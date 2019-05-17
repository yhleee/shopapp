package com.naver.shopping.config.mongo;

import com.naver.shopping.feature.zzim.MemberZzimReaderConverter;
import com.naver.shopping.feature.zzim.MemberZzimWriterConverter;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
public class MongoConverterConfig {

  @Autowired
  private MongoMappingContext mongoMappingContext;


  @Bean
  public MappingMongoConverter mappingMongoConverter(MongoDbFactory mongoDbFactory) {
    return getConverter(new DefaultDbRefResolver(mongoDbFactory));
  }

  private MappingMongoConverter getConverter(DbRefResolver dbRefResolver) {
    MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
    converter.setTypeMapper(new DefaultMongoTypeMapper(null)); // remove '_class' field
    converter.setCustomConversions(customConversions());
    return converter;
  }

  @Bean
  public MappingMongoConverter mappingMongoConverterWithPrimary(
      @Qualifier("mongoDbFactoryWithPrimary") MongoDbFactory mongoDbFactory) {
    return getConverter(new DefaultDbRefResolver(mongoDbFactory));
  }

  @Bean
  public MappingMongoConverter reactiveMappingMongoConverter() {
    return getConverter(ReactiveMongoTemplate.NO_OP_REF_RESOLVER);
  }

  @Bean
  public MongoCustomConversions customConversions() {
    List<Converter<?, ?>> converters = new ArrayList<>();
    converters.add(DateToZonedDateTimeConverter.INSTANCE);
    converters.add(ZonedDateTimeToDateConverter.INSTANCE);
    converters.add(new MemberZzimReaderConverter());
    converters.add(new MemberZzimWriterConverter());
    return new MongoCustomConversions(converters);
  }

  public enum DateToZonedDateTimeConverter implements Converter<Date, ZonedDateTime> {
    INSTANCE;

    @Override
    public ZonedDateTime convert(Date source) {
      return source == null ? null
          : ZonedDateTime.ofInstant(source.toInstant(), ZoneId.systemDefault());
    }
  }

  public enum ZonedDateTimeToDateConverter implements Converter<ZonedDateTime, Date> {
    INSTANCE;

    @Override
    public Date convert(ZonedDateTime source) {
      return source == null ? null : Date.from(source.toInstant());
    }
  }
}
