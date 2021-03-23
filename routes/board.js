const express = require('express');
const {User, Post, Comment, sequelize} = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // 최신순 , 댓글순, 조회순, 추천순
    try{
        const query = req.query;
        let posts;
         // 최신순
        if (query.comment) {
            // 댓글순
            console.log('comment');
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
                },
                order: [['createdAt', 'DESC']],
            });
        }
        res.json({ posts, });
    } catch (error) {
        console.log(error);
        next(error);
    }
});
// POST "/board/${postId}/commemt" // 댓글 등록
router.post('/:postId/comment', async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        console.log(postId, comment);
        console.log(req.user);
        // await Comment.create({
        //     comment,
        //     UserId,
        //     PostId: postId,
        // });
        // res.redirect('board');
        res.send('댓글등록 완료');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;