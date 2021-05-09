const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const exUser = await User.findOne({
                    where: { snsId: profile.id, provider: 'github' },
                });
                if (exUser) {  // 카카오로 가입된 정보가 있을때
                    done(null, exUser);
                } else { // 카카오로 가입된 정보가 없을때
                    const newUser = await User.create({
                        email: profile._json.email,
                        name: profile.displayName ? profile.displayName : profile.username,
                        snsId: profile.id,
                        provider: 'github',
                    });
                    done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    ));
};