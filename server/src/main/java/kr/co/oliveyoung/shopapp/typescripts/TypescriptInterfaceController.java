package kr.co.oliveyoung.shopapp.typescripts;

import kr.co.oliveyoung.shopapp.common.typeshare.TypeShareUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/typescript/entities")
public class TypescriptInterfaceController {

  @Autowired
  private TypeShareUtils typeShareUtils;

  @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
  public Mono<String> get()  {
    return Mono.just(typeShareUtils.getTypeScriptInterfaceList());
  }

  @GetMapping(value = "/{className}", produces = MediaType.TEXT_PLAIN_VALUE)
  public Mono<String> getOne(@PathVariable String className) {
    return Mono.just(typeShareUtils.getTypeScriptInterface(className));
  }
}
