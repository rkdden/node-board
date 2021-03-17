const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();
// 회원가입 기능
// 로컬 회원가입
router.post('/regist', isNotLoggedIn, async (req, res, next) => {
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

module.exports = router;