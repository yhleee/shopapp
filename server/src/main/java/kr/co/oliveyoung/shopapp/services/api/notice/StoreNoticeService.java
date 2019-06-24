package kr.co.oliveyoung.shopapp.services.api.notice;

import kr.co.oliveyoung.shopapp.feature.notice.CommonNoticeMapper;
import kr.co.oliveyoung.shopapp.feature.notice.StoreNotice;
import kr.co.oliveyoung.shopapp.feature.notice.StoreNoticeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class StoreNoticeService {

    @Autowired
    private StoreNoticeMapper mapper;

    @Autowired
    private CommonNoticeMapper cMapper;

    StoreNotice getStoreNotice(String storeCode) {
        StoreNotice params = new StoreNotice();
        params.setStrCd(storeCode);
        return mapper.selectTbShpNotice(params);
    }

    List<StoreNotice> getCommonNotice() {
        StoreNotice params = new StoreNotice();
        return cMapper.selectCommNotice(params);
    }

    void addStoreNotice(String storeCode, String text, String userId) {
        StoreNotice params = new StoreNotice();
        params.setStrCd(storeCode);
        params.setText(text);
        params.setModUsrId(userId);
        params.setRegUsrId(userId);
        mapper.insertTbShpNotice(params);
    }

    void modifyStoreNotice(String text, String userId) {
        StoreNotice params = new StoreNotice();
        params.setText(text);
        params.setModUsrId(userId);
        mapper.updateTbShpNotice(params);
    }

    void removeStoreNotice(String userId) {
        StoreNotice params = new StoreNotice();
        params.setModUsrId(userId);
        params.setDelYn("Y");
        mapper.updateTbShpNotice(params);
    }
}
