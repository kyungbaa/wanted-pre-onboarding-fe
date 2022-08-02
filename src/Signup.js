import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <UserInputForm>
        <Title>Signup Page</Title>
        <InputUserSection>
          <InputUserId>
            <InputTitle>User Id</InputTitle>
            <Input
              placeholder="이메일을 입력해주세요."
              name="userEmail"
              //   onChange={getUserInfo}
            />
          </InputUserId>
          <InputUserPassword>
            <InputTitle>User Password</InputTitle>
            <Input
              placeholder="비밀번호를 입력해주세요."
              name="userPassword"
              //   onChange={getUserInfo}
            />
          </InputUserPassword>
          <InputUserPassword>
            <Input
              placeholder="비밀번호를 다시 입력해주세요."
              name="userPassword"
              //   onChange={getUserInfo}
            />
          </InputUserPassword>
        </InputUserSection>
        <FormFooter>
          <SingupButton>
            <Button type="primary" block>
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

export default Signup;
