게시판 만들기
=============

# REST API
* 메인페이지
    * GET "/" index.html  // 로그인 페이지
    * POST "/login" // 로그인 처리

* 회원가입
    * GET "/regist" regist.html // 회원가입 페이지
    * POST "/auth/regist" // 회원가입 처리
* 게시글 목록
    * GET "/board/${condition}" board.html // 컨디션에 따른 게시글 목록 (최신순, 댓글순, * 추천순, 조회순)
* 글쓰기
    * GET "/write" write.html // 게시글 작성
    * POST "/write" //게시글 작성 처리
* 게시글 상세
    * GET "/board/${postId}" // 게시글아이디 상세보기
    * PATCH "/board/${postId}" // 게시글 수정
    * DELETE "/board/${postId}" // 게시글 삭제
* 게시글 댓글
    * POST "/board/${postId}/commemt" // 댓글 등록
    * PATCH "/board/${postId}/commemt/${commentId}" // 댓글 수정

# 패키지
<!-- 프레임워크 -->
* express
    * express-session
<!-- 로그인 -->
* passport
    * passport-local
    * passport-kakao
    * passport-facebook
    * passport-github
<!-- 디비 -->
* sequelize
    * sequelize-cli
* mysql2
<!-- 기타 -->
* fs
* path
* morgan
* multer
* cookie-parser
* dotenv
* nodemon
* bcrypt

# 회원가입
* 이메일 : email
* 이름 : name
* 비밀번호 : password
* 로그인타입 : provider 
    * 기본값: local
* snsId : snsId
* createdAt
* updatedAt
* deletedAt



