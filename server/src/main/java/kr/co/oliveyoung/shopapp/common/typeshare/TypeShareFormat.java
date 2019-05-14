package kr.co.oliveyoung.shopapp.common.typeshare;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class TypeShareFormat {

  protected String entityPackage = "com.naver.shopping.feature";
  protected Map<String, List<String>> filePathMap = new HashMap<>();
  protected Map<String, List<String>> unionImportMap = new HashMap<>();

  private String defineEnum = "export enum %s {\n";
  private String defineConst = "export const %s = {\n";
  private String defineInterface = "interface %s {\n";
  private String defineImport = "import { %s } from './%s'\n";
  private String defineTypeConfig = "type %s = { [key in %s ]: %s } \n\n";
  private String defineValue = "  %s %s %s,\n";
  private String defineClose = "}\n\n";

  private String keyInterface = "interface";
  private String keyDefineData = "define";

  protected <T> void injectListOfMaps(String key, Map<String, List<T>> map, T data) {
    map.computeIfAbsent(key, k -> new ArrayList<>()).add(data);
  }

  protected String shareTypeEnum(Class entityClazz) {
    String className = entityClazz.getSimpleName();
    StringBuilder result = new StringBuilder(entityClazz.toString().length() * 3);

    result.append(bindFormat(defineEnum, className));
    for (Object ob : entityClazz.getEnumConstants()) {
      result.append(bindFormat(defineValue, ob.toString(), "=", "'" + ob.toString() + "'"));
    }
    result.append(defineClose);

    Map<String, String> configMap = getEnumData(entityClazz);
    if (StringUtils.isNotEmpty(configMap.get(keyInterface))
        && StringUtils.isNotEmpty(configMap.get("define"))) {

      String configName;
      if (className.contains("Type")) {
        configName = className.substring(0, className.length() - 4) + "Config";
      } else {
        configName = className + "Config";
      }

      String typeName = configName + "Type";

      result.append(bindFormat(defineInterface, configName))
          .append(configMap.get(keyInterface)).append(defineClose);
      result.append(bindFormat(defineTypeConfig, typeName, className, configName));
      result.append(bindFormat(defineConst, StringUtils.uncapitalize(configName) + ": " + typeName))
          .append(configMap.get(keyDefineData)).append(defineClose);
    }
    return injectImportEnum(entityClazz, result);
  }

  private <T extends Enum<T>> String injectImportEnum(Class<T> tClass, StringBuilder result) {
    String classKey = getFilePath(filePathMap, tClass.getSimpleName());

    for (Field field : tClass.getDeclaredFields()) {
      if (!field.isEnumConstant() && !field.isSynthetic()) {
        field.setAccessible(true);
        try {
          Object value = field.get(tClass.getEnumConstants()[0]);
          if (value == null) {
            continue;
          }
          if (value.getClass().isEnum()) {
            injectImportEnum(value.getClass().getSimpleName(), classKey, result);
          }
        } catch (IllegalAccessException e) {
          log.error("Failed to fetch enum data.");
        }
      }
    }
    return result.toString();
  }

  private void injectImportEnum(String entityName, String classKey, StringBuilder result) {
    Map<String, List<String>> importMap = new HashMap<>();

    String targetKey = getFilePath(filePathMap, entityName);
    if (!StringUtils.equals(targetKey, classKey) ||
        (StringUtils.isEmpty(targetKey) && StringUtils.isEmpty(classKey))) {
      if (StringUtils.isNotEmpty(targetKey)) {
        injectListOfMaps(targetKey, importMap, entityName);
      } else {
        result.insert(0, bindFormat(defineImport, entityName, entityName));
      }
    }
    importMap.forEach((k, v) -> result.insert(
        0, bindFormat(defineImport, v.stream().collect(Collectors.joining(", ")), k)));
  }

  private <T extends Enum<T>> Map<String, String> getEnumData(Class<T> tClass) {
    Map<String, String> dataMaps = new HashMap<>();

    dataMaps.put(keyInterface, getInterfaceData(tClass));
    dataMaps.put(keyDefineData, getDefineData(tClass));

    return dataMaps;
  }

  private <T> String getInterfaceData(Class<T> tClass) {
    StringBuilder result = new StringBuilder();

    for (Field field : tClass.getDeclaredFields()) {
      if (!field.isEnumConstant() && !field.isSynthetic()) {
        field.setAccessible(true);
        result.append(bindFormat(defineValue, field.getName() + "?", ":", getTypeName(field)));
      }
    }
    return result.toString();
  }

  private <T extends Enum<T>> String getDefineData(Class<T> tClass) {
    StringBuilder result = new StringBuilder();

    for (T enumValue : java.util.EnumSet.allOf(tClass)) {
      result.append("  ").append(enumValue.toString() + ": {\n");
      for (Field field : tClass.getDeclaredFields()) {
        try {
          if (!field.isEnumConstant() && !field.isSynthetic()) {
            field.setAccessible(true);
            Optional.ofNullable(field.get(enumValue))
                .ifPresent(value ->
                    result.append("  ").append(bindFormat(defineValue, field.getName(), ":",
                        value.getClass().isEnum() ? value.getClass().getSimpleName() + "." + value
                            .toString() : "'" + value.toString() + "'")));
          }
        } catch (IllegalAccessException e) {
          log.error("Failed to fetch enum data.");
        }
      }
      result.append("  ").append("},\n");
    }
    return result.toString();
  }

  protected String shareTypeInterface(Class entityClazz, String unionFile) {
    String className = entityClazz.getSimpleName();
    StringBuilder result = new StringBuilder(entityClazz.toString().length() * 3);
    List<String> importEntityNames = new ArrayList<>();

    if (StringUtils.isNotEmpty(unionFile)) {
      result.append("export ");
    }
    result.append(bindFormat(defineInterface, className));
    for (Field field : entityClazz.getDeclaredFields()) {
      if (field.isAnnotationPresent(JsonIgnore.class)) {
        continue;
      }
      String typeName = getTypeName(field);
      if (StringUtils.isNotEmpty(typeName) && !TypeDefine.contains(typeName)) {
        String tempEntityName = typeName.replace("[]", "");
        if (!importEntityNames.contains(tempEntityName)) {
          importEntityNames.add(typeName.replace("[]", ""));
        }
      }
      result.append(bindFormat(defineValue, field.getName() + "?", ":", typeName));
    }
    result.append(defineClose);

    if (StringUtils.isEmpty(unionFile)) {
      result.append("export default ").append(className).append("\n\n");
    }

    return injectImportEntity(importEntityNames, className, unionFile, result);
  }

  private String injectImportEntity(List<String> importEntityNames, String className,
      String unionFile, StringBuilder result) {
    Map<String, List<String>> importMap = new HashMap<>();
    Map<String, List<String>> mergeImportMap = new HashMap<>();

    importEntityNames.forEach(
        entityName -> {
          if (!StringUtils.equals(className, entityName)) {
            String key = getFilePath(filePathMap, entityName);
            if (!key.equals(unionFile)) {
              if (StringUtils.isNotEmpty(key) && StringUtils.isEmpty(unionFile)) {
                injectListOfMaps(key, importMap, entityName);
              } else if (StringUtils.isNotEmpty(key) && StringUtils.isNotEmpty(unionFile)) {
                injectListOfMaps(key, mergeImportMap, entityName);
              } else if (StringUtils.isNotEmpty(unionFile)) {
                injectListOfMaps(unionFile, unionImportMap,
                    bindFormat(defineImport, entityName, entityName));
              } else {
                result.insert(0, bindFormat(defineImport, entityName, entityName));
              }
            }
          }
        });

    importMap.forEach((k, v) -> result.insert(
        0, bindFormat(defineImport, v.stream().collect(Collectors.joining(", ")), k)));

    mergeImportMap.forEach((k, v) -> injectListOfMaps(unionFile, unionImportMap,
        bindFormat(defineImport, v.stream().collect(Collectors.joining(", ")), k)));

    return result.toString();
  }

  private String bindFormat(String format, Object... value) {
    return String.format(format, (Object[]) value);
  }

  private String getFilePath(Map<String, List<String>> map, String value) {
    return map.entrySet().stream()
        .filter(e -> e.getValue().contains(value))
        .map(r -> r.getKey()).collect(Collectors.joining());
  }

  private String getTypeName(Field field) {
    TypeDefine r = TypeDefine.findByTypeDefine(field);
    if (r.equals(TypeDefine.CLASS) || r.equals(TypeDefine.OBJECTS)) {
      String filedName = null;
      if (r.equals(TypeDefine.OBJECTS)) {
        String fieldGenericString = field.toGenericString();
        if (StringUtils.contains(fieldGenericString, "<")) {
          filedName =
              StringUtils.substring(
                  fieldGenericString,
                  StringUtils.indexOf(fieldGenericString, "<") + 1,
                  StringUtils.indexOf(fieldGenericString, ">"));
          if (!StringUtils.contains(filedName, entityPackage)) {
            return r.getCode();
          }
        }
      } else {
        filedName = field.getType().toString();
      }
      return getTypeCheck(filedName, r);
    }
    return r.getCode();
  }

  private String getTypeCheck(String result, TypeDefine type) {
    String[] separateString = StringUtils.splitByWholeSeparator(result, ".");
    if (ArrayUtils.isNotEmpty(separateString)) {
      String object = separateString[separateString.length - 1];
      return TypeDefine.OBJECTS.equals(type) ? object + "[]" : object;
    }
    return type.getCode();
  }
}
