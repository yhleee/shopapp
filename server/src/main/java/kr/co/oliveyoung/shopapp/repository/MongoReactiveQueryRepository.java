package kr.co.oliveyoung.shopapp.repository;

import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.NoRepositoryBean;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@NoRepositoryBean
public interface MongoReactiveQueryRepository<T, I> extends ReactiveMongoRepository<T, I> {

  Flux<T> findAll(Query query);

  Flux<T> findAll(Query query, Pageable pageable);

  Flux<T> findAll(final Query query, final int page, final int size, final Order... orders);

  Mono<T> findOneAndUpdate(Query query, Update update);

  Mono<Long> count(Query query);

  Mono<Long> findNextSequence();

  Mono<Long> findCurrentSequence();

  Flux<I> findIdAll();

  Flux<I> findId(Query query);

  Mono<UpdateResult> updateFirst(String id, Update update);

  Mono<UpdateResult> updateFirst(String id, Document document);

  Mono<UpdateResult> updateFirst(Query query, Update update);

  Mono<UpdateResult> upsert(String id, Update update);

  Mono<UpdateResult> upsert(Query query, Update update);

}
