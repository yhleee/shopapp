package kr.co.oliveyoung.shopapp.feature.test;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class Test implements Serializable {


    private static final long serialVersionUID = -3720356412776588306L;

    private Long id;
    private String message;

}
