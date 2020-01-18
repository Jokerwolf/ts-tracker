const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const uuid = require('uuid/v4');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);

const passport = require('passport');
const FoursquareStrategy = require('passport-foursquare').Strategy;

const checkinsApi = require('./checkins');

const FoursquareStrategyOptions = {
  clientID: 'TAT2TDKMMFVQZJXDGYO50DKFNMRSUBXGCLA5V35STEBLNKJP',
  clientSecret: 'JQGWAQO5ZCOWAU00FGKVLIOLS0315CO1D04S1DLK2RDNV55X',
  callbackURL: 'http://localhost:9000/auth/foursquare/callback',
};

// #region Passport
passport.serializeUser(function(user, done) {
  console.log('Serializing user', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('De-serializing user', obj);
  done(null, obj);
});

passport.use(
  new FoursquareStrategy(FoursquareStrategyOptions,
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function() {
        // To keep the example simple, the user's Foursquare profile is returned
        // to represent the logged-in user.  In a typical application, you would
        // want to associate the Foursquare account with a user record in your
        // database, and return that user instead.
        console.log(`Verifying ${profile}`);
        return done(null, profile);
      });
    }
  )
);
// #endregion

// #region App
const app = express();

// configure Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(
  session({
    genid: req => {
      console.log('Inside the session middleware');
      console.log(req.sessionID);
      return uuid(); // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);
// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// #endregion


app.get('/', ensureAuthenticated, function(req, res) {
  console.log('hi');
  // , function(err, user, info) {
  //   console.log(err, user, info);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  // }
});
app.use(express.static(path.join(__dirname, 'build')));

app.get(
  '/auth/foursquare/callback',
  passport.authenticate('foursquare', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('redir');
    res.redirect('/');
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
);

app.get('/api/checkins', ensureAuthenticated, function(req, res) {
  res.json(checkinsApi());
});

// GET /auth/foursquare
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Foursquare authentication will involve
//   redirecting the user to foursquare.com.  After authorization, Foursquare
//   will redirect the user back to this application at /auth/foursquare/callback
app.get('/auth/foursquare', passport.authenticate('foursquare'), function(
  req,
  res
) {
  console.log('hello');
  // The request will be redirected to Foursquare for authentication, so this
  // function will not be called.
});

// GET /auth/foursquare/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
  '/auth/foursquare/callback',
  passport.authenticate('foursquare', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.listen(9000, () => {
  console.log('Listening on localhost:9000');
});

function ensureAuthenticated(req, res, next) {
  console.log('is authenticated? ', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/foursquare');
}

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware');
//     console.log(req.sessionID);
//     return uuid(); // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   console.log('Inside the homepage callback function')
//   console.log(req.sessionID)
//   res.send(`You hit home page!\n`)
//   // res.sendFile(path.join(__dirname, 'build', 'index.html'), { headers: {'x-sessionId': 'bla'} });
// });

// app.get('/login', (req, res) => {
//   console.log('Inside GET /login callback function')
//   console.log(req.sessionID)
//   res.send(`You got the login page!\n`)
// })

// app.post('/login', (req, res) => {
//   console.log('Inside POST /login callback function')
//   console.log(req.body)
//   res.send(`You posted to the login page!\n`)
// })
