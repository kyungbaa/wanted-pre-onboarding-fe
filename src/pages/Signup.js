import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userPassword: '',
    userPasswordCheck: '',
  });

  const { userEmail, userPassword, userPasswordCheck } = userInfo;

  const condition =
    userEmail.includes('@') &&
    userPassword.length >= 8 &&
    userPassword === userPasswordCheck;

  const getUserInfo = e => {
    const { value, name } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const goToLogin = () => {
    navigate('/auth/signin');
  };
  const isSignup = () => {
    axios
      .post(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup',
        {
          email: userEmail,
          password: userPassword,
        }
      )
      .then(res => {
        localStorage.setItem('access_token', res.data.token);
        navigate('/auth/signin');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <UserInputForm>
        <Title>Signup Page</Title>
        <InputUserSection>
          <InputUserId>
            <InputTitle>User Email</InputTitle>
            <Input
              placeholder="이메일을 입력해주세요."
              name="userEmail"
              onChange={getUserInfo}
            />
          </InputUserId>
          <InputUserPassword>
            <InputTitle>User Password</InputTitle>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="userPassword"
              onChange={getUserInfo}
            />
          </InputUserPassword>
          <InputUserPassword>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              name="userPasswordCheck"
              onChange={getUserInfo}
            />
          </InputUserPassword>
        </InputUserSection>
        <FormFooter>
          <LoginButton>
            <Button
              block
              onClick={() => {
                goToLogin();
              }}
            >
              로그인 페이지 이동
            </Button>
          </LoginButton>
          <SingupButton>
            <Button
              type="primary"
              block
              disabled={!condition}
              onClick={isSignup}
            >
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

export default Signup;
