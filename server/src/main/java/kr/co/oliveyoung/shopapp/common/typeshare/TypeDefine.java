package kr.co.oliveyoung.shopapp.common.typeshare;


import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

public enum TypeDefine {
  BOOLEAN("boolean", Arrays.asList(Boolean.class, boolean.class)),
  NUMBER("number", Arrays.asList(Byte.class, byte.class, Short.class, short.class, Integer.class, int.class, Long.class,
      long.class, Float.class, float.class, Double.class, double.class, BigDecimal.class)),
  OBJECTS("any[]", Arrays.asList(List.class, Set.class, Queue.class)),
  OBJECT("object", Arrays.asList(Map.class, Object.class)),
  STRING("string", Arrays.asList(String.class)),
  DATE("Date", Arrays.asList(Date.class, LocalDate.class, LocalTime.class, LocalDateTime.class,
      ZonedDateTime.class)),
  CLASS("string", Collections.emptyList());

  private String code;
  private List<Class> typeList;
  private static Set<String> values = new HashSet<>(TypeDefine.values().length);

  TypeDefine(String code, List<Class> typeList) {
    this.code = code;
    this.typeList = typeList;
  }

  static{
    for(TypeDefine t: TypeDefine.values())
      values.add(t.getCode());
  }


  public static TypeDefine findByTypeDefine(Field field) {
    return Arrays.stream(TypeDefine.values())
        .filter(typeDefine -> typeDefine.hasTypeDefine(field))
        .findAny()
        .orElse(CLASS);
  }

  public static TypeDefine findByCode(String code) {
    return Arrays.stream(TypeDefine.values())
        .filter(typeDefine -> typeDefine.code.equals(code))
        .findFirst()
        .orElse(OBJECT);
  }

  public boolean hasTypeDefine(Field field) {
    return typeList.stream()
        .anyMatch(type -> type.equals(field.getType()));
  }

  public static boolean contains(String code) {
    return values.contains(code);
  }

  public String getCode() { return code; }
}