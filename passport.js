var FacebookTokenStrategy = require('passport-facebook-token');
const passport = require("passport");
const User = require('./models/user');
const e = require('cors');
const HttpError = require('./models/http-error');

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      configID: process.env.FACEBOOK_CONFIGURATION_ID,
      fbGraphVersion: 'v20.0',
      callbackURL: 'http://localhost:3001/dashboard/'
    },
    async (accessToken, refreshToken, profile, done) => {
      let existingUser;
      //check if user with this fbId exists in the database
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