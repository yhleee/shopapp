package kr.co.oliveyoung.shopapp.services.api.notice;

import kr.co.oliveyoung.shopapp.feature.notice.StoreNotice;
import kr.co.oliveyoung.shopapp.feature.notice.StoreNoticeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class StoreNoticeService {

    @Autowired
    private StoreNoticeMapper mapper;

    StoreNotice getStoreNotice(String storeCode) {
        StoreNotice params = new StoreNotice();
        params.setStrCd(storeCode);
        return mapper.selectTbShpNotice(params);
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
