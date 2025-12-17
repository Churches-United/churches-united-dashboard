const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const { rejectUnauthenticated,} = require("../modules/authentication-middleware");

const router = express.Router();


// GET /api/volunteers
router.get("/", rejectUnauthenticated, (req,res) => {
    const sqlText = `SELECT * FROM volunteers ORDER BY name;`;

    pool.query(sqlText).then((result) => res.json(result.rows))
    .catch((err) => {
        console.error("GET /api/volunteers error:", err);
        res.sendStatus(500);
    })
})

router.post("/", rejectUnauthenticated, (req, res) => {
  const { name, type } = req.body;
  const sqlText = `
    INSERT INTO volunteers (name, type)
    VALUES ($1, $2)
    RETURNING *;`;

  pool
    .query(sqlText, [name, type])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST /api/volunteers error:", error);
      res.sendStatus(500);
    });
});

// GET /api/volunteers/:id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const volunteerId = req.params.id;

  const sqlText = `
    SELECT *
    FROM volunteers
    WHERE id = $1;
  `;

  try {
    const result = await pool.query(sqlText, [volunteerId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/volunteers/:id error:", err);
    res.sendStatus(500);
  }
});

// PUT /api/volunteers/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const volunteerId = req.params.id;
  const { name, type } = req.body;

  const sqlText = `
    UPDATE volunteers
    SET name = $1, type = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
    `;

  try {
    const result = await pool.query(sqlText, [name, type, volunteerId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/volunteers/:id", error);
    res.sendStatus(500);
  }
});
// DELETE /api/volunteers/:id
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const volunteerId = req.params.id;
  const sqlText = `DELETE FROM volunteers WHERE id = $1 RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [volunteerId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("DELETE /api/volunteers/:id error:", error);
    res.sendStatus(500);
  }
});



module.exports = router;
