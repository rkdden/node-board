const express = require('express');
const path = require('path');
const router = express.Router();
// 모델
const { Post } = require('../models');

router.get('/', (req, res) => {
    res.send('게시글 작성 페이지');
});

router.post('/', async (req, res, next) => {
    try {
        const {UserId, title, content} = req.body;
        await Post.create({
            UserId,
            title,
            content,
        });
        res.redirect('/board');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;