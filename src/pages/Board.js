import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostNewEdit from '../components/PostNewEdit';
import PostContents from '../components/PostContents';
import { APP_API } from '../config';
const Board = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [toDoListText, setTodDoListText] = useState('');
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    if (!token) {
      alert('로그인해주세요');
      navigate('/');
    }
  }, []);

  const isInputContent = e => {
    setTodDoListText(e.target.value);
  };

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

  useEffect(() => {
    getData();
  }, []);

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
    <Wrapper>
      <ToDoBoard>
        <Title>To-Do List</Title>
        <ToDoContents>
          <PostNewEdit
            isInputContent={isInputContent}
            isNewPost={isNewPost}
            toDoListText={toDoListText}
          />
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
  padding: 40px 50px;
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
  margin-top: 26px;
  width: 100%;
`;

export default Board;
