package kr.co.oliveyoung.shopapp.feature.manage;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class WorkReportCriteria implements Serializable {
    private static final long serialVersionUID = -4655367327591379775L;

    private String type;
    private String task;
    private String owner;
    private String month;
    private Date startDate;
    private Date endDate;
    private String state;
    private String remove;
}
