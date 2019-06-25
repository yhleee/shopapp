package kr.co.oliveyoung.shopapp.feature.rank;

import kr.co.oliveyoung.shopapp.config.mybatis.MySqlMapper;

import java.util.List;

@MySqlMapper
public interface RankMapper {

    List<Rank> selectRankList();
    List<Rank> selectCategoryList(Rank param);
}
