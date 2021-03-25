const express = require('express');
const {User, Post, Comment, sequelize} = require('../models');
const passport = require('passport');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // 최신순 , 댓글순, 조회순, 추천순
    try{
        const query = req.query;
        let posts;
         // 최신순
        if (query.comment) {
            // 댓글순
            posts = await Post.findAll({
                // 게시글 번호, 제목, 댓글개수, 조회수
                attributes:[
                    'id',
                    'title',
                    'view',
                    'createdAt',
                    'UserId',
                ],
                include: {
                    model: Comment,
                    attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'commentCount'],]
                },
                // 댓글순 및 댓글 갯수가 같다면 내림차순
                order: [[sequelize.literal('`Comments.commentCount`'), 'DESC'], ['createdAt', 'DESC']],
                group: 'Post.id',
            });
        }else if(query.recommend){
            // 추천순
            console.log('recommend');
        }else if(query.view){
            // 조회순
            console.log('view');
        }else {
            // 최신순
            posts = await Post.findAll({
                // 게시글 번호, 제목, 댓글개수, 조회수
                attributes:[
                    'id',
                    'title',
                    'view',
                    'createdAt',
                    'UserId',
                ],
                include: {
                    model: Comment,
                    attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'commentCount'],]
                },
                order: [['createdAt', 'DESC']],
                group: 'Post.id'
            });
        }
        res.json({ posts, });
    } catch (error) {
        console.log(error);
        next(error);
    }
});
// 게시글 조회
// postId에 해당하는 게시글과 댓글 가져온 후
// 댓글은 최신순으로
router.get('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findOne({
            attributes: [ 'id', 'title', 'content', 'view', 'createdAt', 'UserId'],
            where: { id: postId },
            include: {
                model: Comment,
                attributes: ['UserId', 'comment', 'createdAt'],
            },
            order: [[Comment, 'createdAt', 'DESC']],
        });
        res.json({ post });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST "/board/${postId}/commemt" // 댓글 등록
router.post('/:postId/comment', async (req, res, next) => {
    try {
        // const { postId } = req.params;
        
        console.log(req.user.id);
        await Comment.create({
            // 댓글
            comment: req.body.comment,
            // 세션 아이디
            UserId: req.user.id,
            // 게시글 번호
            PostId: req.params.postId,
        });
        res.redirect('/board');
        // 댓글작성 완료
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;