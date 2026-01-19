const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// Logging middleware (optional but helpful)
// router.use((req, res, next) => {
//   console.log("user.router hit:", req.method, req.originalUrl);
//   next();
// });

// -------------------- SESSION ROUTES --------------------
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

router.post("/register", (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;
  const hashedPassword = encryptLib.encryptPassword(password);

  pool
    .query(
      `INSERT INTO "user" ("username", "password", "email", "first_name", "last_name") VALUES ($1,$2,$3,$4,$5) RETURNING id;`,
      [username, hashedPassword, email, firstName, lastName]
    )
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error("POST /api/user/register error:", err);
      res.sendStatus(500);
    });
});

router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.delete("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.sendStatus(200);
  });
});

// -------------------- PROFILE ROUTES --------------------

// GET current user's info (optional)
router.get("/me", rejectUnauthenticated, (req, res) => {
  res.json(req.user);
});

// UPDATE current user's profile
router.put("/me", rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;
  const { email, first_name, last_name } = req.body;

  if (!email && !first_name && !last_name) {
    return res.status(400).json({ error: "No valid fields to update" });
  }

  const fields = [];
  const values = [];
  let i = 1;

  if (email !== undefined) {
    fields.push(`email=$${i++}`);
    values.push(email);
  }
  if (first_name !== undefined) {
    fields.push(`first_name=$${i++}`);
    values.push(first_name);
  }
  if (last_name !== undefined) {
    fields.push(`last_name=$${i++}`);
    values.push(last_name);
  }

  fields.push(`updated_at=NOW()`); // always update timestamp

  const sqlText = `
    UPDATE "user"
    SET ${fields.join(", ")}
    WHERE id=$${i}
    RETURNING *;
  `;
  values.push(userId);

  try {
    const result = await pool.query(sqlText, values);
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/user/me error:", err);
    res.sendStatus(500);
  }
});

// UPDATE password (self only)
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

// DELETE user (admin only)
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
