const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();
// to-do decided if we need to add the north campus info
const allowedTypes = [
  "Fundraiser",
  "Community Events",
  "Large Volunteer Event",
  "Other",
];

// GET /api/development/events
router.get("/", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM events ORDER BY datetime DESC;`;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/events error:", err);
    res.sendStatus(500);
  }
});

// POST /api/development/events
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { name, datetime, venue, type, shelter_id, notes } = req.body;

  // guards
  if (!name || !datetime || !venue || !type) {
    return res
      .status(400)
      .json({ error: "Name, date time, venue, and type are required." });
  }
  if (!allowedTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid event type" });
  }

  const sqlText = `
    INSERT INTO events (name, datetime, venue, type, shelter_id, notes)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `;
  try {
    const result = await pool.query(sqlText, [
      name,
      datetime,
      venue,
      type,
      shelter_id || null,
      notes || null,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/events error:", err);
    res.sendStatus(500);
  }
});
// Reports
// GET /api/development/events/reports/upcoming
router.get("/reports/upcoming", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT *
    FROM events
    WHERE datetime >= NOW()
    ORDER BY datetime ASC;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/events/reports/upcoming error:", err);
    res.sendStatus(500);
  }
});

// GET /api/development/events/reports/venue
router.get("/reports/venue", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT venue, COUNT(*) AS event_count
    FROM events
    GROUP BY venue
    ORDER BY event_count DESC;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/events/reports/venue error:", err);
    res.sendStatus(500);
  }
});

// GET /api/development/events/reports/past
router.get("/reports/past", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT *
    FROM events
    WHERE datetime < NOW()
    ORDER BY datetime DESC;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/events/reports/past error:", err);
    res.sendStatus(500);
  }
});
// GET /api/development/events/:id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;
  const sqlText = `SELECT * FROM events WHERE id=$1`;

  try {
    const result = await pool.query(sqlText, [eventId]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/events/:id error", err);
    res.sendStatus(500);
  }
});
// PUT /api/development/events/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;
  const { name, datetime, venue, type, shelter_id, notes } = req.body;

  //   guards
  if (type !== undefined && !allowedTypes.includes(type)) {
    return res.status(400).json({ error: "Invalid event type" });
  }
  const sqlText = `
    UPDATE events
    SET
      name = COALESCE($1, name),
      datetime = COALESCE($2, datetime),
      venue = COALESCE($3, venue),
      type = COALESCE($4, type),
      shelter_id = COALESCE($5, shelter_id),
      notes = COALESCE($6, notes),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *;
    `;
  try {
    const result = await pool.query(sqlText, [
      name,
      datetime,
      venue,
      type,
      shelter_id,
      notes,
      eventId,
    ]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/events/:id error:", err);
    res.sendStatus(500);
  }
});

// DELETE /api/development/events/:id
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const eventId = req.params.id;
  const sqlText = `DELETE FROM events WHERE id = $1 RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [eventId]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/events/:id error:", err);
    res.sendStatus(500);
  }
});

module.exports = router;
