const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

///////// SHELTER WEEKLY

// GET all records
router.get("/", rejectUnauthenticated, (req, res) => {
  const { year } = req.query;
  
  let sqlText = `SELECT * FROM shelter_weekly WHERE 1=1`;
  const params = [];
  
  if (year) {
    params.push(year);
    sqlText += ` AND EXTRACT(YEAR FROM date) = $${params.length}`;
  }
  
  sqlText += ` ORDER BY date DESC;`;

  pool.query(sqlText, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET shelter weekly error:", error);
      res.sendStatus(500);
    });
});

// GET summary by year
router.get("/summary/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      date,
      total_guests,
      single_men,
      housing_men,
      single_women,
      housing_women,
      families,
      hybrid_va_holdover,
      incident_reports,
      community_members_served,
      nights_found_sleeping_outside
    FROM shelter_weekly
    WHERE EXTRACT(YEAR FROM date) = $1
    ORDER BY date;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET summary error:", error);
      res.sendStatus(500);
    });
});

// GET guest breakdown by year
router.get("/guests/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      SUM(single_men) as total_single_men,
      SUM(housing_men) as total_housing_men,
      SUM(single_women) as total_single_women,
      SUM(housing_women) as total_housing_women,
      SUM(families) as total_families,
      SUM(hybrid_va_holdover) as total_hybrid_va,
      SUM(total_guests) as total_all_guests,
      ROUND(AVG(single_men), 2) as avg_single_men_per_week,
      ROUND(AVG(housing_men), 2) as avg_housing_men_per_week,
      ROUND(AVG(single_women), 2) as avg_single_women_per_week,
      ROUND(AVG(housing_women), 2) as avg_housing_women_per_week,
      ROUND(AVG(families), 2) as avg_families_per_week,
      ROUND(AVG(total_guests), 2) as avg_guests_per_week,
      ROUND((SUM(single_men)::DECIMAL / NULLIF(SUM(total_guests), 0) * 100), 2) as pct_single_men,
      ROUND((SUM(housing_men)::DECIMAL / NULLIF(SUM(total_guests), 0) * 100), 2) as pct_housing_men,
      ROUND((SUM(single_women)::DECIMAL / NULLIF(SUM(total_guests), 0) * 100), 2) as pct_single_women,
      ROUND((SUM(housing_women)::DECIMAL / NULLIF(SUM(total_guests), 0) * 100), 2) as pct_housing_women,
      ROUND((SUM(families)::DECIMAL / NULLIF(SUM(total_guests), 0) * 100), 2) as pct_families
    FROM shelter_weekly
    WHERE EXTRACT(YEAR FROM date) = $1;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows[0]))
    .catch((error) => {
      console.error("GET guests error:", error);
      res.sendStatus(500);
    });
});

// GET incidents and outreach by year
router.get("/incidents/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      SUM(incident_reports) as total_incident_reports,
      SUM(community_members_served) as total_community_members_served,
      SUM(nights_found_sleeping_outside) as total_nights_outside,
      ROUND(AVG(incident_reports), 2) as avg_incidents_per_week,
      ROUND(AVG(community_members_served), 2) as avg_community_served_per_week,
      COUNT(*) as total_weeks
    FROM shelter_weekly
    WHERE EXTRACT(YEAR FROM date) = $1;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows[0]))
    .catch((error) => {
      console.error("GET incidents error:", error);
      res.sendStatus(500);
    });
});

// GET by week date
router.get("/week/:date", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM shelter_weekly WHERE date = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.date]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET by week error:", error);
    res.sendStatus(500);
  }
});

// GET by ID
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM shelter_weekly WHERE id = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.id]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET by id error:", error);
    res.sendStatus(500);
  }
});

// POST create record
router.post("/", rejectUnauthenticated, (req, res) => {
  const {
    date,
    single_men,
    housing_men,
    single_women,
    housing_women,
    families,
    hybrid_va_holdover,
    incident_reports,
    community_members_served,
    nights_found_sleeping_outside,
    notes
  } = req.body;

  const sqlText = `
    INSERT INTO shelter_weekly (
      date,
      single_men, housing_men, single_women, housing_women, families, hybrid_va_holdover,
      incident_reports, community_members_served, nights_found_sleeping_outside,
      notes, created_by
    )
    VALUES (
      DATE_TRUNC('week', $1::DATE)::DATE,
      $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    )
    RETURNING *;`;

  pool.query(sqlText, [
    date,
    single_men || 0,
    housing_men || 0,
    single_women || 0,
    housing_women || 0,
    families || 0,
    hybrid_va_holdover || 0,
    incident_reports || 0,
    community_members_served || 0,
    nights_found_sleeping_outside || 0,
    notes || null,
    req.user.id
  ])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST error:", error);
      if (error.code === '23505') {
        return res.status(409).json({ error: "Week already exists" });
      }
      res.sendStatus(500);
    });
});

// PUT update record
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const {
    date,
    single_men,
    housing_men,
    single_women,
    housing_women,
    families,
    hybrid_va_holdover,
    incident_reports,
    community_members_served,
    nights_found_sleeping_outside,
    notes
  } = req.body;

  const sqlText = `
    UPDATE shelter_weekly SET 
      date = DATE_TRUNC('week', $1::DATE)::DATE,
      single_men = $2, housing_men = $3, single_women = $4, housing_women = $5,
      families = $6, hybrid_va_holdover = $7,
      incident_reports = $8, community_members_served = $9, nights_found_sleeping_outside = $10,
      notes = $11, updated_at = CURRENT_TIMESTAMP
    WHERE id = $12
    RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [
      date,
      single_men || 0,
      housing_men || 0,
      single_women || 0,
      housing_women || 0,
      families || 0,
      hybrid_va_holdover || 0,
      incident_reports || 0,
      community_members_served || 0,
      nights_found_sleeping_outside || 0,
      notes || null,
      req.params.id
    ]);

    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT error:", error);
    res.sendStatus(500);
  }
});

// PUT submit
router.put("/:id/submit", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    UPDATE shelter_weekly 
    SET submitted_at = CURRENT_TIMESTAMP, submitted_by = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [req.user.id, req.params.id]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT submit error:", error);
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM shelter_weekly WHERE id = $1;`;

  pool.query(sqlText, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error("DELETE error:", error);
      res.sendStatus(500);
    });
});

module.exports = router;