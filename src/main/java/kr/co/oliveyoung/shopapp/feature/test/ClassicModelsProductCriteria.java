package kr.co.oliveyoung.shopapp.feature.test;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ClassicModelsProductCriteria extends ClassicModelsProduct {

  private Long pageNo;

  private Long PageSize;

  private Integer selectCount;

}
