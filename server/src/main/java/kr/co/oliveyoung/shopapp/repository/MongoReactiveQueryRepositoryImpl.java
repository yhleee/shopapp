package kr.co.oliveyoung.shopapp.repository;

import com.mongodb.client.result.UpdateResult;
import java.io.Serializable;
import java.util.Optional;

import kr.co.oliveyoung.shopapp.common.MongoSequence;
import org.bson.Document;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.ReactiveMongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.query.MongoEntityInformation;
import org.springframework.data.mongodb.repository.support.SimpleReactiveMongoRepository;
import org.springframework.util.Assert;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class MongoReactiveQueryRepositoryImpl<T, I extends Serializable>
    extends SimpleReactiveMongoRepository<T, I>
    implements MongoReactiveQueryRepository<T, I> {

  private static final String MESSAGE_NULL_QUERY = "query must not be null!";
  private static final String MESSAGE_NULL_PAGEABLE = "pageable must not be null!";
  private static final String MESSAGE_NULL_PAGE = "page must not be null!";
  private static final String MESSAGE_NULL_PAGE_SIZE = "size must not be null!";
  private static final String MESSAGE_NULL_UPDATE = "update must not be null!";

  private static final Long DEFAULT_SEQUENCE = 10000000L;

  private MongoEntityInformation entityInformation;
  private ReactiveMongoOperations mongoOperations;

  public MongoReactiveQueryRepositoryImpl(
      MongoEntityInformation<T, I> entityInformation,
      ReactiveMongoOperations mongoOperations) {
    super(entityInformation, mongoOperations);
    this.entityInformation = entityInformation;
    this.mongoOperations = mongoOperations;
  }


  @Override
  public Flux<T> findAll(Query query) {
    Assert.notNull(query, MESSAGE_NULL_QUERY);
    return mongoOperations.find(
        query,
        entityInformation.getJavaType(),
        entityInformation.getCollectionName());
  }

  @Override
  public Flux<T> findAll(Query query, Pageable pageable) {
    Assert.notNull(query, MESSAGE_NULL_QUERY);
    Assert.notNull(pageable, MESSAGE_NULL_PAGEABLE);

    return findAll(query.with(pageable));
  }

  @Override
  public Flux<T> findAll(Query query, int page, int size, Order... orders) {
    Assert.notNull(query, MESSAGE_NULL_QUERY);
    Assert.notNull(page, MESSAGE_NULL_PAGE);
    Assert.notNull(size, MESSAGE_NULL_PAGE_SIZE);

    Pageable pageable =
        Optional.ofNullable(orders)
            .map(o -> PageRequest.of(page, size, Sort.by(o)))
            .orElseGet(() -> PageRequest.of(page, size));

    return findAll(query.with(pageable));
  }

  public Mono<Long> count(Query query) {
    return mongoOperations.count(
        query, entityInformation.getJavaType(), entityInformation.getCollectionName());
  }

  public Mono<T> findOneAndUpdate(Query query, Update update) {
    Assert.notNull(query, MESSAGE_NULL_QUERY);
    Assert.notNull(update, MESSAGE_NULL_UPDATE);
    return mongoOperations.findAndModify(query, update, new FindAndModifyOptions().returnNew(true),
        entityInformation.getJavaType());
  }

  public Mono<Long> findNextSequence() {
    Query query = new Query(Criteria.where("_id").is(entityInformation.getCollectionName()));
    Update update = new Update().inc("sequence", 1);
    return mongoOperations
        .findAndModify(query, update, new FindAndModifyOptions().returnNew(true),
            MongoSequence.class).map(MongoSequence::getSequence)
        .switchIfEmpty(createSequence(DEFAULT_SEQUENCE));
  }

  public Mono<Long> findCurrentSequence() {
    return mongoOperations
        .findById(entityInformation.getCollectionName(), MongoSequence.class)
        .map(MongoSequence::getSequence)
        .switchIfEmpty(createSequence(DEFAULT_SEQUENCE));
  }

  @Override
  public Flux<I> findIdAll() {
    return findId(new Query());
  }

  @Override
  public Flux<I> findId(Query query) {
    Assert.notNull(query, MESSAGE_NULL_QUERY);
    query.fields().include("_id");
    return mongoOperations.find(query, entityInformation.getJavaType())
        .map(entityInformation::getId);
  }

  Mono<Long> createSequence(final Long initValue) {
    MongoSequence seq = new MongoSequence();
    seq.setId(entityInformation.getCollectionName());
    seq.setSequence(initValue == null ? 0 : initValue);
    return mongoOperations.insert(seq).map(MongoSequence::getSequence);
  }

  public Mono<UpdateResult> updateFirst(String id, Update update) {
    Query query = new Query();
    query.addCriteria(Criteria.where("_id").is(id));

    return updateFirst(query, update);
  }

  public Mono<UpdateResult> updateFirst(String id, Document document) {
    Query query = new Query();
    query.addCriteria(Criteria.where("_id").is(id));
    return updateFirst(query, getUpdate(document));
  }

  public Mono<UpdateResult> updateFirst(Query query, Update update) {
    return mongoOperations.updateFirst(query, update, entityInformation.getJavaType());
  }

  public Mono<UpdateResult> updateFirst(Query query, Document document) {
    return updateFirst(query, getUpdate(document));
  }

  public Mono<UpdateResult> upsert(String _id, Update update) {
    Query query = new Query(Criteria.where("_id").is(_id));
    return mongoOperations.upsert(query, update, entityInformation.getJavaType());
  }

  public Mono<UpdateResult> upsert(Query query, Update update) {
    return mongoOperations.upsert(query, update, entityInformation.getJavaType());
  }

  private Update getUpdate(Document document) {
    Update update = new Update();
    document.keySet().forEach(key -> update.set(key, document.get(key)));
    return update;
  }

}
