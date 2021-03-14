const express = require('express');
const path = require('path');
const fs = require('fs');

// 포트

// 라우터
const indexRouter = require('./routes/index');

const app = express();

app.set('port', process.env.PORT || 3000); 




app.use('/', indexRouter);

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 서버 실행중`);
});