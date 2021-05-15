import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
/**
 * 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: #495057;
    margin-bottom: 1rem;
  }
`;

/**
* 스타일링된 input
*/
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ced4da;
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid #868e96;
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: #3bc9db;
      &:hover {
        background: #66d9e8;
      }
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  font-size: 1.125rem;
  margin-bottom: 1.2rem;
`;
  

/**
* 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
*/
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
`;


const LoginForm = () => {
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form>
        <StyledInput
          name="userid"
          placeholder="아이디"
        />
        <StyledInput
          name="userpassword"
          placeholder="비밀번호"
          type="password"
        />
      </form>
      <Footer>
        <Button>로그인</Button>
        {/* 여기에 버튼 3개 */}
        <Link to="/register">회원가입</Link>
      </Footer>
    </AuthFormBlock>
  );
};

export default LoginForm;
