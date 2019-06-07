package kr.co.oliveyoung.shopapp.feature.search;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OracleSearch implements Serializable {

    private static final long serialVersionUID = -3720356412776588306L;

    private String rank;
    private String id;
    private String productName;
    private String linkUrl;
    private String imageUrl;
    private String shrtGdsNm;
    private String gdsSclsCd;
    private String brndCd;
    private String brandName;
    private String shrtBrndNm;
    private String sellPrc;
    private String dcRt;
    private String dcSellPrc;
    private String price;

}
