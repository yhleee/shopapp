package kr.co.oliveyoung.shopapp.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Setter
@Getter
@Document(collection = MongoSequence.COLLECTION_NAME)
public class MongoSequence {

  public static final String COLLECTION_NAME = "Sequence";

  @Id
  private String id;
  private Long sequence;
}
