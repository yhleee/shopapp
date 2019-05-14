package kr.co.oliveyoung.shopapp.common.excel;

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

@FunctionalInterface
public interface WriteHeaderRow {
  void apply(Sheet sheet, Workbook workbook);
}
