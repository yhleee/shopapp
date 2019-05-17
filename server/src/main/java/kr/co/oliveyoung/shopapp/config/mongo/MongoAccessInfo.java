package kr.co.oliveyoung.shopapp.config.mongo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "spring.datasource-mongo")
public class MongoAccessInfo {

    private String uri;
    private String username;
    private String password;
}
