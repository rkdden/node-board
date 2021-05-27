import React from 'react';
import styled from 'styled-components';
import CenterContainer from '../common/CenterContainer';
import MainContainer from '../common/MainContainer';
/**
 * 회원가입 / 로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */

/* 가운데 흰색 박스 */
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

const AuthTemplate = ({ children }) => {
  return (
        <WhiteBox>
        <div className="logo-area">
          <h2>Node Board</h2>
        </div>
        {children}
        </WhiteBox>
  );
};

export default AuthTemplate;
