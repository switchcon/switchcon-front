### 프론트 참여자
- 숭실대 소프트웨어학부 조승효
- 숭실대 소프트웨어학부 전유찬

### 프로젝트 구성화면

### Dependencies

* React: UI 구성
* Tailwind css: 스타일링


### 설치법
```sh
npm install
```

### 로컬 실행방법
```sh
npm run start

```

### 빌드 및 배포
github pages로 배포하여 gh-page 브랜치로 빌드파일이 업데이트 됩니다.

```sh
npm run deploy 
```
baseURL 변경 시, index.tsx에 basename={process.env.PUBLIC_URL}를 반드시 작성해주어야 하고, 
package.json에서 hompage에 baseURL을 작성해주면 됩니다.

### 폴더 구조