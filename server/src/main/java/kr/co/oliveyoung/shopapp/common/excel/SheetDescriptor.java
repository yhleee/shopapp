package kr.co.oliveyoung.shopapp.common.excel;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;

@Getter
@Setter
public class SheetDescriptor<T> {
  private String sheetName;
  private List<Column<T>> columns = new ArrayList<>();
  private Function<Workbook, CellStyle> headerCellStyle;
  private WriteHeaderRow writeHeaderRow;
  private WriteDataRow<T> writeDataRow;
  private ReadRow<T> readRow;


  public static class ColumnBuilder<T> {
    private SheetDescriptor<T> sheetDescriptor;

    public ColumnBuilder() {
      this.sheetDescriptor = new SheetDescriptor<>();
    }

    public ColumnBuilder<T> nextColumn(String title, Function<T, Object> value) {
      return nextColumn(title, null, value);
    }

    public ColumnBuilder<T> nextColumn(String title, Integer widthByChars, Function<T, Object> value) {
      Column<T> column = new Column<>();
      column.setTitle(title);
      column.setWidthByChars(widthByChars);
      column.setValue(value);
      return nextColumn(column);
    }

    public ColumnBuilder<T> nextColumn(Column<T> column) {
      this.sheetDescriptor.columns.add(column);
      return this;
    }

    public ColumnBuilder<T> headerCellStyle(Function<Workbook, CellStyle> headerCellStyle) {
      this.sheetDescriptor.headerCellStyle =  headerCellStyle;
      return this;
    }

    public ColumnBuilder<T> sheetName(String sheetName) {
      this.sheetDescriptor.sheetName = sheetName;
      return this;
    }

    public SheetDescriptor<T> build() {
      return this.sheetDescriptor;
    }
  }
}
