import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostNewEdit from './components/PostNewEdit';
import PostContents from './components/PostContents';

const Board = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [toDoListText, setTodDoListText] = useState('');
  const [complete, setComplete] = useState(false);
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    if (!token) {
      alert('로그인해주세요');
      navigate('/auth/signin');
    }
  }, []);

  const isInputContent = e => {
    setTodDoListText(e.target.value);
  };

  const getData = () => {
    axios
      .get(
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        setToDoList(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const isNewPost = () => {
    axios
      .post(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          todo: toDoListText,
        }
      )
      .catch(function (error) {
        console.log(error);
      });
    getData();
  };

  const isDeletePost = id => {
    axios
      .delete(
        `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(err => {
        console.log(err);
      });
    getData();
  };

  const isComplete = () => {
    setComplete(!complete);
  };

  return (
    <Wrapper>
      <ToDoBoard>
        <Title>To-Do List</Title>
        <ToDoContents>
          <PostNewEdit isInputContent={isInputContent} isNewPost={isNewPost} />
          <PostListSections>
            <PostContents
              toDoList={toDoList}
              isComplete={isComplete}
              isDeletePost={isDeletePost}
            />
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
  width: 500px;
  padding: 40px 30px;
  background-color: ${({ theme }) => theme.whiteGrey};
`;

const ToDoContents = styled.div``;

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

export default Board;
