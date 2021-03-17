const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    res.send('메인페이지');
});

router.post('/login', (req, res) => {
    
});

// 회원가입 페이지
router.get('/regist', (req, res) => {
    res.send('회원가입 페이지');
});

router.post('/login', (req, res) => {
    res.render('login');
});

router.get('/write', (req, res) => {
    res.render('write');
});

module.exports = router;