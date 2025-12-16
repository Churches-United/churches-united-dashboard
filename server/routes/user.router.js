const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// If the request came from an authenticated user, this route
// sends back an object containing that user's information.
// Otherwise, it sends back an empty object to indicate there
// is not an active session.
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

// Handles the logic for creating a new user. The one extra wrinkle here is
// that we hash the password before inserting it into the database.
router.post("/register", (req, res, next) => {
  const { username, email, firstName, lastName, role, department } = req.body;
  const hashedPassword = encryptLib.encryptPassword(req.body.password);

  const sqlText = `
    INSERT INTO "user"
      ("username", "password", "email", "first_name", "last_name", "role", "department")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;
  `;
  const sqlValues = [
    username,
    hashedPassword,
    email,
    firstName,
    lastName,
    role,
    department,
  ];

  pool
    .query(sqlText, sqlValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.log("POST /api/user/register error: ", dbErr);
      res.sendStatus(500);
    });
});

// Handles the logic for logging in a user. When this route receives
// a request, it runs a middleware function that leverages the Passport
// library to instantiate a session if the request body's username and
// password are correct.
// You can find this middleware function in /server/strategies/user.strategy.js.
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// Clear all server session information about this user:
router.delete("/logout", (req, res, next) => {
  // Use passport's built-in method to log out the user.
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
});

// GET user by id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const userId = req.params.id;
  const sqlText = `
  SELECT * FROM "user" WHERE id = $1;
  `;
  try {
    const result = await pool.query(sqlText, [userId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/user/:id error:", err);
    res.sendStatus(500);
  }
});
// PUT user by id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const userId = req.params.id;
  const { username, email, first_name, last_name, role, department } = req.body;
  const sqlText = `
  UPDATE "user" 
  SET 
  "username" = $1, 
  "email" = $2, 
  "first_name" = $3, 
  "last_name" = $4, 
  "role" = $5, 
  "department" = $6,
  updated_at = NOW()
  WHERE id = $7
  RETURNING *;
  `;

  const sqlValues = [
    username,
    email,
    first_name,
    last_name,
    role,
    department,
    userId,
  ];

  try {
    const result = await pool.query(sqlText, sqlValues);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/user/:id error:", err);
    res.sendStatus(500);
  }
});

// DELETE user by id
router.delete(
  "/:id",
  rejectUnauthenticated,
  async (req, res) => {
    const userId = Number(req.params.id);

    // Only admins can delete users
    if (req.user.role !== "admin") {
      return res.sendStatus(403);
    }

    const sqlText = `
      DELETE FROM "user"
      WHERE id = $1
      RETURNING id;
    `;

    try {
      const result = await pool.query(sqlText, [userId]);

      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }

      res.sendStatus(204); 
    } catch (err) {
      console.error("DELETE /api/user/:id error:", err);
      res.sendStatus(500);
    }
  }
);


module.exports = router;
