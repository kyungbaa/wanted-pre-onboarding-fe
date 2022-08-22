import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css';
const PostContents = ({ toDoList, complete, isDeletePost }) => {
  return (
    <>
      {toDoList.map(({ id, todo, isComplete }) => {
        return (
          <PostListContents key={id}>
            <CompleteCheck onClick={isComplete}>
              {complete === false ? '⚪️' : '🔵'}
            </CompleteCheck>
            <PostTitle>{todo}</PostTitle>
            <PostEdit>
              <Button type="text">수정</Button>
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
          </PostListContents>
        );
      })}
    </>
  );
};
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
const PostTitle = styled.p``;
const CompleteCheck = styled.div``;
const PostEdit = styled.div``;
export default PostContents;
