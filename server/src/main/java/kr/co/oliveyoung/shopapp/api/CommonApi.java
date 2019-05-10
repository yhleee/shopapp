package kr.co.oliveyoung.shopapp.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Slf4j
public class CommonApi {

    @GetMapping("/test/{message}")
    public String test(@PathVariable String message) {
        log.info("================ [{}]", message);
        return "message: " + message;
    }

}
