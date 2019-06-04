# 개발환경 셋팅 on Windows

## SDK & Tools

### Java SDK

- <https://www.oracle.com/technetwork/java/javase/downloads/index.htm>

### Gradle

- <https://gradle.org/install/>

### GIT

- [https://git-scm.com/book/ko/v2/%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-Git-%EC%84%A4%EC%B9%98](https://git-scm.com/book/ko/v2/시작하기-Git-설치)

### NVM-WINDOWS

- <https://github.com/coreybutler/nvm-windows/releases>
- 수동 설치 : `nvm-noinstall.zip` 다운 후, 적당한 장소에 압출을 풀고 환경설정에 `path` 추가
- 자동 설치 : `nvm-setup.zip` 다운 후, 설치 파일 실행
- `nvm`은 `node.js`를 설치하고 버전을 자동으로 관리하기 위한 툴 입니다.
- NodeVersionManager
- 해당 윈도우즈 용 `nvm`은 맥/리눅스 환경의 **그** `nvm`과 완전히 같지 않습니다.
- `node.js`설치/관리 용도가 아닌 환경을 **비슷하게** 구성하기 위한 용도로 생각 해 주세요.

### Node.js

- <https://nodejs.org/ko/>
- "현재 버전"을 설치 하시면 됩니다.
- 설치하시면 `npm`이 함께 설치 됩니다.

### 기타 설치하면 좋을지도 모르는 것들

- typora
  - <https://typora.io/>
  - 마크다운 기반의 오프라인 텍스트 에디터
  - github 등에 사용되는 텍스트 에디터가 마크다운 기반
- NoSQLBooster for MongoDB
  - <https://nosqlbooster.com/downloads>
  - 몽고DB 용 툴
  - Studio3T가 유료화 된 이후 쓸만한 것들 중 하나
- Paint.net
  - <https://www.getpaint.net/download.html>
  - 무료이지만, 포토샵과 비슷한 이미지 편집기능을 제공한다.

## IDE & Plugin

### IntelliJ IDEA

- <https://www.jetbrains.com/idea/download/#section=windows>
- 구매신청을 안하셨으면 Ultimate 다운 후, 트라이얼을 당분간 사용

### WebStorm

- IntelliJ는 설치하기 싫지만, Front-end 작업은 해야한다면?
- <https://www.jetbrains.com/webstorm/download/#section=windows>

### IntelliJ & WebStorm Plugin

- Auto Gradle
- Easy Gradle
- Gradle Cleaner
- Handlebars/Mustache
- HighlightBracketPair
- LombokMarkdown Navigator
- NodeJS
- Rainbow Brackets
- React CSS Modules
- Run Configuration for TypeScript
- TSReact
- TypeScriptExecutor

## 프로젝트 셋팅

### 태블릿 앱 : shop-app

#### 구조

![shopapp ](./docs/setup_shopapp1.png?stamp=0)

- client
  - front-end 소스 패키지
  - React + Redux + TypeScript 로 구성
- docs
  - 문서 또는 문서관련 파일 패키지
- server
  - back-end 소스 패키지
  - SpringBoot 2.0.8 + MyBatis

#### client 설정 및 빌드, 실행

- `shop-app` 프로젝트 폴더로 이동 > `client`폴더로 이동
  - `cd "C:\DevSpaces\spring\shopapp\client"`
- `yarn` 설치
  - `npm install -g yarn`
- client 빌드에 필요한 패키지 설치
  - `yarn install` 또는 `yarn`
- 빌드 및 실행
  - `yarn start:shopapp`
- 브라우저로 접속
  - [http://localhost:5000](http://localhost:5000/)

#### server 설정 및 빌드, 실행

- `Gradle`프로젝트로 설정
  - IDE 오른쪽에 `Gradle` 탭이 있는지 확인
  - 없을 경우, `shop-app/server/build.gradle` 파일 선택
  - 마우스 오른쪽 버튼 클릭, `import gradle project`
- IDE 오른쪽 `Gradle` 탭을 연다.
- `server > Tasks > application > bootRun` 실행
- 브라우저로 접속
  - <http://localhost:9090/api/test/selective>
  - 테스트 페이지에 정상 접속되면 Ok

#### client & server 를 한꺼번에 실행하기

- 배포를 위한 빌드를 하여, 결과물 `shop-app.jar` 파일을 실행

- IDE로 빌드

  - `Gradle 탭 > Tasks > build > yarnBuild`

- CLI로 빌드

  - `server` 패키지로 이동
    - `cd C:\DevSpaces\spring\shopapp\server`
  - 빌드 명령어 실행
    - `gradlew yarnBuild`

- `client`의 `yarn install` 이 실행이 되지 않은 상태에선 에러가 발생한다.

- 빌드가 정상적으로 완료 될 경우, `shop-app.jar` 파일이 생성

  - 생성 위치 :`shop-app / server / build / libs`

- `jar`파일 실행

  - `jar` 파일 실행 위치로 이동

  - `cd C:\DevSpaces\spring\shopapp\server\build\libs`

  - 실행 `java -jar 'shop-app.jar`