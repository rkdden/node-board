const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();
// 회원가입 기능
// 로컬 회원가입
router.post('/regist', async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.send('중복된 아이디');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            name,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


// 로컬 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(info.message);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // 여기서 세션 쿠키를 브라우저로 보낸다.
            return res.redirect('/board');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

// 카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/board')
});

// 깃허브 로그인
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { 
    failureRedirect: '/' 
}), (req, res) => {
    res.redirect('/board');
});

// 페이스북 로그인
router.get('/facebook', passport.authenticate('facebook', {scope: ['public_profile', 'email']} ));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/board')
});

module.exports = router;