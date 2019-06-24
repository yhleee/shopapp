package kr.co.oliveyoung.shopapp.feature.notice;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;

@Alias("shopNotice")
@Data
public class StoreNotice implements Serializable  {
    private static final long serialVersionUID = -2323024886137605959L;

    private Long noticeNo;
    private String strCd;
    private String clsText;
    private String text;
    private String noticeDt;
    private String regUsrId;
    private Date regDt;
    private Date modDt;
    private String modUsrId;
    private String delYn;
}
