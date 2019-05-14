package kr.co.oliveyoung.shopapp.typescripts;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import kr.co.oliveyoung.shopapp.common.typeshare.TypeShareUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.FileSystemUtils;

@Slf4j
public class TypeScriptGenerator {

  public static void main(String[] args) throws IOException, URISyntaxException {
    Path targetPath = getTargetPath();

    log.info(targetPath.toString());

    cleanTargetDir(targetPath);

    TypeShareUtils tsUtils = new TypeShareUtils();

    generateTypeScriptFiles(tsUtils, targetPath);

    generateIndexTsFiles(tsUtils, targetPath);
  }


  private static Path getTargetPath() throws URISyntaxException {
    Path clientPath = Paths
        .get(
            TypeScriptGenerator.class.getProtectionDomain().getCodeSource().getLocation().toURI())
        .getParent().getParent().getParent().getParent().getParent();
    return clientPath.resolve(Paths.get("client","src", "common", "types", "entities", "generated"));
  }

  private static void cleanTargetDir(Path targetPath) throws IOException {
    FileSystemUtils.deleteRecursively(targetPath);
    Files.createDirectories(targetPath);
  }

  private static void generateTypeScriptFiles(TypeShareUtils tsUtils, Path targetPath) {
    tsUtils.getEntityMap().entrySet().stream().forEach((Entry<String, List<String>> entry) -> {
      Path filePath = targetPath.resolve(entry.getKey() + ".ts");
      try {
        FileUtils.write(filePath.toFile(), entry.getValue().stream().collect(Collectors.joining()), StandardCharsets.UTF_8);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

  private static void generateIndexTsFiles(TypeShareUtils tsUtils, Path targetPath) {
    String indexFileStr = tsUtils.getEntityMap().keySet().stream()
        .map(key -> "export * from './" + key + "'").collect(Collectors.joining("\n"));
    if(StringUtils.isNotBlank(indexFileStr)){
      try {
        FileUtils.write(targetPath.resolve("index.ts").toFile(), indexFileStr, StandardCharsets.UTF_8);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }

  }
}
