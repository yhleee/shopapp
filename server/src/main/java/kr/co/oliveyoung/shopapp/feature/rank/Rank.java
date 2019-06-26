package kr.co.oliveyoung.shopapp.feature.rank;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Alias("rank")
@Data
public class Rank implements Serializable  {

    // Input
    private int start;
    private int limit;
    private String period;
    private String lcd;
    private String mcd;
    private String scd;
    private String age;
    private String gender;

    // OutPut
    private int rank;
    private String type;
    private String code;
    private String name;
    private String strCd;
    private String strNm;
    private String gdsCd;
    private String gdsNm;
    private String brdCd;
    private String brdNm;
    private String gdsClsCd;
    private String gdsClsNm;
    private long sumQty;
    private long sumAmt;

    private List<Rank> categoryProductList;
    private List<Rank> brandProductList;
    private List<Rank> ageProductList;
}
