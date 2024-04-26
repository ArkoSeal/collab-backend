var FacebookTokenStrategy = require('passport-facebook-token');
const passport = require("passport");
const User = require('./models/user');
const e = require('cors');
const HttpError = require('./models/http-error');

// main app

const FACEBOOK_APP_ID = "375320672994034";
const FACEBOOK_APP_SECRET = "d54dacc4403becd0b2e25a39b79ae9fe";

//test app
// const FACEBOOK_APP_ID = "779155273845607";
// const FACEBOOK_APP_SECRET = "e8586d9fe4a5e6942b4e032c76cc0f7e";

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      let existingUser;
     
      try {
       existingUser = await User.findOne({'facebookProvider.fbId': profile.id});
 
        // no user was found, lets create a new one
        if (!existingUser) {
          var newUser = new User({
              fullName: profile.displayName,
              email: profile.emails[0].value,
              facebookProvider: {
                fbId: profile.id,
                token: accessToken
              }
          });

          newUser.save().then( savedUser => {
            return done(null, savedUser);
          });
        } else {
          return done(null, existingUser);
        }
    
      } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.', 500);
        return next(error);
      }
    }
  ));
};