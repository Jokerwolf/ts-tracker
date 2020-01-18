import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser  from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import FoursquareStrategy from 'passport-foursquare';

import { ApolloServer } from 'apollo-server-express';
import { ActivityType } from './types/ActivityType';
import typeDefs from './schema';

const FOURSQUARE_CLIENT_ID = "TAT2TDKMMFVQZJXDGYO50DKFNMRSUBXGCLA5V35STEBLNKJP"
const FOURSQUARE_CLIENT_SECRET = "JQGWAQO5ZCOWAU00FGKVLIOLS0315CO1D04S1DLK2RDNV55X";


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Foursquare profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the FoursquareStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Foursquare
//   profile), and invoke a callback with a user object.
passport.use(new FoursquareStrategy({
  clientID: FOURSQUARE_CLIENT_ID,
  clientSecret: FOURSQUARE_CLIENT_SECRET,
  callbackURL: "http://localhost:9000/auth/foursquare/callback"
},
function(accessToken: String, refreshToken: String, profile: any, done: Function) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    
    // To keep the example simple, the user's Foursquare profile is returned
    // to represent the logged-in user.  In a typical application, you would
    // want to associate the Foursquare account with a user record in your
    // database, and return that user instead.
    return done(null, profile);
  });
}));


const app = express();
// configure Express
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../../build')));

const data: Array<TrackerApp.Activity> = [
  {
    date: '2019-03-10',
    type: ActivityType.Workout,
  },
  {
    date: '2019-05-10',
    type: ActivityType.Workout,
  },
  {
    date: '2019-03-10',
    type: ActivityType.Other,
  }
];

const resolvers: TrackerApp.Resolvers = {
  Query: {
    activities: () => data
  },
};

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/foursquare');
}

// GET /auth/foursquare
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Foursquare authentication will involve
//   redirecting the user to foursquare.com.  After authorization, Foursquare
//   will redirect the user back to this application at /auth/foursquare/callback
app.get('/auth/foursquare',
  passport.authenticate('foursquare'),
  function(req, res){
    // The request will be redirected to Foursquare for authentication, so this
    // function will not be called.
  });

// GET /auth/foursquare/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/foursquare/callback', 
  passport.authenticate('foursquare', { failureRedirect: '/auth/foursquare' }),
  function(req, res) {
    res.redirect('/');
  });

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({app,path : '/gql'});

app.get('/', ensureAuthenticated, function(req, res){
  // res.render('index', { user: req.user });
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(9000, () => {
    console.log(`🚀 Server ready`);
});