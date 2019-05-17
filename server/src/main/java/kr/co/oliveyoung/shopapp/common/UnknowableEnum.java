package kr.co.oliveyoung.shopapp.common;

public interface UnknowableEnum<T extends Enum<T>> {

  public T getUnknown();
}
