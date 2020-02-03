import passport from 'passport';
import FoursquareStrategy from 'passport-foursquare';

const FOURSQUARE_CLIENT_ID = 'TAT2TDKMMFVQZJXDGYO50DKFNMRSUBXGCLA5V35STEBLNKJP';
const FOURSQUARE_CLIENT_SECRET = 'JQGWAQO5ZCOWAU00FGKVLIOLS0315CO1D04S1DLK2RDNV55X';

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Foursquare profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

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
    console.log('>>>>', accessToken);
    profile.accessToken = accessToken;
    return done(null, profile);
  });
}));