const express = require('express');
const hi = require('../models');
const {User, Post, Comment, sequelize} = require('../models');
const passport = require('passport');
const router = express.Router();

router.get('/', async (req, res, next) => {
    // 최신순 , 댓글순, 조회순, 추천순
    try{
        const query = req.query;
        let posts;
        let recommands;
        if (query.condition === 'comment') {
            // 댓글순
            // GET "/board?condition=comment"
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
                    attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'commentCount']]
                },
                // 댓글순 및 댓글 갯수가 같다면 내림차순
                order: [[sequelize.literal('`Comments.commentCount`'), 'DESC'], ['createdAt', 'DESC']],
                group: 'Post.id',
            });
        }else if(query.condition === 'recommand'){
            // 추천순
            // GET "/board?condition=recommand"
            // 진행중
// -----------------------------------------------------------------------------
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
                    attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'commentCount']]
                },
                // 댓글순 및 댓글 갯수가 같다면 내림차순
                order: [[sequelize.literal('`Comments.commentCount`'), 'DESC'], ['createdAt', 'DESC']],
                group: 'Post.id',
            });
            
        }else if(query.condition === 'view'){
            // 조회순
            // GET "/board?condition=view" 
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
                    attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'commentCount']]
                },
                // 조회순이 같다면 내림차순
                order: [['view', 'DESC'], ['createdAt', 'DESC']],
                group: 'Post.id',
            });
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
        // 추천수
        recommands = await Post.findAll({
            attributes: [
                'id',
            ],
            include: {
                model: User,
                as: 'Recommander',
                attributes: [[sequelize.fn('COUNT', sequelize.col('PostId')), 'recommandCount']],
                through: {
                    attributes:[],
                },
            },
            group: 'Post.id'
        })
        res.json({ posts, recommands});
    } catch (error) {
        console.log(error);
        next(error);
    }
});
// 게시글 조회
// postId에 해당하는 게시글과 댓글 가져온 후
// 댓글은 최신순으로
// 3.25 나중에 추천 추가
router.get('/:postId', async (req, res, next) => {
    try {
        const { postId } = req.params;
        await Post.update({
            view: sequelize.literal('view + 1'),
        },{
            where: {id: postId,},
        }
        );
        const post = await Post.findOne({
            attributes: [ 'id', 'title', 'content', 'view', 'createdAt', 'UserId'],
            where: { id: postId },
            include: {
                model: Comment,
                attributes: ['id', 'UserId', 'comment', 'createdAt'],
            },
            order: [[Comment, 'createdAt', 'DESC']],
        });
        res.json({ post });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// PATCH "/board/${postID}" // 게시글 수정
router.patch('/:postId', async (req, res, next) => {
    try {
        // 게시글 번호
        const { postId } = req.params;
        // 게시글 내용
        const { content, title } = req.body;
        // 세션userid
        const userId = req.user.id;
        // 게시글 작성자
        const PostUserId = await Post.findOne({
            attributes: ['UserId'],
            where: {id: postId},
        });
        if(userId === PostUserId.UserId){
            await Post.update(
                { 
                    title,
                    content,
                },
                { where: {
                    id: postId,
                }},
            );
            res.redirect(`/board/${req.params.postId}`)
        }else{
            res.send(`작성자와 일치하지 않습니다.`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// DELETE "/board/${postID}" // 게시글 삭제
router.delete('/:postId', async (req, res, next) => {
    try {
        // 게시글 번호
        const { postId } = req.params;
        // 게시글 아이디
        const { PostId } = req.body;
        // 세션userid
        const userId = req.user.id;
        // 게시글 작성자
        const PostUserId = await Post.findOne(
            {attributes: ['UserId'],},
            { where: {id: PostId}},
        );
        if (userId === PostUserId.UserId) {
            await Post.destroy(
                { where: {
                    id: postId,
                }},
            );
            res.redirect("/board");
        }else{
            res.send(`작성자와 일치하지 않습니다.`);
        }
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
});

// 댓글수정
// comments.id 는 form 태그에서 hidden으로 보내준다.
router.patch('/:postId/comment', async (req, res, next) => {
    try {
        // 게시글 번호
        const { postId } = req.params;
        // 댓글아이디, 댓글 내용
        const { commentId, comment } = req.body;
        // 세션userid
        const userId = req.user.id;
        // 댓글userId
        const commentUserId = await Comment.findOne(
            {attributes: ['UserId'],},
            { where: {id: commentId}},
        );
        if (userId === commentUserId.UserId) {
            await Comment.update(
                { comment: comment, },
                { where: {
                    PostId: postId,
                    UserId: userId,
                    id : commentId,
                }},
            );
            res.redirect(`/board/${req.params.postId}`)
        }else{
            res.send(`작성자와 일치하지 않습니다.`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 댓글 삭제
// comments.id 는 form 태그에서 hidden으로 보내준다.
router.delete('/:postId/comment', async (req, res, next) => {
    try {
        // 게시글 번호
        const { postId } = req.params;
        // 댓글아이디
        const { commentId } = req.body;
        // 세션userid
        const userId = req.user.id;
        // 댓글userId
        const commentUserId = await Comment.findOne(
            {attributes: ['UserId'],},
            { where: {id: commentId}},
        );
        if (userId === commentUserId.UserId) {
            await Comment.destroy(
                { where: {
                    PostId: postId,
                    UserId: userId,
                    id : commentId,
                }},
            );
            res.redirect(`/board/${req.params.postId}`)
        }else{
            res.send(`작성자와 일치하지 않습니다.`);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST "/board/${postId}/recommand   // 게시글 추천
router.post('/:postId/recommand', async(req, res, next) => {
    // 게시글 번호
    const { postId } = req.params;
    // 세션userid
    const userId = req.user.id;
    const post = await Post.findOne({ where: { id: postId } });
    await post.addRecommander(userId);
    res.redirect(`/board/${req.params.postId}`);
});

// DELETE "/board/${postId}/recommand   // 게시글 추천 삭제
router.delete('/:postId/recommand', async(req, res, next) => {
    // 게시글 번호
    const { postId } = req.params;
    // 세션userid
    const userId = req.user.id;
    const post = await Post.findOne({ where: { id: postId } });
    await post.removeRecommander(userId);
    res.redirect(`/board/${req.params.postId}`);
});

module.exports = router;
