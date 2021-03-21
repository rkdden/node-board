const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // 최신순 , 댓글순, 조회순, 추천순
    try{
        if(req.query.condition === null) { // 최신순
            const posts = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                    {
                        model: Comment,
                    },
                ],
                order: ['id', 'DESC'],
            });
        }

    } catch (error) {

    }
});

module.exports = router;