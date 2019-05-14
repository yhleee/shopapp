package kr.co.oliveyoung.shopapp.common.typeshare;


import io.github.lukehutch.fastclasspathscanner.FastClasspathScanner;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
public class TypeShareUtils extends TypeShareFormat {

  private String entityWithPaths;
  private String scanKeyEnum = "ENUM";
  private String scanKeyClass = "CLASS";

  @Getter
  private Map<String, List<String>> entityMap = new HashMap<>();

  public TypeShareUtils() {
    Map<String, List<Class<?>>> scanEntityMap = new HashMap<>();

    new FastClasspathScanner(entityPackage)
        .matchClassesWithAnnotation(
            CastToTypeScripts.class,
            target -> {
              if (target.isEnum()) {
                injectListOfMaps(scanKeyEnum, scanEntityMap, target);
              } else {
                injectListOfMaps(scanKeyClass, scanEntityMap, target);
              }
              CastToTypeScripts handler = target.getAnnotation(CastToTypeScripts.class);
              String unionFile = handler.unionFile();
              if (StringUtils.isNotEmpty(unionFile)) {
                injectListOfMaps(unionFile, filePathMap, target.getSimpleName());
              }
            })
        .scan();

    castToTypes(scanEntityMap.getOrDefault(scanKeyEnum, new ArrayList<>()));
    castToTypes(scanEntityMap.getOrDefault(scanKeyClass, new ArrayList<>()));
    injectImportFirst();

    entityWithPaths =
        "[" + entityMap.keySet().stream()
            .map(e -> "\"" + e + "\"").collect(Collectors.joining(", "))
            + "]";
  }

  private void castToTypes(List<Class<?>> classList) {
    List<TypeSortModel> tempList = new ArrayList<>();
    classList.forEach(e -> {
      CastToTypeScripts handler = e.getAnnotation(CastToTypeScripts.class);
      String unionFile = handler.unionFile();

      if (StringUtils.isNotEmpty(unionFile)) {
        int order = handler.order();
        if (order >= 0 ) {
          tempList.add(new TypeSortModel(order, unionFile, getData(e, unionFile)));
        } else {
          injectListOfMaps(StringUtils.uncapitalize(unionFile), entityMap, getData(e, unionFile));
        }
      } else {
        injectListOfMaps(StringUtils.uncapitalize(e.getSimpleName()), entityMap, getData(e, null));
      }
    });
    sortedList(tempList);
  }

  private void sortedList(List<TypeSortModel> tempList) {
    if (!CollectionUtils.isEmpty(tempList)) {
      List<TypeSortModel> sList = tempList.stream().sorted(Comparator.comparing(TypeSortModel::getOrder))
          .collect(Collectors.toList());
      sList.forEach(c -> injectListOfMaps(c.getUnionFile(), entityMap, c.getData()));
    }
  }

  private void injectImportFirst() {
    unionImportMap.forEach((k,v) -> {
      List<String> list = entityMap.get(k);
      list.addAll(0, v);
      list.add(v.size(), "\n");
    });
  }

  private String getData(Class<?> clazz, String unionFile) {
    return clazz.isEnum()? shareTypeEnum(clazz) : shareTypeInterface(clazz, unionFile);
  }

  public String getTypeScriptInterfaceList() {
    if (StringUtils.equals(entityWithPaths, "[]")) {
      return "";
    }
    return entityWithPaths;
  }

  public String getTypeScriptInterface(String key) {
    return entityMap.get(key).stream().collect(Collectors.joining());
  }
}
