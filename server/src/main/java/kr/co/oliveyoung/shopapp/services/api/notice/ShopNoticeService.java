package kr.co.oliveyoung.shopapp.services.api.notice;

import kr.co.oliveyoung.shopapp.feature.notice.ShopNotice;
import kr.co.oliveyoung.shopapp.feature.notice.ShopNoticeMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ShopNoticeService {

    @Autowired
    private ShopNoticeMapper mapper;

    ShopNotice getShopNotice(String storeCode) {
        ShopNotice params = new ShopNotice();
        params.setStrCd(storeCode);
        return mapper.selectTbShpNotice(params);
    }

    void addShopNotice(String storeCode, String text, String userId) {
        ShopNotice params = new ShopNotice();
        params.setStrCd(storeCode);
        params.setText(text);
        params.setModUsrId(userId);
        params.setWrtrUsrId(userId);
        mapper.insertTbShpNotice(params);
    }

    void modifyShopNotice(String text, String userId) {
        ShopNotice params = new ShopNotice();
        params.setText(text);
        params.setModUsrId(userId);
        mapper.updateTbShpNotice(params);
    }

    void removeShopNotice(String userId) {
        ShopNotice params = new ShopNotice();
        params.setModUsrId(userId);
        params.setDelYn("Y");
        mapper.updateTbShpNotice(params);
    }
}
