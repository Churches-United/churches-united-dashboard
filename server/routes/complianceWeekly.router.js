const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

///////// COMPLIANCE WEEKLY

// GET /api/compliance/weekly
router.get("/", rejectUnauthenticated, (req, res) => {
  const { fiscal_year, week_number } = req.query;
  
  let sqlText = `SELECT * FROM compliance_weekly WHERE 1=1`;
  const params = [];
  
  if (fiscal_year) {
    params.push(fiscal_year);
    sqlText += ` AND fiscal_year = $${params.length}`;
  }
  if (week_number) {
    params.push(week_number);
    sqlText += ` AND week_number = $${params.length}`;
  }
  
  sqlText += ` ORDER BY week_start_date DESC;`;

  pool.query(sqlText, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET compliance weekly error:", error);
      res.sendStatus(500);
    });
});

// GET /api/compliance/weekly/summary/fiscal-year/:year
router.get("/summary/fiscal-year/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      COUNT(*) as total_weeks,
      SUM(total_households) as total_households,
      SUM(total_individuals) as total_individuals,
      ROUND(AVG(total_households), 2) as avg_households_per_week
    FROM compliance_weekly
    WHERE fiscal_year = $1;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows[0]))
    .catch((error) => {
      console.error("GET summary error:", error);
      res.sendStatus(500);
    });
});

// GET /api/compliance/weekly/demographics/fiscal-year/:year
router.get("/demographics/fiscal-year/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      SUM(adults) as total_adults,
      SUM(children) as total_children,
      SUM(female) as total_female,
      SUM(male) as total_male,
      ROUND((SUM(female)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2) as pct_female
    FROM compliance_weekly
    WHERE fiscal_year = $1;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows[0]))
    .catch((error) => {
      console.error("GET demographics error:", error);
      res.sendStatus(500);
    });
});

// GET /api/compliance/weekly/week/:week_start_date
router.get("/week/:week_start_date", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM compliance_weekly WHERE week_start_date = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.week_start_date]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET by week error:", error);
    res.sendStatus(500);
  }
});

// GET /api/compliance/weekly/:id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM compliance_weekly WHERE id = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.id]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET by id error:", error);
    res.sendStatus(500);
  }
});

// POST /api/compliance/weekly// POST /api/compliance/weekly
router.post("/", rejectUnauthenticated, (req, res) => {
  const {
    week_start_date,
    week_end_date,
    fiscal_year,
    week_number,
    hh_without_children,
    hh_with_children,
    adults,
    children,
    seniors_55_plus,
    female,
    male,
    other_gender,
    white,
    black_african_american,
    native_american,
    other_race,
    multi_racial,
    one_condition,
    two_conditions,
    three_plus_conditions,
    total_exits
  } = req.body;

  // Validation
  const totalGender = (female || 0) + (male || 0) + (other_gender || 0);
  const totalRace = (white || 0) + (black_african_american || 0) + (native_american || 0) + (other_race || 0) + (multi_racial || 0);
  const totalIndividuals = (adults || 0) + (children || 0) + (seniors_55_plus || 0);

  if (totalGender !== totalRace || totalGender !== totalIndividuals) {
    return res.status(400).json({
      error: "Demographics validation failed",
      details: `Gender (${totalGender}) must equal Race (${totalRace}) and Individuals (${totalIndividuals})`
    });
  }

  const sqlText = `
    INSERT INTO compliance_weekly (
      week_start_date, week_end_date, fiscal_year, week_number,
      hh_without_children, hh_with_children, adults, children, seniors_55_plus,
      female, male, other_gender, white, black_african_american, native_american, other_race, multi_racial,
      one_condition, two_conditions, three_plus_conditions, total_exits, created_by
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
    )
    RETURNING *;`;

  pool.query(sqlText, [
    week_start_date,
    week_end_date,
    fiscal_year,
    week_number,
    hh_without_children || 0,
    hh_with_children || 0,
    adults || 0,
    children || 0,
    seniors_55_plus || 0,
    female || 0,
    male || 0,
    other_gender || 0,
    white || 0,
    black_african_american || 0,
    native_american || 0,
    other_race || 0,
    multi_racial || 0,
    one_condition || 0,
    two_conditions || 0,
    three_plus_conditions || 0,
    total_exits || 0,
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

// PUT /api/compliance/weekly/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const {
    week_start_date, hh_without_children, hh_with_children,
    adults, children, seniors_55_plus,
    female, male, other_gender,
    white, black_african_american, native_american, other_race, multi_racial,
    one_condition, two_conditions, three_plus_conditions, total_exits
  } = req.body;

  // Validation
  const totalGender = (female || 0) + (male || 0) + (other_gender || 0);
  const totalRace = (white || 0) + (black_african_american || 0) + (native_american || 0) + (other_race || 0) + (multi_racial || 0);
  const totalIndividuals = (adults || 0) + (children || 0) + (seniors_55_plus || 0);

  if (totalGender !== totalRace || totalGender !== totalIndividuals) {
    return res.status(400).json({
      error: "Demographics validation failed"
    });
  }

  const sqlText = `
    UPDATE compliance_weekly SET 
      week_start_date = $1, week_end_date = get_week_end($1),
      fiscal_year = get_fiscal_year($1), week_number = get_week_number($1),
      hh_without_children = $2, hh_with_children = $3,
      adults = $4, children = $5, seniors_55_plus = $6,
      female = $7, male = $8, other_gender = $9,
      white = $10, black_african_american = $11, native_american = $12, other_race = $13, multi_racial = $14,
      one_condition = $15, two_conditions = $16, three_plus_conditions = $17, total_exits = $18,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $19
    RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [
      week_start_date, hh_without_children || 0, hh_with_children || 0,
      adults || 0, children || 0, seniors_55_plus || 0,
      female || 0, male || 0, other_gender || 0,
      white || 0, black_african_american || 0, native_american || 0, other_race || 0, multi_racial || 0,
      one_condition || 0, two_conditions || 0, three_plus_conditions || 0, total_exits || 0,
      req.params.id
    ]);

    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT error:", error);
    res.sendStatus(500);
  }
});

// PUT /api/compliance/weekly/:id/submit
router.put("/:id/submit", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    UPDATE compliance_weekly 
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

// DELETE /api/compliance/weekly/:id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM compliance_weekly WHERE id = $1;`;

  pool.query(sqlText, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error("DELETE error:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
