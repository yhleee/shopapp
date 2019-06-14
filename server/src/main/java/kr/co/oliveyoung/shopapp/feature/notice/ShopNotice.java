package kr.co.oliveyoung.shopapp.feature.notice;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;

@Alias("shopNotice")
@Data
public class ShopNotice implements Serializable  {
    private static final long serialVersionUID = -2323024886137605959L;

    private Long id;
    private String strCd;
    private String text;
    private Date wrtYmdt;
    private String wrtrUsrId;
    private Date modYmdt;
    private String modUsrId;
    private String delYn;
}
