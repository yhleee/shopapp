package kr.co.oliveyoung.shopapp.common;

import org.apache.commons.lang3.StringUtils;

public class EnvUtils {

  private EnvUtils() {
  }

  public static boolean isReal() {
    return "production".equals(getEnv());
  }

  public static boolean isBeta() {
    return "beta".equals(getEnv());
  }

  public static boolean isStage() {
    return "stage".equals(getEnv());
  }

  public static boolean isTest() {
    return "test".equals(getEnv());
  }

  public static boolean isDev() {
    return "dev".equals(getEnv());
  }

  public static boolean isLocal() {
    return "local".equals(getEnv());
  }

  public static boolean isUnderTest() {
    return isTest() || isDev() || isLocal();
  }

  public static String getEnv() {
    return StringUtils.defaultIfEmpty(System.getenv("env"), "local");
  }
}
