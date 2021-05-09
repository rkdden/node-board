const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user');

// 메인페이지
router.get('/', (req, res) => {
    res.send('메인페이지');
});

// 회원가입 페이지
router.get('/regist', (req, res) => {
    res.send('회원가입 페이지');
});
// 게시글 작성 페이지
router.get('/write', (req, res) => {
    res.send('게시글 작성 페이지');
});

module.exports = router;