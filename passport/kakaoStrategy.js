const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

passport.use(new KakaoStrategy({
    clientID : process.env.KAKAO_ID,
    callbackURL : "http://localhost:3000/auth/kakao/callback",
  }, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    // 사용자의 정보는 profile에 들어있다.
    // User.findOrCreate(..., (err, user) => {
    //   if (err) { return done(err) }
    //   return done(null, user)
    // })
  }
));