package kr.co.oliveyoung.shopapp.common.excel;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;

public class ExcelWebUtils {

  private ExcelWebUtils() {
    throw new IllegalStateException("Utility class");
  }

  public static <T> Flux<T> writeExcel(ExcelModel<T> excelModel, HttpServletResponse response) throws IOException {
    String fileName = (excelModel.getFileName() != null) ? excelModel.getFileName() : "excel_file";
    String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
    response.setHeader("Content-Disposition", "attachment; filename=\""+encodedFileName+"\"");
    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    return ExcelUtils.writeExcel(excelModel, response.getOutputStream());
  }

  public static <T> List<T> readExcel(ExcelModel<T> excelModel, MultipartFile file) throws IOException {
    return ExcelUtils.readExcel(excelModel, file.getInputStream());
  }
}
