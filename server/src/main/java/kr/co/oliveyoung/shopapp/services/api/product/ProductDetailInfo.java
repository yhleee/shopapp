package kr.co.oliveyoung.shopapp.services.api.product;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductDetailInfo implements Serializable {
    private static final long serialVersionUID = -8342985071333801485L;
    private String html;
    private String imageUrl;
    private String name;
    private String pid;
    private String brandName;
    private String price;
    private String salePrice;
    private String reviewPoint;
    private String reviewStarHtml;
    private String reviewPollHtml;
    private String volume;
}
