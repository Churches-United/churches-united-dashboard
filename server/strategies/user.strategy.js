const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

// When a user successfully logs in, this passport method persists
// that user's id into a session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the user essentially means "looking up who you are"
// based on the user ID that's stored in the active session that
// corresponds to the cookie that came along with the request.
// This Passport method does the work of:
//   * Getting that user's info out of the "user" table.
//   * Attaching the user's info to the request as `req.user`.
// There are great answers to this Stack Overflow question, if you'd like
// more details about serializeUser and deserializeUser:
//   * https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.deserializeUser((id, done) => {
  const sqlText = `
    SELECT * FROM "user"
      WHERE "id" = $1;
  `;
  const sqlValues = [id];

  pool
    .query(sqlText, sqlValues)
    .then((dbRes) => {
      const user = dbRes && dbRes.rows && dbRes.rows[0];
      if (user) {
        // Remove the password property from the user object:
        delete user.password;
        // Attach the user object to the request as `req.user`:
        done(null, user);
      } else {
        // If no user was found, call `done` with no user object:
        done(null, null);
      }
    })
    .catch((dbErr) => {
      console.log("Error with query in passport.deserializeUser:", dbErr);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(dbErr, null);
    });
});

passport.use(
  'local',
  new LocalStrategy((username, password, done) => {
    console.log('Login attempt for:', username);
    pool.query('SELECT * FROM "user" WHERE username=$1', [username])
      .then(res => {
        console.log('DB user found:', res.rows[0]);
        if (res.rows[0] && encryptLib.comparePassword(password, res.rows[0].password)) {
          console.log('Password matches');
          done(null, res.rows[0]);
        } else {
          console.log('Invalid password or user');
          done(null, null);
        }
      })
      .catch(err => {
        console.log('DB query error:', err);
        done(err, null);
      });
  })
);

module.exports = passport;
