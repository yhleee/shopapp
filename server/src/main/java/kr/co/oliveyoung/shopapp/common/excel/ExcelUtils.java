package kr.co.oliveyoung.shopapp.common.excel;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import kr.co.oliveyoung.shopapp.common.error.CommonException;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.CollectionUtils;
import reactor.core.publisher.Flux;

@Slf4j
public class ExcelUtils {

  private ExcelUtils() {
    throw new IllegalStateException("Utility class");
  }

  public static <T> Flux<T> writeExcel(ExcelModel<T> excelModel, OutputStream outputStream) {
    Flux<T> fluxData = excelModel.getData() == null ? Flux.just() : excelModel.getData();
    SheetDescriptor<T> sheetDescriptor = excelModel.getSheetDescriptor();
    List<Column<T>> columns = sheetDescriptor.getColumns();

    SXSSFWorkbook workbook = new SXSSFWorkbook();
    SXSSFSheet sheet = workbook.createSheet(sheetDescriptor.getSheetName());

    if (CollectionUtils.isEmpty(columns)) {
      sheetDescriptor.getWriteHeaderRow().apply(sheet, workbook);
    } else {
      writeHeaderRow(sheetDescriptor, sheet, workbook);
    }

    return fluxData
    .index((index, obj) -> {
      int dataRowIndex = index.intValue() + 1;
      if (CollectionUtils.isEmpty(columns)) {
        sheetDescriptor.getWriteDataRow().apply(obj, sheet.createRow(dataRowIndex), sheet,workbook);
      } else {
        writeDataRow(dataRowIndex, obj, sheetDescriptor, sheet, workbook);
      }
      return obj;
    }).doOnError(e -> {
      log.error("Error occurred in ExcelUtils. {}", e);
    }).doOnComplete(() -> {
      try {
        workbook.write(outputStream);
      } catch (IOException e) {
        throw new CommonException(e.getMessage());
      }
    }).doFinally(c -> {
      try {
        outputStream.close();
        workbook.dispose();
        workbook.close();
      } catch (IOException e) {
        throw new CommonException(e.getMessage());
      }
    });
  }

  public static <T> List<T> readExcel(ExcelModel<T> excelModel, InputStream inputStream) throws IOException {
    List<T> dataList = new ArrayList<>();

    SheetDescriptor<T> sheetDescriptor = excelModel.getSheetDescriptor();
    ReadRow<T> readRow = sheetDescriptor.getReadRow();

    XSSFWorkbook workbook = null;
    XSSFSheet sheet = null;
    try {
      workbook = new XSSFWorkbook(inputStream);
      sheet = workbook.getSheetAt(0);
    } catch (Exception e) {
      throw new CommonException("*.xlsx 엑셀 문서만 업로드 가능합니다.");
    }

    Iterator<Row> it = sheet.iterator();
    while(it.hasNext()) {
      Row row = it.next();
      T data = readRow.apply(row, sheet, workbook);
      if (data != null) {
        dataList.add(data);
      }
    }
    return dataList;
  }

  public static String getStringValue(Cell cell) {
    if (cell == null) return "";

    switch(cell.getCellTypeEnum()) {
      case NUMERIC:
        return String.valueOf(cell.getNumericCellValue());
      case BOOLEAN:
        return String.valueOf(cell.getBooleanCellValue());
      case BLANK:
        return "";
      default:
        return cell.getStringCellValue();
    }
  }

  public static boolean isTrue(Cell cell) {
    return cell != null && cell.getCellTypeEnum() == CellType.BOOLEAN && cell.getBooleanCellValue();
  }

  private static <T> void writeHeaderRow(SheetDescriptor<T> sheetDescriptor, Sheet sheet, Workbook workbook) {
    List<Column<T>> columns = sheetDescriptor.getColumns();
    if (CollectionUtils.isEmpty(columns)) {
      return;
    }

    CellStyle headerCellStyle = null;
    if (sheetDescriptor.getHeaderCellStyle() != null) {
      headerCellStyle = sheetDescriptor.getHeaderCellStyle().apply(workbook);
    }

    Row row = sheet.createRow(0);
    for (int i = 0; i< columns.size(); i++) {
      Column<T> column = columns.get(i);
      writeCell(row.createCell(i), column.getTitle(), CellType.STRING, headerCellStyle);
      sheet.setColumnWidth(i, column.getWidth());
    }
  }

  private static <T> void writeDataRow(int index, T value, SheetDescriptor<T> sheetDescriptor, Sheet sheet, Workbook workbook) {
    List<Column<T>> columns = sheetDescriptor.getColumns();
    if (CollectionUtils.isEmpty(columns)) {
      return;
    }

    Row row = sheet.createRow(index);
    for (int i = 0; i< columns.size(); i++) {
      Column<T> column = columns.get(i);

      CellStyle dataCellStyle = null;
      if (column.getDataCellStyle() != null) {
        dataCellStyle = column.getDataCellStyle().apply(workbook);
      }

      writeCell(row.createCell(i), column.getValue().apply(value), column.getDataCellType(), dataCellStyle);
    }
  }

  private static void writeCell(Cell cell, Object value, CellType cellType, CellStyle cellStyle) {
    if (cell == null) return;

    setCellValue(cell, value);
    if (cellType != null) {
      cell.setCellType(cellType);
    }
    if (cellStyle != null) {
      cell.setCellStyle(cellStyle);
    }
  }

  private static void setCellValue(Cell cell, Object value) {
    if (value == null || cell == null) return;

    if (value instanceof Number) {
        double doubleValue = ((Number) value).doubleValue();
        cell.setCellValue(doubleValue);
    } else if (value instanceof Date) {
        cell.setCellValue((Date) value);
    } else if (value instanceof Calendar) {
        cell.setCellValue((Calendar) value);
    } else {
        cell.setCellValue(value.toString());
    }
  }
}
