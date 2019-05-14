package kr.co.oliveyoung.shopapp.common.excel;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

@FunctionalInterface
public interface WriteDataRow<T> {
  void apply(T data, Row row, Sheet sheet, Workbook workbook);
}
