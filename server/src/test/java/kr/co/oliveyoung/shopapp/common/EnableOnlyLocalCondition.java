package kr.co.oliveyoung.shopapp.common;

import org.junit.jupiter.api.extension.ConditionEvaluationResult;
import org.junit.jupiter.api.extension.ExecutionCondition;
import org.junit.jupiter.api.extension.ExtensionContext;

public class EnableOnlyLocalCondition implements ExecutionCondition {

  @Override
  public ConditionEvaluationResult evaluateExecutionCondition(ExtensionContext context) {
    if (EnvUtils.isLocal()) {
      return ConditionEvaluationResult.enabled("RUN TEST ON LOCAL ENV");
    } else {
      return ConditionEvaluationResult.disabled("DO NOT RUN TEST ON NON-LOCAL ENV");
    }
  }
}
