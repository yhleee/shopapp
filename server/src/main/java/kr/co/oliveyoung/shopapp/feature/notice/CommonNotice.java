package kr.co.oliveyoung.shopapp.feature.notice;

import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;

@Alias("commonNotice")
@Data
public class CommonNotice implements Serializable  {

    private String itemId;
    private String clsText;
    private String title;
    private String regDt;

    private String itemSeqId;
    private String textContents;
    private String hitCnt;
    private String attachFileCnt;
    private String imageFileId;
    private String fileRealNm;
    private String fileLink;
    private Date regDate;
    private String regNm;
    private Date modDate;
    private String modNm;



}
