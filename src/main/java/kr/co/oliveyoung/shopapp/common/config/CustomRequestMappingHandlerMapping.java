package kr.co.oliveyoung.shopapp.common.config;

import java.lang.reflect.Method;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

public class CustomRequestMappingHandlerMapping extends RequestMappingHandlerMapping {

	private static final String REST_API_BASE_PATH = "/api";

  @Override
  protected RequestMappingInfo getMappingForMethod(Method method, Class<?> handlerType) {
    RequestMappingInfo requestMappingInfo = super.getMappingForMethod(method, handlerType);
    if (AnnotatedElementUtils.hasAnnotation(handlerType, RestController.class)) {
      return addBaeUrlPath(requestMappingInfo);
	  }
	  return requestMappingInfo;
	}

  private RequestMappingInfo addBaeUrlPath(RequestMappingInfo mappingInfo) {
    if (mappingInfo == null) return null;

	  PatternsRequestCondition condition = mappingInfo.getPatternsCondition();
	  String[] basePaths = condition.getPatterns()
	    .stream()
	    .map(pattern -> pattern.startsWith(REST_API_BASE_PATH) ? "" : REST_API_BASE_PATH)
	    .toArray(String[]::new);
	  return RequestMappingInfo.paths(basePaths).build().combine(mappingInfo);
  }
}
