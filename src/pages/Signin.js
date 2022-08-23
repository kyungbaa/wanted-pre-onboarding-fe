import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userPassword: '',
  });

  const { userEmail, userPassword } = userInfo;
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate('/signup');
  };

  const getUserInfo = e => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const condition = userEmail.includes('@') && userPassword.length >= 8;

  const isLogin = () => {
    axios
      .post(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin',
        {
          email: userEmail,
          password: userPassword,
        }
      )
      .then(res => {
        localStorage.setItem('access_token', res.data.access_token);
        navigate('/todo');
      })
      .catch(function (error) {
        console.log(error);
      });
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
              type="password"
              name="userPassword"
              onChange={getUserInfo}
            />
          </InputUserPassword>
        </InputUserSection>
        <FormFooter>
          <SingupButton>
            <LoginButton>
              <Button block onClick={isLogin} disabled={!condition}>
                로그인
              </Button>
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
