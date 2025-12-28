const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

// GET all
router.get("/", rejectUnauthenticated, (req, res) => {
  const { year } = req.query;
  let sqlText = `SELECT * FROM compliance_weekly WHERE 1=1`;
  const params = [];
  
  if (year) {
    params.push(year);
    sqlText += ` AND EXTRACT(YEAR FROM date) = $${params.length}`;
  }
  
  sqlText += ` ORDER BY date DESC;`;
  pool.query(sqlText, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET error:", error);
      res.sendStatus(500);
    });
});

// GET by ID
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM compliance_weekly WHERE id = $1`, [req.params.id]);
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET by id error:", error);
    res.sendStatus(500);
  }
});

// POST create
router.post("/", rejectUnauthenticated, (req, res) => {
  const {
    date, hh_without_children, hh_with_children, adults, children, seniors_55_plus,
    female, male, other_gender, white, black_african_american, native_american, other_race, multi_racial,
    one_condition, two_conditions, three_plus_conditions, total_exits
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
      date, hh_without_children, hh_with_children, adults, children, seniors_55_plus,
      female, male, other_gender, white, black_african_american, native_american, other_race, multi_racial,
      one_condition, two_conditions, three_plus_conditions, total_exits, created_by
    )
    VALUES (
      DATE_TRUNC('week', $1::DATE)::DATE,
      $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
    )
    RETURNING *;`;

  pool.query(sqlText, [
    date, hh_without_children || 0, hh_with_children || 0, adults || 0, children || 0, seniors_55_plus || 0,
    female || 0, male || 0, other_gender || 0, white || 0, black_african_american || 0, native_american || 0, 
    other_race || 0, multi_racial || 0, one_condition || 0, two_conditions || 0, three_plus_conditions || 0, 
    total_exits || 0, req.user.id
  ])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST error:", error);
      if (error.code === '23505') return res.status(409).json({ error: "Week already exists" });
      res.sendStatus(500);
    });
});

// PUT update
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const {
    date, hh_without_children, hh_with_children, adults, children, seniors_55_plus,
    female, male, other_gender, white, black_african_american, native_american, other_race, multi_racial,
    one_condition, two_conditions, three_plus_conditions, total_exits
  } = req.body;

  const totalGender = (female || 0) + (male || 0) + (other_gender || 0);
  const totalRace = (white || 0) + (black_african_american || 0) + (native_american || 0) + (other_race || 0) + (multi_racial || 0);
  const totalIndividuals = (adults || 0) + (children || 0) + (seniors_55_plus || 0);

  if (totalGender !== totalRace || totalGender !== totalIndividuals) {
    return res.status(400).json({ error: "Demographics validation failed" });
  }

  const sqlText = `
    UPDATE compliance_weekly SET 
      date = DATE_TRUNC('week', $1::DATE)::DATE, hh_without_children = $2, hh_with_children = $3,
      adults = $4, children = $5, seniors_55_plus = $6, female = $7, male = $8, other_gender = $9,
      white = $10, black_african_american = $11, native_american = $12, other_race = $13, multi_racial = $14,
      one_condition = $15, two_conditions = $16, three_plus_conditions = $17, total_exits = $18,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $19
    RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [
      date, hh_without_children || 0, hh_with_children || 0, adults || 0, children || 0, seniors_55_plus || 0,
      female || 0, male || 0, other_gender || 0, white || 0, black_african_american || 0, native_american || 0,
      other_race || 0, multi_racial || 0, one_condition || 0, two_conditions || 0, three_plus_conditions || 0,
      total_exits || 0, req.params.id
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
  try {
    const result = await pool.query(
      `UPDATE compliance_weekly SET submitted_at = CURRENT_TIMESTAMP, submitted_by = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [req.user.id, req.params.id]
    );
    if (result.rowCount === 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT submit error:", error);
    res.sendStatus(500);
  }
});

// DELETE
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  pool.query(`DELETE FROM compliance_weekly WHERE id = $1`, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error("DELETE error:", error);
      res.sendStatus(500);
    });
});



// ==========================================
// REPORTING ROUTES
// ==========================================

// GET monthly report
router.get("/reports/monthly/:year", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT 
      EXTRACT(MONTH FROM date)::INTEGER as month,
      TO_CHAR(date, 'Month') as month_name,
      
      -- Monthly Totals
      SUM(total_households) as total_households,
      SUM(total_individuals) as total_individuals,
      SUM(total_exits) as total_exits,
      
      -- Household Breakdown
      SUM(hh_without_children) as total_hh_without_children,
      SUM(hh_with_children) as total_hh_with_children,
      
      -- Age Demographics
      SUM(adults) as total_adults,
      SUM(children) as total_children,
      SUM(seniors_55_plus) as total_seniors,
      
      -- Gender Demographics
      SUM(female) as total_female,
      SUM(male) as total_male,
      SUM(other_gender) as total_other_gender,
      
      -- Monthly Averages
      ROUND(AVG(total_households), 2) as avg_households_per_week,
      ROUND(AVG(total_individuals), 2) as avg_individuals_per_week,
      ROUND(AVG(total_exits), 2) as avg_exits_per_week,
      
      -- Week Count
      COUNT(*) as weeks_in_month,
      
      -- Date Range
      MIN(date) as month_start,
      MAX(date) as month_end
      
    FROM compliance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1
    GROUP BY EXTRACT(MONTH FROM date), TO_CHAR(date, 'Month')
    ORDER BY month;`;

  try {
    const result = await pool.query(sqlText, [req.params.year]);
    res.json(result.rows);
  } catch (error) {
    console.error("GET monthly report error:", error);
    res.sendStatus(500);
  }
});

// GET yearly summary
router.get("/reports/yearly/:year", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT 
      -- Annual Totals
      SUM(total_households) as annual_total_households,
      SUM(total_individuals) as annual_total_individuals,
      SUM(total_exits) as annual_total_exits,
      
      -- Household Breakdown
      SUM(hh_without_children) as annual_hh_without_children,
      SUM(hh_with_children) as annual_hh_with_children,
      
      -- Age Demographics Totals
      SUM(adults) as annual_adults,
      SUM(children) as annual_children,
      SUM(seniors_55_plus) as annual_seniors,
      
      -- Gender Demographics Totals
      SUM(female) as annual_female,
      SUM(male) as annual_male,
      SUM(other_gender) as annual_other_gender,
      
      -- Race Demographics Totals
      SUM(white) as annual_white,
      SUM(black_african_american) as annual_black_african_american,
      SUM(native_american) as annual_native_american,
      SUM(other_race) as annual_other_race,
      SUM(multi_racial) as annual_multi_racial,
      
      -- Health Conditions Totals
      SUM(one_condition) as annual_one_condition,
      SUM(two_conditions) as annual_two_conditions,
      SUM(three_plus_conditions) as annual_three_plus_conditions,
      
      -- Weekly Averages
      ROUND(AVG(total_households), 2) as avg_households_per_week,
      ROUND(AVG(total_individuals), 2) as avg_individuals_per_week,
      ROUND(AVG(total_exits), 2) as avg_exits_per_week,
      
      -- Age Demographics Percentages
      ROUND((SUM(adults)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2) as pct_adults,
      ROUND((SUM(children)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2) as pct_children,
      ROUND((SUM(seniors_55_plus)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2) as pct_seniors,
      
      -- Gender Demographics Percentages
      ROUND((SUM(female)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2) as pct_female,
      ROUND((SUM(male)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2) as pct_male,
      ROUND((SUM(other_gender)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2) as pct_other_gender,
      
      -- Race Demographics Percentages
      ROUND((SUM(white)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2) as pct_white,
      ROUND((SUM(black_african_american)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2) as pct_black_african_american,
      ROUND((SUM(native_american)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2) as pct_native_american,
      ROUND((SUM(other_race)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2) as pct_other_race,
      ROUND((SUM(multi_racial)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2) as pct_multi_racial,
      
      -- Health Conditions Percentages
      ROUND((SUM(one_condition)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2) as pct_one_condition,
      ROUND((SUM(two_conditions)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2) as pct_two_conditions,
      ROUND((SUM(three_plus_conditions)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2) as pct_three_plus_conditions,
      
      -- Meta Information
      COUNT(*) as total_weeks_reported,
      MIN(date) as first_report_date,
      MAX(date) as last_report_date
      
    FROM compliance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.year]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET yearly summary error:", error);
    res.sendStatus(500);
  }
});


// GET demographics deep dive
router.get("/reports/demographics/:year", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT 
      -- Age Breakdown
      json_build_object(
        'adults', SUM(adults),
        'children', SUM(children),
        'seniors', SUM(seniors_55_plus),
        'total', SUM(total_individuals),
        'pct_adults', ROUND((SUM(adults)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2),
        'pct_children', ROUND((SUM(children)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2),
        'pct_seniors', ROUND((SUM(seniors_55_plus)::DECIMAL / NULLIF(SUM(total_individuals), 0) * 100), 2)
      ) as age_breakdown,
      
      -- Gender Breakdown
      json_build_object(
        'female', SUM(female),
        'male', SUM(male),
        'other', SUM(other_gender),
        'total', SUM(total_gender),
        'pct_female', ROUND((SUM(female)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2),
        'pct_male', ROUND((SUM(male)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2),
        'pct_other', ROUND((SUM(other_gender)::DECIMAL / NULLIF(SUM(total_gender), 0) * 100), 2)
      ) as gender_breakdown,
      
      -- Race Breakdown
      json_build_object(
        'white', SUM(white),
        'black_african_american', SUM(black_african_american),
        'native_american', SUM(native_american),
        'other_race', SUM(other_race),
        'multi_racial', SUM(multi_racial),
        'total', SUM(total_race),
        'pct_white', ROUND((SUM(white)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2),
        'pct_black_african_american', ROUND((SUM(black_african_american)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2),
        'pct_native_american', ROUND((SUM(native_american)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2),
        'pct_other_race', ROUND((SUM(other_race)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2),
        'pct_multi_racial', ROUND((SUM(multi_racial)::DECIMAL / NULLIF(SUM(total_race), 0) * 100), 2)
      ) as race_breakdown,
      
      --  Conditions Breakdown
      json_build_object(
        'one_condition', SUM(one_condition),
        'two_conditions', SUM(two_conditions),
        'three_plus_conditions', SUM(three_plus_conditions),
        'total', SUM(total_conditions),
        'pct_one', ROUND((SUM(one_condition)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2),
        'pct_two', ROUND((SUM(two_conditions)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2),
        'pct_three_plus', ROUND((SUM(three_plus_conditions)::DECIMAL / NULLIF(SUM(total_conditions), 0) * 100), 2)
      ) as conditions_breakdown,
      
      -- Household Types
      json_build_object(
        'without_children', SUM(hh_without_children),
        'with_children', SUM(hh_with_children),
        'total', SUM(total_households),
        'pct_without_children', ROUND((SUM(hh_without_children)::DECIMAL / NULLIF(SUM(total_households), 0) * 100), 2),
        'pct_with_children', ROUND((SUM(hh_with_children)::DECIMAL / NULLIF(SUM(total_households), 0) * 100), 2)
      ) as household_types
      
    FROM compliance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1;`;

  try {
    const result = await pool.query(sqlText, [req.params.year]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET demographics error:", error);
    res.sendStatus(500);
  }
});

// GET dashboard (all-in-one overview)
router.get("/reports/dashboard/:year", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    WITH current_year AS (
      SELECT 
        SUM(total_households) as total_households,
        SUM(total_individuals) as total_individuals,
        SUM(total_exits) as total_exits,
        ROUND(AVG(total_households), 2) as avg_households,
        ROUND(AVG(total_individuals), 2) as avg_individuals,
        COUNT(*) as weeks_reported
      FROM compliance_weekly
      WHERE EXTRACT(YEAR FROM date) = $1
    ),
    prev_year AS (
      SELECT 
        SUM(total_households) as total_households,
        SUM(total_individuals) as total_individuals,
        SUM(total_exits) as total_exits
      FROM compliance_weekly
      WHERE EXTRACT(YEAR FROM date) = $1 - 1
    ),
    latest_week AS (
      SELECT 
        date,
        total_households,
        total_individuals,
        total_exits
      FROM compliance_weekly
      WHERE EXTRACT(YEAR FROM date) = $1
      ORDER BY date DESC
      LIMIT 1
    )
    SELECT 
      json_build_object(
        'total_households', cy.total_households,
        'total_individuals', cy.total_individuals,
        'total_exits', cy.total_exits,
        'avg_households_per_week', cy.avg_households,
        'avg_individuals_per_week', cy.avg_individuals,
        'weeks_reported', cy.weeks_reported
      ) as current_year_totals,
      
      json_build_object(
        'households_yoy_change', cy.total_households - COALESCE(py.total_households, 0),
        'individuals_yoy_change', cy.total_individuals - COALESCE(py.total_individuals, 0),
        'exits_yoy_change', cy.total_exits - COALESCE(py.total_exits, 0),
        'households_yoy_pct', 
          CASE WHEN py.total_households > 0 
            THEN ROUND(((cy.total_households - py.total_households)::DECIMAL / py.total_households * 100), 2)
            ELSE NULL 
          END,
        'individuals_yoy_pct',
          CASE WHEN py.total_individuals > 0 
            THEN ROUND(((cy.total_individuals - py.total_individuals)::DECIMAL / py.total_individuals * 100), 2)
            ELSE NULL 
          END
      ) as year_over_year_comparison,
      
      json_build_object(
        'date', lw.date,
        'households', lw.total_households,
        'individuals', lw.total_individuals,
        'exits', lw.total_exits
      ) as latest_week_data
      
    FROM current_year cy
    CROSS JOIN prev_year py
    CROSS JOIN latest_week lw;`;

  try {
    const result = await pool.query(sqlText, [req.params.year]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET dashboard error:", error);
    res.sendStatus(500);
  }
});


module.exports = router;