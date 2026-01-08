const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();
// Reporting
// GET /api/housing/reports/monthly
router.get("/reports/monthly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('month', h.month_date)::date AS month_start,
      b.name AS building_name,
      h.occupancy_percent,
      h.operational_reserves,
      h.replacement_reserves,
      h.current_vacancies,
      h.upcoming_vacancies,
      h.upcoming_new_leases,
      h.notes
    FROM housing h
    JOIN housing_buildings b
      ON b.id = h.housing_building_id
    ORDER BY month_start DESC, building_name;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/housing/reports/monthly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/housing/reports/monthly-summary
// Combined summary across all buildings
router.get(
  "/reports/monthly-summary",
  rejectUnauthenticated,
  async (req, res) => {
    const sqlText = `
      SELECT
        DATE_TRUNC('month', month_date)::date AS month_start,
        ROUND(AVG(occupancy_percent), 2) AS avg_occupancy_percent,
        SUM(operational_reserves) AS total_operational_reserves,
        SUM(replacement_reserves) AS total_replacement_reserves,
        SUM(current_vacancies) AS total_current_vacancies,
        SUM(upcoming_vacancies) AS total_upcoming_vacancies,
        SUM(upcoming_new_leases) AS total_upcoming_new_leases
      FROM housing
      GROUP BY DATE_TRUNC('month', month_date)
      ORDER BY month_start DESC;
    `;

    try {
      const result = await pool.query(sqlText);
      res.json(result.rows);
    } catch (err) {
      console.error(
        "GET /api/housing/reports/monthly-summary error:",
        err
      );
      res.sendStatus(500);
    }
  }
);


// GET /api/housing/buildings
// Returns all buildings
router.get("/buildings", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT id, name
    FROM housing_buildings
    ORDER BY name;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/housing/buildings error:", err);
    res.sendStatus(500);
  }
});

// GET /api/housing
// Returns all housing records with building name
router.get("/", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      h.id,
      h.month_date,
      b.id AS housing_building_id,
      b.name AS building_name,
      h.occupancy_percent,
      h.operational_reserves,
      h.replacement_reserves,
      h.current_vacancies,
      h.upcoming_vacancies,
      h.upcoming_new_leases,
      h.notes,
      h.last_updated
    FROM housing h
    JOIN housing_buildings b
      ON b.id = h.housing_building_id
    ORDER BY h.month_date DESC, b.name;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/housing error:", err);
    res.sendStatus(500);
  }
});

// POST /api/housing
// Create a new monthly housing record
router.post("/", rejectUnauthenticated, async (req, res) => {
  const {
    housing_building_id,
    month_date,
    occupancy_percent,
    operational_reserves,
    replacement_reserves,
    current_vacancies,
    upcoming_vacancies,
    upcoming_new_leases,
    notes,
  } = req.body;

  if (!housing_building_id || !month_date) {
    return res
      .status(400)
      .json({ error: "housing_building_id and month_date are required" });
  }

  const sqlText = `
    INSERT INTO housing (
      housing_building_id,
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
      housing_building_id,
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
    console.error("POST /api/housing error:", err);
    res.sendStatus(500);
  }
});

// PUT /api/housing/:buildingId/:month
// Update a monthly housing record
router.put("/:buildingId/:month", rejectUnauthenticated, async (req, res) => {
  const { buildingId, month } = req.params;
  const {
    occupancy_percent,
    operational_reserves,
    replacement_reserves,
    current_vacancies,
    upcoming_vacancies,
    upcoming_new_leases,
    notes,
  } = req.body;

  if (
    occupancy_percent !== undefined &&
    (occupancy_percent < 0 || occupancy_percent > 100)
  ) {
    return res
      .status(400)
      .json({ error: "occupancy_percent must be between 0 and 100" });
  }

  const sqlText = `
    UPDATE housing
    SET
      occupancy_percent = COALESCE($3, occupancy_percent),
      operational_reserves = COALESCE($4, operational_reserves),
      replacement_reserves = COALESCE($5, replacement_reserves),
      current_vacancies = COALESCE($6, current_vacancies),
      upcoming_vacancies = COALESCE($7, upcoming_vacancies),
      upcoming_new_leases = COALESCE($8, upcoming_new_leases),
      notes = COALESCE($9, notes),
      last_updated = CURRENT_TIMESTAMP
    WHERE housing_building_id = $1
      AND month_date = DATE_TRUNC('month', $2::date)
    RETURNING *;
  `;

  try {
    const result = await pool.query(sqlText, [
      buildingId,
      month,
      occupancy_percent,
      operational_reserves,
      replacement_reserves,
      current_vacancies,
      upcoming_vacancies,
      upcoming_new_leases,
      notes,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/housing/:buildingId/:month error:", err);
    res.sendStatus(500);
  }
});

// DELETE /api/housing/:buildingId/:month
router.delete(
  "/:buildingId/:month",
  rejectUnauthenticated,
  async (req, res) => {
    const { buildingId, month } = req.params;

    const sqlText = `
      DELETE FROM housing
      WHERE housing_building_id = $1
        AND month_date = DATE_TRUNC('month', $2::date)
      RETURNING *;
    `;

    try {
      const result = await pool.query(sqlText, [buildingId, month]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Record not found" });
      }

      res.sendStatus(204);
    } catch (err) {
      console.error("DELETE /api/housing/:buildingId/:month error:", err);
      res.sendStatus(500);
    }
  }
);



module.exports = router;
