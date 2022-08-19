import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import PostNewEdit from './components/PostNewEdit';
const Board = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [toDoListText, setTodDoListText] = useState('');
  useEffect(() => {
    if (!token) {
      alert('로그인해주세요');
      navigate('/auth/signup');
    }
    return;
  }, []);

  const isInputContent = e => {
    setTodDoListText(e.target.value);
  };

  const isEditNewPost = () => {
    axios
      .post(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
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
  };
  return (
    <Wrapper>
      <ToDoBoard>
        <Title>To-Do List</Title>
        <ToDoContents>
          <PostNewEdit
            isInputContent={isInputContent}
            isEditNewPost={isEditNewPost}
          ></PostNewEdit>
          <PostListSections>
            <PostListContents>
              <PostTitle>제목임다</PostTitle>
            </PostListContents>
          </PostListSections>
        </ToDoContents>
      </ToDoBoard>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  ${({ theme }) => theme.flexMixin('', 'space-around')}
`;

const ToDoBoard = styled.div`
  width: 450px;
  padding: 40px 30px;
  background-color: ${({ theme }) => theme.whiteGrey};
`;

const ToDoContents = styled.div`
  height: 300px;
`;

const Title = styled.h3`
  margin-left: 8px;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 22px;
`;
const PostListSections = styled.form`
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
`;
const PostListContents = styled.div`
  ${({ theme }) => theme.flexMixin('center', 'space-between')}
  margin-top: 4px;
  padding: 14px;
  margin-bottom: 16px;
  border-radius: 2px;
  background: #fafafa;
  box-shadow: 5px 5px 10px #eeeeee, -5px -5px 10px #ffffff;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;
const PostTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

export default Board;
