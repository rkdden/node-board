import React from 'react';
import styled from 'styled-components';

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */
const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: gray;
        margin-bottom: 1rem;
    }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid gray;
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid gray;
    }
    & + & {
        margin-top: 1rem;
    }
`;

const AuthForm = () => {
    return (
        <>
            <AuthFormBlock>
                <h3>하잉</h3>
                <StyledInput placeholder="name"/>
                <StyledInput placeholder="password"/>
            </AuthFormBlock>
        </>
    );
}

export default AuthForm;