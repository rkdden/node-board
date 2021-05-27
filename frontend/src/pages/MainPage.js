import React from 'react';
import MainContainer from "../components/common/MainContainer";
import CenterContainer from "../components/common/CenterContainer";
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from "../components/auth/AuthForm";

const MainPage = () => {
    return (
        <MainContainer>
            <CenterContainer>
                <AuthTemplate>
                    <AuthForm/>
                </AuthTemplate>
            </CenterContainer>
        </MainContainer>
    );
};


export default MainPage;
