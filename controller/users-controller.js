const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const axios = require('axios');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const FACEBOOK_APP_ID = '375320672994034';
const FACEBOOK_APP_SECRET = 'd54dacc4403becd0b2e25a39b79ae9fe';


const login = async (req, res, next) => {
    let token;
    let existingUser;
    const {email, access_token: accessTokenId} = req.body;
    console.log(email, accessTokenId);
     
    try {
        console.log('is existing user?')
      existingUser = await User.findOne({ email: email });
      console.log('existing user:', existingUser)
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
    if (!existingUser) {
        const createdUser = new User({
            email
        });
        try {
            await createdUser.save();
        } catch (err) {
            const error = new HttpError(
                'Signing up failed, please try again later.',
                500
            );
            return next(error);
        }
    }
    
    try {
        token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },
        'supersecret_dont_share',
        { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
        'Signing up failed, please try again later.',
        500
        );
        return next(error);
    }

    res.status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });
        
    res.json({message: 'Logged in!'});
}

exports.login = login;