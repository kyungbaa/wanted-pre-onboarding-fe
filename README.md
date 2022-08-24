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

### ToDo List 페이지

#### 구현 화면

![todo](https://user-images.githubusercontent.com/93850460/186153661-fa3d653d-98a5-4eaf-8ea5-2ec53f73554e.gif)

- todo list 작성
- 수정 버튼 클릭 시 input창 활성화
- 수정 상태에서 input글 작성 후 확인버튼 클릭 시 적용
- 수정 상태에서 ⚪️ (미완료)클릭 시 🔵 (완료) 변경
- 삭제 버튼 클릭 시 해당 목록 삭제

#### ToDo List 목록

```javascript
const getData = () => {
  axios
    .get(`${APP_API.todo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setToDoList(res.data);
    });
};

return (
  <PostListSections>
    {toDoList.map(({ id, todo, isCompleted }) => {
      return (
        <PostContents
          key={id}
          id={id}
          isCompleted={isCompleted}
          todo={todo}
          isDeletePost={isDeletePost}
          getData={getData}
          token={token}
          APP_API={APP_API}
        />
      );
    })}
  </PostListSections>
);
```

`` .get(`${APP_API.todo}` `` 로 필요한 데이터를 받아와서 map함수를 사용하여 리스트로 보여줌

##### ToDo List 작성

```javascript
const [toDoListText, setTodDoListText] = useState('');

const isNewPost = async () => {
  await axios
    .post(
      `${APP_API.todo}`,
      {
        todo: toDoListText,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  getData();
  setTodDoListText('');
};

return (
<PostEditInput>
  <Input name="postInput" value={toDoListText} onChange={isInputContent} />
</PostEditInput>;
);
```

input창에 값 입력 후 버튼 클릭 시 다시 인풋창 비워줌

PostNewEdit 컴포넌트

```javascript
const PostNewEdit = ({ isInputContent, isNewPost, toDoListText }) => {
  return (
    <PostNewEditSection>
      <PostEditInput>
        <Input
          name="postInput"
          value={toDoListText}
          onChange={isInputContent}
        />
      </PostEditInput>
      <PostEditButton>
        <Button type="primary" block onClick={isNewPost}>
          작성
        </Button>
      </PostEditButton>
    </PostNewEditSection>
  );
};
```

##### ToDo List 삭제

```javascript
const isDeletePost = async id => {
  await axios
    .delete(`${APP_API.todo}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(err => {
      console.log(err);
    });
  getData();
};

return (
<PostListSections>
            {toDoList.map(({ id, todo, isCompleted }) => {
              return (
                <PostContents
                  key={id}
                  id={id}
                  isCompleted={isCompleted}
                  todo={todo}
                  isDeletePost={isDeletePost}
                  getData={getData}
                  token={token}
                  APP_API={APP_API}
                />
              );
            })}
);
```

```javascript
{
  !isEditMode && (
    <PostEdit>
      <Button
        type="text"
        onClick={() => {
          setIsEditMode(prev => !prev);
        }}
      >
        수정
      </Button>

      <Button
        danger
        type="text"
        onClick={() => {
          isDeletePost(id);
        }}
      >
        삭제
      </Button>
    </PostEdit>
  );
}
```

삭제버튼 클릭시 axios.delete로 해당 아이디에 해당 하는 값 삭제.

##### ToDo List 수정

```javascript
const PostContents = ({
  isDeletePost,
  id,
  isCompleted,
  todo,
  APP_API,
  getData,
  token,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTodoContents, setEditContents] = useState({
    todo: todo,
    isCompleted: isCompleted,
  });
  const isEditPostContents = () => {
    setEditContents({
      ...editTodoContents,
      isCompleted: !editTodoContents.isCompleted,
    });
  };

  const handleEdit = e => {
    const { value } = e.target;
    setEditContents({ ...editTodoContents, todo: value });
  };

  const isEditPost = async id => {
    await axios
      .put(
        `${APP_API.todo}/${id}`,
        {
          todo: editTodoContents.todo,
          isCompleted: editTodoContents.isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      .catch(function (error) {
        console.log(error);
      });
    getData();
  };

  return (
    <PostListContents id={id}>
      {!isEditMode && (
        <TodoContent isCompleted={isCompleted}>
          <CompletedCheck>
            {!editTodoContents.isCompleted ? '⚪️' : '🔵'}
          </CompletedCheck>
          <PostText>
            <PostTitle>{editTodoContents.todo}</PostTitle>
          </PostText>
        </TodoContent>
      )}
      {isEditMode && (
        <TodoContent>
          <CompletedCheck onClick={() => isEditPostContents(id)}>
            {!editTodoContents.isCompleted ? '⚪️' : '🔵'}
          </CompletedCheck>
          <Input value={editTodoContents.todo} onChange={handleEdit} />
        </TodoContent>
      )}
      {!isEditMode && (
        <PostEdit>
          <Button
            type="text"
            onClick={() => {
              setIsEditMode(prev => !prev);
            }}
          >
            수정
          </Button>

          <Button
            danger
            type="text"
            onClick={() => {
              isDeletePost(id);
            }}
          >
            삭제
          </Button>
        </PostEdit>
      )}
      {isEditMode && (
        <PostEdit>
          <Button type="text" onClick={() => setIsEditMode(prev => !prev)}>
            취소
          </Button>

          <Button
            type="link"
            onClick={() => {
              isEditPost(id);
              setIsEditMode(prev => !prev);
            }}
          >
            확인
          </Button>
        </PostEdit>
      )}
    </PostListContents>
  );
};
```

수정 버튼 클릭 시 `isEditMode` true로 변경
`!isEditMode &&`, `isEditMode &&` 상태에 따라 보여주는 부분이 다름
(false: ToDO List내용, 수정버튼, 삭제버튼 | true: Input창, 취소버튼, 확인버튼)
⚪️ (미완료) 클릭 시 🔵(완료)로 변경
`<Input value={editTodoContents.todo} onChange={handleEdit} /> `에 이전에 작성한 내용을 보여줌
수정모드시에 수정취소와 수정완료 버튼이 있으며 수정 완료시 put 통신을 통하여 업데이트, 수정 취소시 기존 내용으로 변경
