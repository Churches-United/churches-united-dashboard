const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = require("express").Router();

// get all HR record
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM hr_weekly ORDER BY week_date DESC;`;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/hr error:", err);
      res.sendStatus(500);
    });
});
//post record route
router.post("/", rejectUnauthenticated, (req, res) => {
  const {
    week_date,
    total_positions,
    open_positions,
    new_hires_this_week,
    employee_turnover,
    evaluations_due,
    notes,
  } = req.body;

  // validatins check
 if (!week_date) {
    return res.status(400).json({
      message: "Week date must be entered",
    });
  }

  if (
    total_positions < 0 ||
    open_positions < 0 ||
    new_hires_this_week < 0 ||
    employee_turnover < 0 ||
    evaluations_due < 0
  ) {
    return res.status(400).json({
      message: "All entries must be positive number",
    });
  }

  const sqlText = `
    INSERT INTO hr_weekly (week_date, total_positions, open_positions, new_hires_this_week, employee_turnover, evaluations_due, notes, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;

  pool
    .query(sqlText, [
      week_date,
      total_positions || 0,
      open_positions || 0,
      new_hires_this_week || 0,
      employee_turnover || 0,
      evaluations_due || 0,
      notes || null,
      req.user.id,
    ])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST /api/hr error:", error);
// check for duplicate from postgress
      if (error.code === "23505") {
        res.status(409).json({
          message: `A record for ${week_date} already exists`,
        });
      } else {
        res.sendStatus(500);
      }
    });
});

// weekly report route

router.get("/reports/weekly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('week', week_date)::date AS week_start,
      
      TO_CHAR(DATE_TRUNC('week', week_date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('week', week_date) + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      
      SUM(total_positions) AS total_positions,
      SUM(open_positions) AS total_open_positions,
      SUM(new_hires_this_week) AS total_new_hires,
      SUM(employee_turnover) AS total_turnover,
      SUM(evaluations_due) AS total_evaluations_due,
      
      COUNT(*) AS record_count
      
    FROM hr_weekly
    GROUP BY DATE_TRUNC('week', week_date)
    ORDER BY week_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/hr/reports/weekly error:", err);
    res.sendStatus(500);
  }
});
// monthly report route
router.get("/reports/monthly", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      TO_CHAR(week_date, 'YYYY-MM') as month,
      TO_CHAR(week_date, 'Month YYYY') as month_name,
      AVG(total_positions) as avg_positions,
      AVG(open_positions) as avg_open_positions,
      SUM(new_hires_this_week) as total_new_hires,
      SUM(employee_turnover) as total_turnover,
      SUM(evaluations_due) as total_evaluations_due,
      COUNT(*) as total_weeks
    FROM hr_weekly
    GROUP BY TO_CHAR(week_date, 'YYYY-MM'), TO_CHAR(week_date, 'Month YYYY')
    ORDER BY month DESC;
  `;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/hr/reports/monthly error:", err);
      res.sendStatus(500);
    });
});

// get single record by ID
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const recordId = req.params.id;

  const sqlText = `SELECT * FROM hr_weekly WHERE id = $1;`;

  pool
    .query(sqlText, [recordId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("GET /api/hr/:id error:", err);
      res.sendStatus(500);
    });
});
// update a record
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const recordId = req.params.id;
  const {
    total_positions,
    open_positions,
    new_hires_this_week,
    employee_turnover,
    evaluations_due,
    notes,
  } = req.body;

  if (
    total_positions === undefined ||
    open_positions === undefined ||
    new_hires_this_week === undefined ||
    employee_turnover === undefined ||
    evaluations_due === undefined
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (
    total_positions < 0 ||
    open_positions < 0 ||
    new_hires_this_week < 0 ||
    employee_turnover < 0 ||
    evaluations_due < 0
  ) {
    return res.status(400).json({
      message: "All numbers must be positive",
    });
  }

  const sqlText = `
    UPDATE hr_weekly
    SET 
      total_positions = $1,
      open_positions = $2,
      new_hires_this_week = $3,
      employee_turnover = $4,
      evaluations_due = $5,
      notes = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *;
  `;

  pool
    .query(sqlText, [
      total_positions,
      open_positions,
      new_hires_this_week,
      employee_turnover,
      evaluations_due,
      notes || null,
      recordId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("PUT /api/hr/:id error:", err);
      res.sendStatus(500);
    });
});
// Delete weekly HR record
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const recordId = req.params.id;

  const sqlText = `DELETE FROM hr_weekly WHERE id = $1;`;

  pool
    .query(sqlText, [recordId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("DELETE /api/hr/:id error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
