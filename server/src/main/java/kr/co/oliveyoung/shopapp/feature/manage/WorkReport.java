package kr.co.oliveyoung.shopapp.feature.manage;

import lombok.Data;
import org.apache.commons.httpclient.util.DateUtil;

import java.io.Serializable;
import java.util.Date;

@Data
public class WorkReport implements Serializable {
    private static final long serialVersionUID = -6039432962773733261L;

    private Long no;
    private String type;
    private String task;
    private String detail;
    private String owner;
    private String schedule;
    private String state;
    private String etc;
    private String remove;
}
