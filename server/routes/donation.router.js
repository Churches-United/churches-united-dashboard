const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

//  GET /api/donations
// Returns all donations, joined with donor info for easier display on client.
router.get("/", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
  SELECT
  d.id,
  d.donor_id,
  d.date,
  d.amount,
  d.notable,
  d.restricted,
  d.notes,
  donors.name AS donor_name,
  donors.type AS donor_type
  FROM donations d
  JOIN donors on d.donor_id = donors.id
  ORDER BY d.date DESC;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/donations error:", err);
    res.sendStatus(500);
  }
});

// GET by :id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      d.*,
      donors.name AS donor_name
    FROM donations d
    JOIN donors ON d.donor_id = donors.id
    WHERE d.id = $1;
  `;

  try {
    const result = await pool.query(sqlText, [req.params.id]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/donations/:id error:", err);
    res.sendStatus(500);
  }
});

//  POST /api/donations
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { donor_id, date, amount, notable, restricted, notes } = req.body;

  const sqlText = `
  INSERT INTO donations 
  (donor_id, date, amount, notable, restricted, notes)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
  `;
  try {
    const result = await pool.query(sqlText, [
      donor_id,
      date,
      amount,
      notable ?? false,
      restricted ?? false,
      notes,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/donations error:", err);
    res.sendStatus(500);
  }
});

//  PUT /api/donations/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const { date, amount, notable, restricted, notes } = req.body;

  const sqlText = `
    UPDATE donations
    SET
      date = $1,
      amount = $2,
      notable = $3,
      restricted = $4,
      notes = $5,
      updated_at = NOW()
    WHERE id = $6
    RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      date,
      amount,
      notable,
      restricted,
      notes,
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/donations/:id error:", err);
    res.sendStatus(500);
  }
});

//  DELETE /api/donations/:id
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const sqlText = ` 
  DELETE FROM donations 
  WHERE id = $1 
  RETURNING id;`;

  try {
    const result = await pool.query(sqlText, [req.params.id]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/donations/:id error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
