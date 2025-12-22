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

  // guards
  if (
    number_volunteers !== undefined &&
    (!Number.isInteger(number_volunteers) || number_volunteers < 1)
  ) {
    return res.status(400).json({
      error: "number_volunteers must be a positive integer",
    });
  }

  if (
    software_signups !== undefined &&
    (!Number.isInteger(software_signups) || software_signups < 0)
  ) {
    return res.status(400).json({
      error: "software_signups must be 0 or greater",
    });
  }
  if (isNaN(Date.parse(event_date))) {
    return res.status(400).json({
      error: "event_date must be a valid date",
    });
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

// Report section
// GET /api/volunteer-events/reports/weekly
router.get("/reports/weekly", rejectUnauthenticated, async (req, res) => {
  
  const sqlText = `
    SELECT
      week_start,
      TO_CHAR(week_start, 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(week_start + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,      
      SUM(number_volunteers) AS total_volunteers,
      SUM(software_signups) AS total_signups,
      COUNT(DISTINCT volunteer_id) AS volunteer_count
    FROM (
      SELECT *, DATE_TRUNC('week', event_date)::date AS week_start
      FROM volunteer_events
    ) ve
    GROUP BY week_start
    ORDER BY week_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/volunteer-events/reports/weekly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/volunteer-events/reports/monthly
router.get("/reports/monthly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      month_start,
      TO_CHAR(month_start, 'YYYY-MM') AS month_label,
      SUM(number_volunteers) AS total_volunteers,
      SUM(software_signups) AS total_signups,
      COUNT(DISTINCT volunteer_id) AS volunteer_count
    FROM (
      SELECT *, DATE_TRUNC('month', event_date)::date AS month_start
      FROM volunteer_events
    ) ve
    GROUP BY month_start
    ORDER BY month_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/volunteer-events/reports/monthly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/volunteer-events/reports/location
router.get("/reports/location", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      location,
      SUM(number_volunteers) AS total_volunteers,
      SUM(software_signups) AS total_signups,
      COUNT(DISTINCT volunteer_id) AS volunteer_count
    FROM volunteer_events
    GROUP BY location
    ORDER BY total_volunteers DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/volunteer-events/reports/location error:", err);
    res.sendStatus(500);
  }
});

// GET /api/volunteer-events/reports/monthly-location
router.get(
  "/reports/monthly-location",
  rejectUnauthenticated,
  async (req, res) => {
    const sqlText = `
    SELECT
      month_start,
      TO_CHAR(month_start, 'YYYY-MM') AS month_label,
      location,
      SUM(number_volunteers) AS total_volunteers,
      SUM(software_signups) AS total_signups,
      COUNT(DISTINCT volunteer_id) AS volunteer_count
    FROM (
      SELECT *, DATE_TRUNC('month', event_date)::date AS month_start
      FROM volunteer_events
    ) ve
    GROUP BY month_start, location
    ORDER BY month_start DESC, total_volunteers DESC;
  `;

    try {
      const result = await pool.query(sqlText);
      res.json(result.rows);
    } catch (err) {
      console.error(
        "GET /api/volunteer-events/reports/monthly-location error:",
        err
      );
      res.sendStatus(500);
    }
  }
);

// By Id
// GET /api/volunteer-events/:id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;
  const sqlText = `
  SELECT ve.*, v.name AS volunteer_name
  FROM volunteer_events ve
  JOIN volunteers v ON ve.volunteer_id = v.id
  WHERE ve.id = $1;
  `;
  try {
    const result = await pool.query(sqlText, [eventId]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/volunteer-events/:id error:", err);
    res.sendStatus(500);
  }
});
// PUT /api/volunteer-events/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;
  const {
    volunteer_id,
    event_date,
    location,
    number_volunteers,
    software_signups,
  } = req.body;

  const sqlText = `
    UPDATE volunteer_events
    SET
      volunteer_id = COALESCE($1, volunteer_id),
      event_date = COALESCE(DATE_TRUNC('week', $2::date), event_date),
      location = COALESCE($3, location),
      number_volunteers = COALESCE($4, number_volunteers),
      software_signups = COALESCE($5, software_signups),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6
    RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      volunteer_id,
      event_date,
      location,
      number_volunteers,
      software_signups,
      eventId,
    ]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/volunteer-events/:id error:", err);
    res.sendStatus(500);
  }
});

// DELETE /api/volunteer-events/:id
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;

  const sqlText = `DELETE FROM volunteer_events WHERE id = $1;`;
  try {
    const result = await pool.query(sqlText, [eventId]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/volunteer-events/:id error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
