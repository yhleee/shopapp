package kr.co.oliveyoung.shopapp;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableCaching
@Slf4j
@MapperScan("kr.co.oliveyoung.shopapp.feature")
@SpringBootApplication(scanBasePackages = "kr.co.oliveyoung.shopapp")
public class ShopAppApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
    SpringApplication.run(ShopAppApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(ShopAppApplication.class);
  }

  @Bean
  public RestTemplate getRestTemplate() {
    return new RestTemplateBuilder()
        .setConnectTimeout(3000)
        .setReadTimeout(5000)
        .build();
  }
}
