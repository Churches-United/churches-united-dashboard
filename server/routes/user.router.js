const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();
router.use((req, res, next) => {
  console.log("user.router hit:", req.method, req.originalUrl);
  next();
});

router.put("/me", rejectUnauthenticated, async (req, res) => {
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user);
  res.sendStatus(200);
});
// -------------------- SESSION ROUTES --------------------

// GET current session user
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

// REGISTER (normal user self-registration)
router.post("/register", (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  const hashedPassword = encryptLib.encryptPassword(password);

  const sqlText = `
    INSERT INTO "user" ("username", "password", "email", "first_name", "last_name")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  const sqlValues = [username, hashedPassword, email, firstName, lastName];

  pool
    .query(sqlText, sqlValues)
    .then(() => res.sendStatus(201))
    .catch((dbErr) => {
      console.error("POST /api/user/register error:", dbErr);
      res.sendStatus(500);
    });
});

// LOGIN
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// LOGOUT
router.delete("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

// -------------------- PROFILE ROUTES --------------------

// GET user by ID
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM "user" WHERE id = $1;`, [
      userId,
    ]);
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/user/:id error:", err);
    res.sendStatus(500);
  }
});

// PUT user by ID (self-edit or admin)
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const userId = Number(req.params.id);

  // Only admin OR the user themselves can update
  if (req.user.role !== "admin" && req.user.id !== userId)
    return res.sendStatus(403);

  const { username, email, first_name, last_name, role, department } = req.body;

  const sqlText = `
    UPDATE "user"
    SET username=$1, email=$2, first_name=$3, last_name=$4, role=$5, department=$6, updated_at=NOW()
    WHERE id=$7
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
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/user/:id error:", err);
    res.sendStatus(500);
  }
});

// PUT current user's profile
router.put("/me", rejectUnauthenticated, async (req, res) => {
  console.log("PUT /me hit");
  console.log("req.isAuthenticated():", req.isAuthenticated());
  console.log("req.user:", req.user);
  const userId = req.user.id;
  const { username, email, first_name, last_name, role, department } = req.body;

  const sqlText = `
    UPDATE "user"
    SET username=$1, email=$2, first_name=$3, last_name=$4, role=$5, department=$6, updated_at=NOW()
    WHERE id=$7
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
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/user/me error:", err);
    res.sendStatus(500);
  }
});

// PUT user password (self-only)
router.put("/:id/password", rejectUnauthenticated, async (req, res) => {
  const userId = Number(req.params.id);
  const { currentPassword, newPassword } = req.body;

  if (req.user.id !== userId) return res.sendStatus(403);

  try {
    const result = await pool.query(
      `SELECT password FROM "user" WHERE id=$1;`,
      [userId]
    );
    if (result.rowCount === 0) return res.sendStatus(404);

    const currentHashed = result.rows[0].password;

    if (!encryptLib.comparePassword(currentPassword, currentHashed))
      return res.status(401).json({ error: "Current password incorrect" });

    const newHashed = encryptLib.encryptPassword(newPassword);
    await pool.query(
      `UPDATE "user" SET password=$1, updated_at=NOW() WHERE id=$2;`,
      [newHashed, userId]
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("PUT /api/user/:id/password error:", err);
    res.sendStatus(500);
  }
});

// DELETE user by ID (admin-only)
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  try {
    const result = await pool.query(
      `DELETE FROM "user" WHERE id=$1 RETURNING id;`,
      [req.params.id]
    );
    if (result.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/user/:id error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
