import React, { useState } from 'react';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import axios from 'axios';
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

const PostListContents = styled.div`
  ${({ theme }) => theme.flexMixin('center', 'space-between')}
  margin-top: 4px;
  padding: 10px 14px;
  margin-bottom: 16px;
  border-radius: 2px;
  background: #fafafa;
  box-shadow: 5px 5px 10px #eeeeee, -5px -5px 10px #ffffff;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;
const TodoContent = styled.div`
  ${({ theme }) => theme.flexMixin('center', 'space-between')}
`;
const PostTitle = styled.p``;
const PostText = styled.div``;
const CompletedCheck = styled.div`
  margin-right: 10px;
`;
const PostEdit = styled.div``;

export default PostContents;
