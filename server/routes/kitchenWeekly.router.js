const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// GET all kitchen records
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      total_meals_served,
      notes,
      created_by,
      created_at,
      updated_at
    FROM kitchen 
    ORDER BY week_date DESC;
  `;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/kitchen error:", err);
      res.sendStatus(500);
    });
});

// POST new kitchen record
router.post("/", rejectUnauthenticated, (req, res) => {
  const { week_date, total_meals_served, notes } = req.body;

  // Validation checks
  if (!week_date || total_meals_served === undefined) {
    return res.status(400).json({
      message: "Week date and total meals served are required",
    });
  }

  if (total_meals_served < 0) {
    return res.status(400).json({
      message: "Total meals served must be a positive number",
    });
  }

  // Convert any date to the Monday of that week
  const sqlText = `
    WITH inserted AS (
      INSERT INTO kitchen (week_date, total_meals_served, notes, created_by)
      VALUES (
        (DATE_TRUNC('week', $1::date + INTERVAL '1 day') - INTERVAL '1 day')::date,
        $2, $3, $4
      )
      RETURNING id, week_date, total_meals_served, notes, created_by, created_at, updated_at
    )
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      total_meals_served,
      notes,
      created_by,
      created_at,
      updated_at
    FROM inserted;
  `;

  pool
    .query(sqlText, [week_date, total_meals_served, notes || null, req.user.id])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST /api/kitchen error:", error);

      // PostgreSQL will check if duplicate exists
      if (error.code === "23505") {
        res.status(409).json({
          message: `A record for the week of ${week_date} already exists`,
        });
      } else {
        res.sendStatus(500);
      }
    });
});

// GET weekly kitchen report
router.get("/reports/weekly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('week', week_date)::date AS week_start,
      
      TO_CHAR(DATE_TRUNC('week', week_date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('week', week_date) + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      
      SUM(total_meals_served) AS total_meals,
      
      COUNT(*) AS record_count
      
    FROM kitchen
    GROUP BY DATE_TRUNC('week', week_date)
    ORDER BY week_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/kitchen/reports/weekly error:", err);
    res.sendStatus(500);
  }
});

// GET monthly kitchen report
router.get("/reports/monthly", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      TO_CHAR(week_date, 'YYYY-MM') as month,
      TO_CHAR(week_date, 'Month YYYY') as month_name,
      SUM(total_meals_served) as total_meals,
      COUNT(*) as total_weeks
    FROM kitchen
    GROUP BY TO_CHAR(week_date, 'YYYY-MM'), TO_CHAR(week_date, 'Month YYYY')
    ORDER BY month DESC;
  `;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/kitchen/reports/monthly error:", err);
      res.sendStatus(500);
    });
});

// GET single kitchen record by id
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const kitchenId = req.params.id;

  const sqlText = `
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      total_meals_served,
      notes,
      created_by,
      created_at,
      updated_at
    FROM kitchen 
    WHERE id = $1;
  `;

  pool
    .query(sqlText, [kitchenId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("GET /api/kitchen/:id error:", err);
      res.sendStatus(500);
    });
});

// PUT update kitchen record
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const kitchenId = req.params.id;
  const { total_meals_served, notes } = req.body;

  // Validation
  if (total_meals_served === undefined) {
    return res.status(400).json({
      message: "Total meals served is required",
    });
  }

  if (total_meals_served < 0) {
    return res.status(400).json({
      message: "Total meals served must be a positive number",
    });
  }

  const sqlText = `
    WITH updated AS (
      UPDATE kitchen
      SET 
        total_meals_served = $1, 
        notes = $2, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, week_date, total_meals_served, notes, created_by, created_at, updated_at
    )
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      total_meals_served,
      notes,
      created_by,
      created_at,
      updated_at
    FROM updated;
  `;

  pool
    .query(sqlText, [total_meals_served, notes || null, kitchenId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("PUT /api/kitchen/:id error:", err);
      res.sendStatus(500);
    });
});

// DELETE kitchen record
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const kitchenId = req.params.id;

  const sqlText = `DELETE FROM kitchen WHERE id = $1;`;

  pool
    .query(sqlText, [kitchenId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("DELETE /api/kitchen/:id error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;