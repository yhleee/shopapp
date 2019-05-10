package kr.co.oliveyoung.shopapp.feature.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassicModelsProductService {
    @Autowired
    private ClassicModelsProductMapper mapper;

    public List<ClassicModelsProduct> getClassicModelsProducts() {
        return mapper.getClassicModelsProducts();
    }

    public List<ClassicModelsProduct> getClassicModelsProducts(int count) {
        ClassicModelsProductCriteria criteria = new ClassicModelsProductCriteria();
        criteria.setSelectCount(count);
        return mapper.selectClassicModelsProducts(criteria);
    }
}
