import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userPassword: '',
    userPasswordCheck: '',
  });
  const { setEmailError, setSetEmailError } = useState(true);
  const { setPassword, setSetPassWord } = useState(true);
  const { userEmail, userPassword, userPasswordCheck } = userInfo;
  const { signUpSubmitButon, setSignupSubmit } = 0;
  const getUserInfo = e => {
    const { value, name } = e.target;
    setUserInfo({ [name]: value });
    checkEmail();
  };
  const ErrorMessage = {
    'CHECK EMAIL': '이메일 주소를 다시 확인해주세요.',
    'INVALID PASSWORD': '비밀번호를 다시 확인해주세요.',
    'CHECK PASSWORD': '입력하신 비밀번호가 다릅니다.',
  };

  const { submitButton, setSubmitButton } = useState(true);
  useEffect(() => {
    checkEmail();
    invalidPassword();
  }, [userInfo]);

  const checkEmail = () => {
    userEmail.includes('@' && '.')
      ? setSetEmailError(true)
      : setSetEmailError(false);
  };
  const invalidPassword = () => {
    userPassword.length >= 8 ? setSetPassWord(true) : setSetPassWord(false);
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
            {setEmailError === false ? (
              <Alert>{ErrorMessage['CHECK EMAIL']}</Alert>
            ) : null}
          </InputUserId>
          <InputUserPassword>
            <InputTitle>User Password</InputTitle>
            <Input
              placeholder="비밀번호를 입력해주세요."
              name="userPassword"
              onChange={getUserInfo}
            />

            {setSetPassWord === false ? (
              <Alert>{ErrorMessage['INVALID PASSWORD']}</Alert>
            ) : null}
          </InputUserPassword>
          <InputUserPassword>
            <Input
              placeholder="비밀번호를 다시 입력해주세요."
              name="userPassword"
              onChange={getUserInfo}
            />
            <Alert>{ErrorMessage['CHECK PASSWORD']}</Alert>
          </InputUserPassword>
        </InputUserSection>
        <FormFooter>
          <LoginButton>
            <Button block>로그인 페이지 이동</Button>
          </LoginButton>
          <SingupButton>
            <Button type="primary" block disabled={submitButton}>
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
const Alert = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: red;
`;

export default Signup;
