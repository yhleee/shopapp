package kr.co.oliveyoung.shopapp.common.excel;

import java.util.function.Function;
import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Workbook;

@Getter
@Setter
public class Column<T> {
  private String title;
  private Function<T, Object> value;
  private Integer widthByChars;
  private CellType dataCellType;
  private Function<Workbook, CellStyle> dataCellStyle;

  public int getWidth() {
    int charLength = this.widthByChars;
    if (charLength == 0 || charLength > 100) {
      charLength = 10;
    }
    return charLength * 256;
  }
}
