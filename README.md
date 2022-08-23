## 원티드 사전과제 Login과 TodoList 😎

### 지원자

이름: 이후경
이메일: kyungbaa@gmail.com

### 사용 기술 stack

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=Styled Components&logoColor=white"> <img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=white">
</br>

### 프로젝트의 실행 방법

    1. npm install
    2. npm start로 서버 실행

### 파일 트리

```bash
📦 src
┣ 📂 components
┃ ┣ 📜 PostContents.js
┃ ┗ 📜 PostNewEdit.js
┣ 📂pages
┃ ┣ 📜 Board.js
┃ ┣ 📜 Signin.js
┃ ┗ 📜 Signup.js
┣ 📂styles
┃ ┣ 📜 GlobalStyle.js
┃ ┗ 📜 theme.js
┣ 📜 Router.js
┣ 📜 config.js
┣ 📜 index.css
┗ 📜 index.js
```

### 회원가입 & 로그인 페이지

#### 구현 화면

![signin-signup](https://user-images.githubusercontent.com/93850460/186148238-a468a30e-e695-4292-8e37-765941b4040d.gif)

- / 경로페이지로 이동하면 로그인 요청 화면
- 회원 가입 버튼 클릭 시 회원 가입 페이지 이동
- 회원 정보 입력 후 회원 가입
- 회원 가입 완료 후 로그인 페이지 이동
- 가입 정보 입력 후 todo페이지로 이동

@를 포함할것 8글자 이상일 것

```javascript
const condition =
  userEmail.includes('@') &&
  userPassword.length >= 8 &&
  userPassword === userPasswordCheck;
```

요구조건 충족시 버튼 활성화

```javascript
<Button type="primary" block disabled={!condition} onClick={isSignup}>
  회원가입
</Button>
```

![2222](https://user-images.githubusercontent.com/93850460/186149799-2b328af4-287f-4b61-a54e-17912de2900b.gif)

로컬스토리지에 토큰이 없는 상태로 /todo페이지 접속 시, /경로로 리다이렉트

```javascript
useEffect(() => {
  if (!token) {
    alert('로그인해주세요');
    navigate('/');
  }
}, []);
```

로컬스토리지에 토큰이 있는 상태로 /페이지 접속 시, /todo경로로 리다이렉트

```javascript
useEffect(() => {
  if (token) {
    navigate('/todo');
  }
}, []);
```
