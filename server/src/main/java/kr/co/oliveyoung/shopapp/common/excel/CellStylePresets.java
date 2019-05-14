package kr.co.oliveyoung.shopapp.common.excel;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;

public class CellStylePresets {

  private CellStylePresets() {
    throw new IllegalStateException("Utility class");
  }

  public static CellStyle defaultHeaderStyle(Workbook workbook) {
    CellStyle cellStyle = workbook.createCellStyle();
    cellStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
    cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    return cellStyle;
  }
}
