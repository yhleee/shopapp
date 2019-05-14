package kr.co.oliveyoung.shopapp.config;

import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class WebConfig implements WebMvcConfigurer, WebMvcRegistrations {

  @Override
  public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
    return new CustomRequestMappingHandlerMapping();
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("*")
      .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
      .exposedHeaders("X-Total-Count")
      .allowCredentials(true)
      .maxAge(3600);
  }
}
