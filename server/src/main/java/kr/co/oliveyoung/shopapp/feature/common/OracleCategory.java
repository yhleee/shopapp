package kr.co.oliveyoung.shopapp.feature.common;

import java.io.Serializable;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OracleCategory implements Serializable {

    private static final long serialVersionUID = -3720356412776588306L;

    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String depth;
    private List<OracleCategory> category;

}
