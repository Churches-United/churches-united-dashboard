const express = require("express");
const pool = require("../modules/pool");
const encryptLib = require("../modules/encryption"); 
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

// ---------------- ADMIN USER ROUTES ----------------

// GET all users (ADMIN only)
router.get("/users", rejectUnauthenticated, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const sqlText = `
    SELECT id, username, email, first_name, last_name, role, department, active, created_at
    FROM "user"
    ORDER BY last_name, first_name;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    res.sendStatus(500);
  }
});

// PUT activate/deactivate user (ADMIN only)
router.put("/users/:id/active", rejectUnauthenticated, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { id } = req.params;
  const { active } = req.body;

  if (typeof active !== "boolean")
    return res.status(400).json({ error: "Active must be boolean" });

  const sqlText = `
    UPDATE "user"
    SET active = $1,
        updated_at = NOW()
    WHERE id = $2
    RETURNING id, active;
  `;

  try {
    const result = await pool.query(sqlText, [active, id]);
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/admin/users/:id/active error:", err);
    res.sendStatus(500);
  }
});

router.post("/users", rejectUnauthenticated, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { username, password, email, first_name, last_name, role, department } =
    req.body;

  const hashedPassword = encryptLib.encryptPassword(password);

  const sqlText = `
    INSERT INTO "user" 
      (username, password, email, first_name, last_name, role, department)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
  `;

  const sqlValues = [
    username,
    hashedPassword,
    email,
    first_name,
    last_name,
    role,
    department,
  ];

  try {
    const result = await pool.query(sqlText, sqlValues);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/admin/users error:", err);
    res.sendStatus(500);
  }
});

// UPDATE user (ADMIN only)
router.put("/users/:id", rejectUnauthenticated, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);

  const { id } = req.params;
  const { username, email, first_name, last_name, role, department, password } =
    req.body;

  try {
    let sqlText;
    let sqlValues;

    if (password) {
      const hashedPassword = encryptLib.encryptPassword(password);

      sqlText = `
        UPDATE "user"
        SET username = $1,
            email = $2,
            first_name = $3,
            last_name = $4,
            role = $5,
            department = $6,
            password = $7,
            updated_at = NOW()
        WHERE id = $8
        RETURNING id, username, email, first_name, last_name, role, department, active;
      `;

      sqlValues = [
        username,
        email,
        first_name,
        last_name,
        role,
        department,
        hashedPassword,
        id,
      ];
    } else {
      sqlText = `
        UPDATE "user"
        SET username = $1,
            email = $2,
            first_name = $3,
            last_name = $4,
            role = $5,
            department = $6,
            updated_at = NOW()
        WHERE id = $7
        RETURNING id, username, email, first_name, last_name, role, department, active;
      `;

      sqlValues = [
        username,
        email,
        first_name,
        last_name,
        role,
        department,
        id,
      ];
    }

    const result = await pool.query(sqlText, sqlValues);
    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/admin/users/:id error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
