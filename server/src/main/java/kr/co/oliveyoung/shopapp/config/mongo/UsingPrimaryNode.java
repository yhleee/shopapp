package kr.co.oliveyoung.shopapp.config.mongo;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * Repository에 UsingPrimaryNode annotation을 추가하면 read query가 Primary node에서 수행된다
 *
 * <h2>Example</h2>
 * <pre class="code">
 * &#064;UsingPrimaryNode public interface FooRepository extends
 * MongoRepository {
 *
 * }
 * </pre>
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface UsingPrimaryNode {

}
