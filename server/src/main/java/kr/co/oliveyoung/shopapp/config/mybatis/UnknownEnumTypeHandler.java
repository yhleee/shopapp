package kr.co.oliveyoung.shopapp.config.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import kr.co.oliveyoung.shopapp.common.UnknowableEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeException;

@Slf4j
public class UnknownEnumTypeHandler<E extends Enum<E>> extends TypedTypeHandler<E> {

  private final Class<E> type;
  private E unknown = null;

  public UnknownEnumTypeHandler(Class<E> type) {
    super(type);
    this.type = type;
    if (type.getEnumConstants() != null) {
      UnknowableEnum<E> unknowableEnum = (UnknowableEnum<E>) type.getEnumConstants()[0];
      unknown = unknowableEnum.getUnknown();
    }
  }

  @Override
  public Class<E> getJavaType() {
    return type;
  }

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, E parameter, JdbcType jdbcType)
      throws SQLException {
    if (!UnknowableEnum.class.isInstance(parameter)) {
      throw new TypeException("parameter is not instance of UnknowableEnum");
    }
    if (parameter.equals(unknown)) {
      ps.setString(i, null);
    }
    if (jdbcType == null) {
      ps.setString(i, parameter.name());
    } else {
      ps.setObject(i, parameter.name(), jdbcType.TYPE_CODE);
    }
  }

  @Override
  public E getNullableResult(ResultSet rs, String columnName) throws SQLException {
    String s = rs.getString(columnName);
    return convertStringToEnum(s);
  }

  @Override
  public E getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
    String s = rs.getString(columnIndex);
    return convertStringToEnum(s);
  }

  @Override
  public E getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
    String s = cs.getString(columnIndex);
    return convertStringToEnum(s);
  }

  public E convertStringToEnum(String s) {
    try {
      return StringUtils.isBlank(s) ? null : Enum.valueOf(type, s);
    } catch (Exception e) {
      log.warn("unknown enum type", e);
      return unknown;
    }
  }
}
