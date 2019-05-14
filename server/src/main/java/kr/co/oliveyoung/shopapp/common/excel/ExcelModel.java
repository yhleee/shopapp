package kr.co.oliveyoung.shopapp.common.excel;

import lombok.Getter;
import lombok.Setter;
import reactor.core.publisher.Flux;

@Getter
@Setter
public class ExcelModel<T> {
  private String fileName;
  private SheetDescriptor<T> sheetDescriptor;
  private Flux<T> data;

}
