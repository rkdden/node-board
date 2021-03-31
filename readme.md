게시판 만들기
=============
# 주제
* 소셜 로그인을 포함한 게시판
    * 카카오, 페이스북, 깃허브
* 최신순, 댓글순, 추천순, 조회순으로 게시글 조회
    * 게시글 추천과 수정 삭제 및 댓글 구현

# REST API
* 메인페이지 **완료**
    * GET "/" index.html  // 로그인(메인) 페이지
    * 로그인
        * POST "/auth/login" // 로그인 처리
        * 카카오
            * GET "/auth/kakao"  // 카카오 로그인
            * GET "/auth/kakao/callback" // 카카오 로그인 콜백
        * 페이스북
            * GET "/auth/facebook"  // 페이스북 로그인
            * GET "/auth/facebook/callback"  // 페이스북 로그인 콜백
        * 깃허브
            * GET "/auth/github"  // 깃허브 로그인
            * GET "/auth/github/callback"  // 깃허브 로그인 콜백
* 회원가입 **완료**
    * GET "/regist" regist.html // 회원가입 페이지
    * POST "/auth/regist" // 로컬 회원가입 처리
* 게시글 목록
    * GET "/board?querystring" board.html // 컨디션에 따른 게시글 목록 (최신순, 댓글순, * 추천순, 조회순) **최신순, 댓글순, 조회순 완료**
    * 게시글 번호, 제목, 조회수, 생성날자 작성자
* 글쓰기 **완료**
    * GET "/write" write.html // 게시글 작성 페이지
    * POST "/write" //게시글 작성 처리 
* 게시글 상세 **완료**
    * GET "/board/${postId}" // 게시글아이디 상세보기
    * PATCH "/board/${postId}" // 게시글 수정
    * DELETE "/board/${postId}" // 게시글 삭제
* 게시글 추천
    * GET "/board/${postId}/recommand   // 게시글 추천
* 게시글 댓글 **완료**
    * POST "/board/${postId}/commemt" // 댓글 등록 
    * PATCH "/board/${postId}/commemt // 댓글 수정
    * DELETE "/board/${postId}/commemt // 댓글 삭제

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
## 테이블 : users, 모델: User
* 회원번호 : id  = PK
* 이메일 : email
* 이름 : name
* 비밀번호 : password
* 로그인타입 : provider 
    * 기본값: local
* snsId : snsId
* 가입일 : createdAt
* 수정일 : updatedAt

# 게시글
## 테이블 : posts, 모델: Post
* 게시글번호 : id  = PK
* 제목 : title
* 내용 : content
* 조회수 : view
* 작성일 : createdAt
* 수정일 : updateAt
* 작성자 : UserId = FK

# 댓글
## 테이블 : comments, 모델: Comment
* 댓글번호 : id  = PK
* 댓글 : comment
* 작성일 : createdAt
* 수정일 : updateAt
* 작성자 : UserId = FK
* 게시글 번호: PostId = FK

# 추천
## 테이블 : recommand
* 추천회원번호 : UserId
* 추천게시글번호 : PostId

# DATEBASE 관계

* User   Post       =   1   :   N
* User   Comment    =   1   :   N
* Post   Comment    =   1   :   N
* Post   Recommand  =   1   :   N
* Post   User       =   N   :   M  ( through: 'Recommand' ) 



