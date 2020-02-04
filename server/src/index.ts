import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser  from 'body-parser';
import passport from 'passport';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';


import './auth/passport';
import apolloServer from './data/resolvers';


const app = express();

// configure Express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, '../../build'), {
  index: false,
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

apolloServer.applyMiddleware({ app, path: '/gql'});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req: Request, res: Response , next: NextFunction) {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  res.redirect('/auth/foursquare');
}

// GET /auth/foursquare
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Foursquare authentication will involve
//   redirecting the user to foursquare.com.  After authorization, Foursquare
//   will redirect the user back to this application at /auth/foursquare/callback
app.get('/auth/foursquare',
  passport.authenticate('foursquare')
);

// GET /auth/foursquare/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/foursquare/callback', 
  passport.authenticate('foursquare', { failureRedirect: '/auth/foursquare' }),
  function(req, res, next: any) {
    res.redirect('/');
  });

app.get('/', ensureAuthenticated, function(req, res){
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(9000, () => {
  console.log(`🚀 Server ready`);
});

