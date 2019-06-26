package kr.co.oliveyoung.shopapp.services.api.rank;

import kr.co.oliveyoung.shopapp.feature.rank.Rank;
import kr.co.oliveyoung.shopapp.feature.rank.RankMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class RankService {

    @Autowired
    RankMapper mapper;

    List<Rank> selectRankList() {
        return mapper.selectRankList();
    }

    List<Rank> selectCategoryList(Rank param) {
        return mapper.selectCategoryList(param);
    }

}
