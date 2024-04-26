const router = require("express").Router();
const passport = require("passport");
const usersController = require('../controller/users-controller');
var { generateToken, sendToken } = require('../utils/token.utils');
require('../passport')();



// router.post("/facebook", usersController.login);

router.post("/facebook", passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.facebookProvider.fbId
    };

    next();
}, generateToken, sendToken);


module.exports = router