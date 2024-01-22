const passport = require("passport");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });
passport.use(
    new LinkedInStrategy({
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "http://localhost:3030/auth/linkedin/callback",
    }, function (accessToken, refreshToken, profile, done) {
        var userData = {
            // email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
        };
        done(null, userData)
    })
);