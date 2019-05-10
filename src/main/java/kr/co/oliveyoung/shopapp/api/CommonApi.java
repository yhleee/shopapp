package kr.co.oliveyoung.shopapp.api;

import kr.co.oliveyoung.shopapp.feature.test.ClassicModelsProduct;
import kr.co.oliveyoung.shopapp.feature.test.ClassicModelsProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Slf4j
public class CommonApi {

    @Autowired
    private ClassicModelsProductService testDbService;

    @GetMapping("/test")
    public String test() {
        log.info("================ [{}]", "test!!!!!");
        return "Gooood!";
    }

    @GetMapping("/test/db/products/{count}")
    public ResponseEntity<List<ClassicModelsProduct>> testDbProduct(@PathVariable int count) {
        List<ClassicModelsProduct> result = testDbService.getClassicModelsProducts();
        return new ResponseEntity<List<ClassicModelsProduct>>(result, HttpStatus.OK);
    }
}
