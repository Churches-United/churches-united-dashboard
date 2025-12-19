const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();
// GET /api/volunteer-events
router.get("/", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
  SELECT ve.*, v.name AS volunteer_name
  FROM volunteer_events ve
  JOIN volunteers v ON ve.volunteer_id = v.id
  ORDER BY ve.event_date DESC;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/volunteer-events error:", err);
    res.sendStatus(500);
  }
});
// POST /api/volunteer-events
router.post("/", rejectUnauthenticated, async (req, res) => {
  const {
    volunteer_id,
    event_date,
    location,
    number_volunteers,
    software_signups,
  } = req.body;

if (!volunteer_id || !event_date || !location) {
  return res.status(400).json({ error: "volunteer_id, event_date, and location are required"});
}

  const sqlText = `
  INSERT INTO volunteer_events
  (volunteer_id, event_date, location, number_volunteers, software_signups)
  VALUES ($1, DATE_TRUNC('week', $2::date), $3, $4, $5)
  RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      volunteer_id,
      event_date,
      location,
      number_volunteers ?? 1,
      software_signups ?? 0,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/volunteer-events error:", err);
    res.sendStatus(500);
  }
});

// GET /api/volunteer-events/:id

// PUT /api/volunteer-events/:id

// DELETE /api/volunteer-events/:id

module.exports = router;
