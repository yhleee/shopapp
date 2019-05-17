package kr.co.oliveyoung.shopapp.repository;

import java.io.Serializable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface MongoQueryRepository<T, I extends Serializable> extends MongoRepository<T, I> {

  Page<T> findAll(Query query, Pageable pageable);

  Page<T> findAll(final Query query, final int page, final int size, final Order... orders);

  long count(Query query);
}
