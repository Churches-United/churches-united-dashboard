const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = require("express").Router();

// GET /api/shelter/information
router.get("/", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
  SELECT 
    s.id AS shelter_id,
    s.name AS shelter_name,
    si.month_date,
    si.occupancy_percent,
    si.replacement_reserves,
    si.current_vacancies,
    si.upcoming_vacancies,
    si.upcoming_new_leases,
    si.notes,
    si.last_updated
  FROM shelters s
  LEFT JOIN shelter_info si
    ON s.id = si.shelter_id
  ORDER BY s.name;
  `;
  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error(" GET /api/shelter/information error:", err);
    res.sendStatus(500);
  }
});

// POST /api/shelter/information
router.post("/", rejectUnauthenticated, async (req, res) => {
  const {
    shelter_id,
    month_date,
    occupancy_percent,
    operational_reserves,
    replacement_reserves,
    current_vacancies,
    upcoming_vacancies,
    upcoming_new_leases,
    notes,
  } = req.body;

  if (!shelter_id) {
    return res.status(400).json({ error: "shelter_id is required" });
  }

  const sqlText = `
  INSERT INTO shelter_info (
    shelter_id,
    month_date,
    occupancy_percent,
    operational_reserves,
    replacement_reserves,
    current_vacancies,
    upcoming_vacancies,
    upcoming_new_leases,
    notes
  )
    VALUES (
      $1,
      DATE_TRUNC('month', $2::date),
      $3, $4, $5, $6, $7, $8, $9
    )
      RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      shelter_id,
      month_date,
      occupancy_percent,
      operational_reserves,
      replacement_reserves,
      current_vacancies,
      upcoming_vacancies,
      upcoming_new_leases,
      notes || null,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/shelter/information error:", err);
    res.sendStatus(500);
  }
});

// Reporting
// GET /api/shelter/information/reports/monthly
router.get("/reports/monthly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('month', month_date)::date AS month_start,
      TO_CHAR(DATE_TRUNC('month', month_date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('month', month_date) + INTERVAL '1 month - 1 day', 'YYYY-MM-DD') AS month_range,
      s.name AS shelter_name,
      occupancy_percent,
      operational_reserves,
      replacement_reserves,
      current_vacancies,
      upcoming_vacancies,
      upcoming_new_leases,
      notes
    FROM shelter_info si
    JOIN shelters s ON s.id = si.shelter_id
    ORDER BY month_start DESC, s.name;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/shelter/information/reports/monthly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/shelter/information/reports/monthly-summary
// summary of both shelters
router.get("/reports/monthly-summary", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('month', month_date)::date AS month_start,
      TO_CHAR(DATE_TRUNC('month', month_date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('month', month_date) + INTERVAL '1 month - 1 day', 'YYYY-MM-DD') AS month_range,
      ROUND(AVG(occupancy_percent), 2) AS avg_occupancy_percent,
      SUM(operational_reserves) AS total_operational_reserves,
      SUM(replacement_reserves) AS total_replacement_reserves,
      SUM(current_vacancies) AS total_current_vacancies,
      SUM(upcoming_vacancies) AS total_upcoming_vacancies,
      SUM(upcoming_new_leases) AS total_upcoming_new_leases
    FROM shelter_info
    GROUP BY DATE_TRUNC('month', month_date)
    ORDER BY month_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/shelter/information/reports/monthly-summary error:", err);
    res.sendStatus(500);
  }
});



// PUT /api/shelters/information/:shelterId/:month
router.put("/:shelterId/:month", rejectUnauthenticated, async (req, res) => {
  const { shelterId, month } = req.params;
  const {
    occupancy_percent,
    operational_reserves,
    replacement_reserves,
    current_vacancies,
    upcoming_vacancies,
    upcoming_new_leases,
    notes,
  } = req.body;

  if (occupancy_percent !== undefined && (occupancy_percent < 0 || occupancy_percent > 100)) {
    return res.status(400).json({ error: "occupancy_percent must be 0-100" });
  }

  const sqlText = `
    UPDATE shelter_info
    SET
      occupancy_percent = COALESCE($2, occupancy_percent),
      operational_reserves = COALESCE($3, operational_reserves),
      replacement_reserves = COALESCE($4, replacement_reserves),
      current_vacancies = COALESCE($5, current_vacancies),
      upcoming_vacancies = COALESCE($6, upcoming_vacancies),
      upcoming_new_leases = COALESCE($7, upcoming_new_leases),
      notes = COALESCE($8, notes),
      last_updated = CURRENT_TIMESTAMP
    WHERE shelter_id = $1
      AND month_date = DATE_TRUNC('month', $9::date)
    RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      shelterId,
      occupancy_percent,
      operational_reserves,
      replacement_reserves,
      current_vacancies,
      upcoming_vacancies,
      upcoming_new_leases,
      notes,
      month,
    ]);

    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/shelters/information/:shelterId/:month error:", err);
    res.sendStatus(500);
  }
});

// DELETE /api/shelter/information/:shelterId/:month
router.delete("/:shelterId/:month", rejectUnauthenticated, async (req, res) => {
  const { shelterId, month } = req.params;

  const sqlText = `
    DELETE FROM shelter_info
    WHERE shelter_id = $1
      AND month_date = DATE_TRUNC('month', $2::date)
    RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [shelterId, month]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.sendStatus(204); 
  } catch (err) {
    console.error(
      "DELETE /api/shelter/information/:shelterId/:month error:",
      err
    );
    res.sendStatus(500);
  }
});



module.exports = router;
