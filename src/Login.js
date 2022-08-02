import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userPassword: '',
  });

  const { userEmail, userPassword } = userInfo;
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate('/sign-up');
  };

  const ErrorMessage = {
    'INVALID EMAIL': '아이디 혹은 비밀번호를 확인 해 주세요',
    'INVALID PASSWORD': '아이디 혹은 비밀번호를 확인 해 주세요',
    'NOT EXISTS USER': '없는 유저 입니다',
  };
  const getUserInfo = e => {
    const { value, name } = e.target;
    setUserInfo({ [name]: value });
  };
  return (
    <Wrapper>
      <UserInputForm>
        <Title>Login Page</Title>
        <InputUserSection>
          <InputUserId>
            <InputTitle>User Id</InputTitle>
            <Input
              placeholder="이메일을 입력해주세요."
              name="userEmail"
              onChange={getUserInfo}
            />
          </InputUserId>
          <InputUserPassword>
            <InputTitle>User Password</InputTitle>
            <Input
              placeholder="비밀번호를 입력해주세요."
              name="userPassword"
              onChange={getUserInfo}
            />
          </InputUserPassword>
        </InputUserSection>
        <FormFooter>
          <SingupButton>
            <LoginButton>
              <Button block>로그인</Button>
            </LoginButton>
            <Button type="primary" block onClick={goToSignup}>
              회원가입
            </Button>
          </SingupButton>
        </FormFooter>
      </UserInputForm>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  ${({ theme }) => theme.flexMixin('', 'space-around')}
`;
const UserInputForm = styled.form`
  width: 340px;
  padding: 40px 30px;
  background-color: ${({ theme }) => theme.whiteGrey};
`;
const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 22px;
`;
const InputUserSection = styled.div``;

const InputTitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;
const InputUserId = styled.div``;
const InputUserPassword = styled.div`
  padding-top: 20px;
`;

const FormFooter = styled.div`
  padding-top: 40px;
`;

const SingupButton = styled.div``;
const LoginButton = styled.div`
  margin-bottom: 10px;
`;
export default Login;
