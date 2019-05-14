package kr.co.oliveyoung.shopapp.common.typeshare;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class TypeSortModel {
  int order = -1;
  String unionFile;
  String data;
}
