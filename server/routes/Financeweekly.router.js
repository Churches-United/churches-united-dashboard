const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

///////// FINANCE WEEKLY

// GET all records
router.get("/", rejectUnauthenticated, (req, res) => {
  const { year } = req.query;
  
  let sqlText = `SELECT * FROM finance_weekly WHERE 1=1`;
  const params = [];
  
  if (year) {
    params.push(year);
    sqlText += ` AND EXTRACT(YEAR FROM date) = $${params.length}`;
  }
  
  sqlText += ` ORDER BY date DESC;`;

  pool.query(sqlText, params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET finance weekly error:", error);
      res.sendStatus(500);
    });
});

// GET summary by year
router.get("/summary/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      date,
      total_assets,
      operating_account_balance,
      bills_paid,
      payroll_paid,
      revenue_received,
      net_change,
      major_expenses
    FROM finance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1
    ORDER BY date;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET summary error:", error);
      res.sendStatus(500);
    });
});

// GET financial metrics by year
router.get("/metrics/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      SUM(revenue_received) as total_revenue,
      SUM(bills_paid) as total_bills,
      SUM(payroll_paid) as total_payroll,
      SUM(net_change) as net_change_year,
      ROUND(AVG(total_assets), 2) as avg_assets,
      ROUND(AVG(operating_account_balance), 2) as avg_operating_balance,
      ROUND(AVG(revenue_received), 2) as avg_weekly_revenue,
      ROUND(AVG(bills_paid), 2) as avg_weekly_bills,
      ROUND(AVG(payroll_paid), 2) as avg_weekly_payroll,
      COUNT(*) as total_weeks,
      MAX(total_assets) as max_assets,
      MIN(total_assets) as min_assets,
      MAX(operating_account_balance) as max_operating_balance,
      MIN(operating_account_balance) as min_operating_balance
    FROM finance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows[0]))
    .catch((error) => {
      console.error("GET metrics error:", error);
      res.sendStatus(500);
    });
});

// GET cash flow by year (revenue vs expenses)
router.get("/cashflow/:year", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      date,
      revenue_received,
      (bills_paid + payroll_paid) as total_expenses,
      net_change,
      operating_account_balance
    FROM finance_weekly
    WHERE EXTRACT(YEAR FROM date) = $1
    ORDER BY date;`;

  pool.query(sqlText, [req.params.year])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET cashflow error:", error);
      res.sendStatus(500);
    });
});

// GET by week date
router.get("/week/:date", rejectUnauthenticated, async (req, res) => {
  const sqlText = `SELECT * FROM finance_weekly WHERE date = $1;`;

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
  const sqlText = `SELECT * FROM finance_weekly WHERE id = $1;`;

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
    total_assets,
    operating_account_balance,
    bills_paid,
    payroll_paid,
    revenue_received,
    major_expenses,
    notes
  } = req.body;

  const sqlText = `
    INSERT INTO finance_weekly (
      date,
      total_assets,
      operating_account_balance,
      bills_paid,
      payroll_paid,
      revenue_received,
      major_expenses,
      notes,
      created_by
    )
    VALUES (
      DATE_TRUNC('week', $1::DATE)::DATE,
      $2, $3, $4, $5, $6, $7, $8, $9
    )
    RETURNING *;`;

  pool.query(sqlText, [
    date,
    total_assets || 0,
    operating_account_balance || 0,
    bills_paid || 0,
    payroll_paid || 0,
    revenue_received || 0,
    major_expenses || null,
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
    total_assets,
    operating_account_balance,
    bills_paid,
    payroll_paid,
    revenue_received,
    major_expenses,
    notes
  } = req.body;

  const sqlText = `
    UPDATE finance_weekly SET 
      date = DATE_TRUNC('week', $1::DATE)::DATE,
      total_assets = $2,
      operating_account_balance = $3,
      bills_paid = $4,
      payroll_paid = $5,
      revenue_received = $6,
      major_expenses = $7,
      notes = $8,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $9
    RETURNING *;`;

  try {
    const result = await pool.query(sqlText, [
      date,
      total_assets || 0,
      operating_account_balance || 0,
      bills_paid || 0,
      payroll_paid || 0,
      revenue_received || 0,
      major_expenses || null,
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
    UPDATE finance_weekly 
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
  const sqlText = `DELETE FROM finance_weekly WHERE id = $1;`;

  pool.query(sqlText, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error("DELETE error:", error);
      res.sendStatus(500);
    });
});

module.exports = router;