const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

//  GET /api/development/donations
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

//  POST /api/development/donations
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { donor_id, date, amount, notable, restricted, notes } = req.body;

  if (!donor_id || !date || !amount) {
    return res
      .status(400)
      .json({ message: "Donor, date, and amount are required." });
  }

  const sqlText = `
      INSERT INTO donations (donor_id, date, amount, notable, restricted, notes)
      VALUES ( $1, date_trunc('week', $2::date), $3, $4, $5, $6 )
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

//  PUT /api/development/donations/:id
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

//  DELETE /api/development/donations/:id
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

// GET /api/development/donations/reports/weekly
router.get("/reports/weekly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('week', d.date)::date AS week_start,

      TO_CHAR(DATE_TRUNC('week', d.date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('week', d.date) + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,

      SUM(d.amount) AS total_amount,
      COUNT(*) AS donation_count,

      SUM(CASE WHEN d.restricted THEN d.amount ELSE 0 END) AS restricted_amount,
      COUNT(*) FILTER (WHERE d.restricted) AS restricted_count,

      SUM(CASE WHEN d.notable THEN d.amount ELSE 0 END) AS notable_amount,
      COUNT(*) FILTER (WHERE d.notable) AS notable_count

    FROM donations d
    GROUP BY DATE_TRUNC('week', d.date)
    ORDER BY week_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/donations/reports/weekly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/development/donations/reports/monthly
router.get("/reports/monthly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('month', d.date) AS month_start,
      TO_CHAR(DATE_TRUNC('month', d.date), 'YYYY-MM') AS month_label,
      SUM(d.amount) AS total_amount,
      COUNT(*) AS donation_count,

      SUM(CASE WHEN d.restricted THEN d.amount ELSE 0 END) AS restricted_amount,
      COUNT(*) FILTER (WHERE d.restricted) AS restricted_count,

      SUM(CASE WHEN d.notable THEN d.amount ELSE 0 END) AS notable_amount,
      COUNT(*) FILTER (WHERE d.notable) AS notable_count
      
    FROM donations d
    GROUP BY month_start
    ORDER BY month_start DESC;

  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/donations/reports/monthly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/development/donations/reports/by-donor
router.get("/reports/by-donor", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
  SELECT 
  donors.id AS donor_id,
  donors.name AS donor_name,
  donors.type AS donor_type,

  COUNT(d.id) AS donation_count,
  SUM(d.amount) AS total_donated,

  SUM(CASE WHEN d.restricted THEN d.amount ELSE 0 END) AS restricted_total,
  SUM(CASE WHEN d.notable THEN d.amount ELSE 0 END) AS notable_total

  FROM donations d
  JOIN donors ON d.donor_id = donors.id
  GROUP BY donors.id, donors.name, donors.type
  ORDER by total_donated DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/donations/reports/by-donor error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
