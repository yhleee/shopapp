package kr.co.oliveyoung.shopapp.services.api.product;

import lombok.Data;

import java.io.Serializable;

@Data
public class ProductListItem implements Serializable {
    private static final long serialVersionUID = 2258278079787021754L;
    private String brandName;
    private String productName;
    private String price;
    private String imageUrl;

    public ProductListItem(String brandName, String productName, String price, String imageUrl) {
        this.brandName = brandName;
        this.productName = productName;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
