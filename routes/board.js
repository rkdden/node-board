const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { sequelize } = require('../models');
const { SELECT } = require('sequelize/lib/query-types');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // 최신순 , 댓글순, 조회순, 추천순
    try{
       // if(req.query.condition === null) { // 최신순
            const posts = await Post.findAll({
                // attributes: ['id', 'title', [sequelize.fn('COUNT', sequelize.col('Post.id')), 'count']],
                include: [
                    {
                        model: User,
                        attributes: ['name'],
                    },
                    {
                        model: Comment,
                        // attributes: ['comment', 'id'],
                        // [sequelize.fn('COUNT',sequelize.col('PostId')), 'count']
                    },
                ],
                order: [['id', 'DESC']],
            });
        //}
            const 
        return res.json({posts: posts});
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
