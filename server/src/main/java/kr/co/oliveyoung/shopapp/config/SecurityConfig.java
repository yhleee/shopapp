package kr.co.oliveyoung.shopapp.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  // @formatter:off
  @Override
  public void configure(WebSecurity web) {
    // Spring-security는 Spring-boot의 static resource 기본설정에도 authorizing을 강요합니다.
    // 아래는 이를 무시하게 하는 설정입니다.
    web
        .ignoring()
        .antMatchers("/**")
        .antMatchers("/docs/**");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    http
//        .addFilterBefore(preAuthFilter(), PreAuthenticatedFilter.class)
        .csrf().disable()
        .cors().disable()
        .headers().disable()
        .exceptionHandling()
//        .accessDeniedHandler(accessDeniedHandler())
//        .authenticationEntryPoint(userAuthEntryPoint())
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER);
  }
  // @formatter:on

//  @Bean
//  public SecurityUserFactory userFactory() {
//    return new SecurityIIMSUserFactory();
//  }
//
//  @Bean
//  protected AuthenticationEntryPoint userAuthEntryPoint() {
//    return new UserAuthenticationEntryPoint();
//  }
//
//  @Bean
//  public PreAuthenticatedFilter preAuthFilter() {
//    return new PreAuthenticatedFilter(userFactory());
//  }
//
//  @Bean
//  protected SampleAccessDeniedHandler accessDeniedHandler() {
//    return new SampleAccessDeniedHandler();
//  }
}
