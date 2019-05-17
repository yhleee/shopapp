package kr.co.oliveyoung.shopapp.config.mybatis;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import org.apache.ibatis.type.BaseTypeHandler;

public abstract class TypedTypeHandler<T> extends BaseTypeHandler<T> implements ParameterizedType {

  private final Class<T> javaType;

  public TypedTypeHandler(Class<T> javaType) {
    super();
    this.javaType = javaType;
  }

  public Class<T> getJavaType() {
    return javaType;
  }

  /**
   * @see ParameterizedType#getActualTypeArguments()
   */
  @Override
  public Type[] getActualTypeArguments() {
    return new Type[]{javaType};
  }

  /**
   * @see ParameterizedType#getOwnerType()
   */
  @Override
  public Type getOwnerType() {
    return javaType;
  }
}
