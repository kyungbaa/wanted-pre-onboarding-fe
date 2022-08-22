import React from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const PostNewEdit = ({ isInputContent, isNewPost }) => {
  return (
    <PostNewEditSection>
      <PostEditInput>
        <Input name="postInput" onChange={isInputContent} />
      </PostEditInput>
      <PostEditButton>
        <Button type="primary" block onClick={isNewPost}>
          작성
        </Button>
      </PostEditButton>
    </PostNewEditSection>
  );
};
const PostNewEditSection = styled.form`
  ${({ theme }) => theme.flexMixin('', 'space-between')}
`;

const PostEditInput = styled.div`
  width: 70%;
`;
const PostEditButton = styled.div`
  width: 26%;
`;
export default PostNewEdit;
