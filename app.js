require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const https = require('https');
const fs = require('fs');
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoice-routes');
const userRoutes = require('./routes/users-routes');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose');
const passport = require("passport");
const passportSetup = require("./passport");
const router = express.Router();
const FacebookTokenStrategy = require('passport-facebook-token');
var cors = require('cors');

const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const db = 'invoices';

const app = express();

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/dashboard/'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Success");
  }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'rndom-sectre', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
    next();
});
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use('/api/invoice', invoiceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'This part of site not working at this moment, please try again!'});
});

// const sslServer =  https.createServer({
//     key: fs.readFileSync('./cert/localhost.key'),
//     cert: fs.readFileSync('./cert/localhost.crt')
// },app);

mongoose
.connect(`mongodb+srv://${username}:${password}@collab-cluster.yjbgmfd.mongodb.net/${db}?retryWrites=true&w=majority`)
.then( () => {
    app.listen(process.env.HTTP_PORT || 8080);
    //sslServer.listen(process.env.HTTP_PORT || 5000);
}).catch( err => {
    console.error(err)
})

module.exports = router ;