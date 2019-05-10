package kr.co.oliveyoung.shopapp.common.config.spring;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.boot.env.YamlPropertySourceLoader;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

@Slf4j
public class EnvironmentPostYamlProcessor implements EnvironmentPostProcessor {

  private final YamlPropertySourceLoader loader = new YamlPropertySourceLoader();

  @Override
  public void postProcessEnvironment(
      ConfigurableEnvironment environment, SpringApplication application) {
    ResourcePatternResolver patternResolver = new PathMatchingResourcePatternResolver();
    try {
      Resource[] resources = patternResolver.getResources("classpath*:config/**/*.yml");
      if (resources.length > 0) {
        String activeProfiles = environment.getProperty("spring.profiles.active");
        for (Resource resource : resources) {
          List<PropertySource<?>> propertySources = loadYaml(resource, activeProfiles);
          propertySources.forEach(
              (propertySource) -> environment.getPropertySources().addLast(propertySource));
        }
      }
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
  }

  private List<PropertySource<?>> loadYaml(Resource path, String activeProfiles) {
    if (!path.exists()) {
      throw new IllegalArgumentException("Resource " + path + " does not exist");
    }
    try {
      List<PropertySource<?>> propertySources = new ArrayList<>();
      List<PropertySource<?>> loadedSources =
          this.loader.load("service-props " + path.getFilename(), path);
      if (!loadedSources.isEmpty()) {
        loadedSources.forEach(
            (propertySource) -> {
              if (!propertySource.containsProperty("spring.profiles")) {
                propertySources.add(propertySource); // default
              } else {
                String propertyProfiles =
                    String.valueOf(propertySource.getProperty("spring.profiles"));
                if (StringUtils.equals(activeProfiles, propertyProfiles)) {
                  propertySources.add(0, propertySource);
                }
              }
            });
      }
      return propertySources;
    } catch (IOException ex) {
      throw new IllegalStateException("Failed to load yaml configuration from " + path, ex);
    }
  }
}
