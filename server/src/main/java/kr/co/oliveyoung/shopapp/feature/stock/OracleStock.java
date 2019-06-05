package kr.co.oliveyoung.shopapp.feature.stock;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OracleStock implements Serializable {

    private static final long serialVersionUID = -3720356412776588306L;

    private String stroeCode;
    private String storeName;
    private String address;
    private String addrerssDetail;
    private String phoneNumber;
    private String distance;
    private String remainStock;
    private String lat;
    private String lng;

}
