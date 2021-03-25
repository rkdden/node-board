const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
// 라우터
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const boardRouter = require('./routes/board');
const writeRouter = require('./routes/write');
const boardRouter = require('./routes/board');
//시퀄라이즈
const { sequelize } = require('./models');

// 패스포트 환경설정
const passportConfig = require('./passport');

const app = express();
// 패스포트 설정
passportConfig();
// 포트번호
app.set('port', process.env.PORT || 3000);
// 시퀄라이즈 설정
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });
// 기본설정
app.use(morgan('dev'));
// 정적파일 가져오기
app.use(express.static(path.join(__dirname, 'public')));
// 이미지 가져오기
app.use('/img', express.static(path.join(__dirname, 'uploads')));
// json설정
app.use(express.json());
// post방식 사용가능
app.use(express.urlencoded({ extended: false }));
// 쿠키
app.use(cookieParser(process.env.COOKIE_SECRET));
// 세션
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
// 패스포트 설정
app.use(passport.initialize());
app.use(passport.session());

// 라우터 사용
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/board', boardRouter);
app.use('/write', writeRouter);

// 404처리 미들웨어
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    // res.locals.message = err.message;
    // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    // res.status(err.status || 500);
    // res.render('error');
    console.log(err);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});