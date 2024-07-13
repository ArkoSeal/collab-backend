const router = require("express").Router();
const passport = require("passport");
const usersController = require('../controller/users-controller');
var { generateToken, sendToken } = require('../utils/token.utils');
require('../passport')();



// router.post("/facebook", usersController.login);
router.get("/facebook", passport.authenticate('facebook-token', {session: false, scope: ['instagram_basic', 'manage_pages', 'instagram_manage_insights', 'pages_show_list', 'pages_read_engagement', 'pages_read_user_content', 'business_management'] }), function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }
    req.auth = {
        id: req.user.facebookProvider.fbId
    };
    next();
}, generateToken, sendToken);


module.exports = router