package kr.co.oliveyoung.shopapp.config.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.JdbcType;

@Slf4j
public class ExtendsEnumTypeHandler<E extends Enum<E>> extends TypedTypeHandler<E> {

  private final Class<E> type;

  public ExtendsEnumTypeHandler(Class<E> type) {
    super(type);
    this.type = type;
  }

  @Override
  public Class<E> getJavaType() {
    return type;
  }

  @Override
  public void setNonNullParameter(PreparedStatement ps, int i, E parameter, JdbcType jdbcType)
      throws SQLException {
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
      log.warn("Fail to convert enum.", e);
      return null;
    }
  }
}
