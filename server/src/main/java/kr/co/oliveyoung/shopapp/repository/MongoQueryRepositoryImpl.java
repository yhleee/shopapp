package com.naver.shopping.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.MongoEntityInformation;
import org.springframework.data.mongodb.repository.support.SimpleMongoRepository;
import org.springframework.util.Assert;

public class MongoQueryRepositoryImpl<T, I extends Serializable> extends SimpleMongoRepository<T, I>
    implements MongoQueryRepository<T, I> {

  private MongoOperations mongoOperations;
  private MongoEntityInformation entityInformation;

  public MongoQueryRepositoryImpl(
      final MongoEntityInformation entityInformation, final MongoOperations mongoOperations) {
    super(entityInformation, mongoOperations);

    this.entityInformation = entityInformation;
    this.mongoOperations = mongoOperations;
  }

  @Override
  public Page<T> findAll(final Query query, final Pageable pageable) {
    Assert.notNull(query, "Query must not be null!");
    return getPageImpl(query, pageable);
  }

  private PageImpl getPageImpl(Query query, Pageable pageable) {

    List dataList =
        mongoOperations.find(
            query.with(pageable),
            entityInformation.getJavaType(),
            entityInformation.getCollectionName());

    long totalCount =
        mongoOperations.count(
            query, entityInformation.getJavaType(), entityInformation.getCollectionName());

    return new PageImpl<T>(dataList, pageable, totalCount);
  }

  public Page<T> findAll(final Query query, final int page, final int size, final Order... orders) {
    Assert.notNull(query, "Query must not be null!");
    Assert.notNull(page, "page must not be null!");
    Assert.notNull(size, "size must not be null!");

    Pageable pageable =
        Optional.ofNullable(orders)
            .map(o -> PageRequest.of(page, size, Sort.by(o)))
            .orElseGet(() -> PageRequest.of(page, size));

    return getPageImpl(query, pageable);
  }

  public long count(final Query query) {
    return mongoOperations.count(
        query, entityInformation.getJavaType(), entityInformation.getCollectionName());
  }
}
