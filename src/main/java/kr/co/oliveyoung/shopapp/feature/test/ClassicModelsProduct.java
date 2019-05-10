package kr.co.oliveyoung.shopapp.feature.test;

import java.io.Serializable;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class ClassicModelsProduct implements Serializable {

  private static final long serialVersionUID = -9054121765605882316L;

  private String productCode;
  private String productName;
  private String productLine;
  private String productScale;
  private String prouctVendor;
  private String productDescription;
  private Integer quantityInStock;
  private Long buyPrice;
  private Long msrp;

}
