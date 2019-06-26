package kr.co.oliveyoung.shopapp.services.api.rank;

import kr.co.oliveyoung.shopapp.feature.rank.Rank;
import kr.co.oliveyoung.shopapp.feature.rank.RankMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class RankService {

    @Autowired
    RankMapper mapper;

    Rank selectRankList() {
        List<Rank> ret =  mapper.selectRankList();

        Rank result = new Rank();
        List<Rank> catList = new ArrayList<>();
        List<Rank> memList = new ArrayList<>();
        List<Rank> brdList = new ArrayList<>();
        for(Rank rank : ret) {
            if (rank.getType().equalsIgnoreCase("CAT")) {
                catList.add(rank);
            } else if (rank.getType().equalsIgnoreCase("MEM")) {
                memList.add(rank);
            } else if (rank.getType().equalsIgnoreCase("BRD")) {
                brdList.add(rank);
            }
        }
        result.setCategoryProductList(catList);
        result.setAgeProductList(memList);
        result.setBrandProductList(brdList);

        return result;
    }

    List<Rank> selectCategoryList(Rank param) {
        return mapper.selectCategoryList(param);
    }

    List<Rank> selectMemberList(Rank param) {
        return mapper.selectMemberList(param);
    }

    List<Rank> selectBrandList(Rank param) {
        return mapper.selectBrandList(param);
    }

}
