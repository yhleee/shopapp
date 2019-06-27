package kr.co.oliveyoung.shopapp.services.api.product;

import kr.co.oliveyoung.shopapp.common.utils.Generics;
import lombok.Data;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.io.Serializable;
import java.util.List;

@Data
public class ProductSearchCriteria implements Serializable {

    private static final long serialVersionUID = -8548175962923700252L;
    private String query;
    private Integer startCount;
    private String displayCateId;
    private String cateId1;
    private String cateId2;
    private String cateId3;
    private String sale_below_price; // 이러면 안되요....
    private String sale_over_price; // 네이밍에 일관성이 있어야지...
    private String goods_sort;
    private String brandCheck;
    private String benefitCheck;
    private String quickYn = "N";
    private String typeChk = "one";
}
