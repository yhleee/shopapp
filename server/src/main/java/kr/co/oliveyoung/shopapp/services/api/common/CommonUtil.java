package kr.co.oliveyoung.shopapp.services.api.common;

import java.util.List;
import kr.co.oliveyoung.shopapp.feature.common.OracleBrand;
import kr.co.oliveyoung.shopapp.feature.common.OracleBrandMapper;
import kr.co.oliveyoung.shopapp.feature.common.OracleCategory;
import kr.co.oliveyoung.shopapp.feature.common.OracleCategoryMapper;

public class CommonUtil {

  CommonUtil(){}

  public List<OracleCategory> getCategories(OracleCategoryMapper oracleCategoryMapper){

    List<OracleCategory> categoryList = oracleCategoryMapper.selectCategoryList("root", 1);
    if(categoryList != null) {
      for(int i = 0 ; i < categoryList.size() ; i++){
        switch(i){
          case 0:
            categoryList.get(i).setCategoryImage("http://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0000/A00000000330801ko.jpg?l=ko");
            break;
          case 1:
            categoryList.get(i).setCategoryImage("http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012388101ko.jpg?l=ko");
            break;
          case 2:
            categoryList.get(i).setCategoryImage("http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012470701ko.jpg?l=ko");
            break;
          case 3:
            categoryList.get(i).setCategoryImage("http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0012/A00000012483201ko.jpg?l=ko");
            break;
          case 4:
            categoryList.get(i).setCategoryImage("http://image.oliveyoung.co.kr/uploads/images/goods/400/10/0000/0001/A00000001630904ko.jpg?l=ko");
            break;
        }
        categoryList.get(i).setCategory(
            oracleCategoryMapper.selectCategoryList(categoryList.get(i).getCategoryId(), 2));
        for(int j = 0 ; j < categoryList.get(i).getCategory().size() ; j++) {
          categoryList.get(i).getCategory().get(j).setCategory(
              oracleCategoryMapper.selectCategoryList(categoryList.get(i).getCategory().get(j).getCategoryId(), 3));
        }
      }
    }
    return categoryList;
  }

  public List<OracleBrand> getBrandList(OracleBrandMapper oracleBrandMapper){
    return oracleBrandMapper.selectBrandList();
  }
}
