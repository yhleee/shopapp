package kr.co.oliveyoung.shopapp.feature.test;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ClassicModelsProductMapper {

  @Select("select * from products limit 100")
  List<ClassicModelsProduct> getClassicModelsProducts();

  List<ClassicModelsProduct> selectClassicModelsProducts(ClassicModelsProductCriteria criteria);
}
