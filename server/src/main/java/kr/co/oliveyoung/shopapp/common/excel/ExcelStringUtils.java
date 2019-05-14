package kr.co.oliveyoung.shopapp.common.excel;

public class ExcelStringUtils {

  public static String escapeSpecialCharacter(String text) {
    if (text == null) {
      text = "";
    }

    String ch = "·";
    if (text.contains(ch)) {
      return text.replaceAll(ch, "-");
    }
    return text;
  }
}
