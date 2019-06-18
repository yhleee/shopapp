package kr.co.oliveyoung.shopapp.feature.common;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OracleBrand implements Serializable {

    private static final long serialVersionUID = -3720356412776588306L;

    private String brandCode;
    private String brandName;
    private String categoryLevel;
    private String categoryId;

}
