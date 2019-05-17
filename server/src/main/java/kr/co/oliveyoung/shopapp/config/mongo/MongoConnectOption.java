package kr.co.oliveyoung.shopapp.config.mongo;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

@Getter
@Setter
@Component
@ConfigurationProperties("spring.data.mongodb")
public class MongoConnectOption {

  private String connectTimeoutMS;
  private String socketTimeoutMS;

  String getDefault() {
    return makeOptionParamStr(defaultOption());
  }

  private Map<String, String> defaultOption() {
    return Map.of("socketTimeoutMS", socketTimeoutMS, "connectTimeoutMS", connectTimeoutMS);
  }

  private String makeOptionParamStr(Map<String, String> option) {
    Map<String, List<String>> collect = option.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getKey, entry -> List.of(entry.getValue())));
    return UriComponentsBuilder
        .newInstance()
        .queryParams(new LinkedMultiValueMap<>(collect))
        .build()
        .toUriString();
  }

  String getSecondaryPreferred() {
    Map<String, String> option = new HashMap<>(defaultOption());
    option.put("readPreference", "secondaryPreferred");
    return makeOptionParamStr(option);
  }

}
