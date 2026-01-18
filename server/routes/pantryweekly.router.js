const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// ========== SPECIFIC ROUTES FIRST ==========

// Weekly report route
router.get("/reports/weekly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      DATE_TRUNC('week', week_date)::date AS week_start,
      TO_CHAR(DATE_TRUNC('week', week_date), 'YYYY-MM-DD') || ' - ' ||
      TO_CHAR(DATE_TRUNC('week', week_date) + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      SUM(first_time_households) AS total_first_time,
      SUM(returning_households) AS total_returning,
      SUM(total_adults) AS total_adults,
      SUM(total_children) AS total_children,
      SUM(total_seniors) AS total_seniors,
      SUM(total_pounds_distributed) AS total_pounds,
      COUNT(*) AS record_count
    FROM pantry
    GROUP BY DATE_TRUNC('week', week_date)
    ORDER BY week_start DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/pantry/reports/weekly error:", err);
    res.sendStatus(500);
  }
});

// Monthly report route
router.get("/reports/monthly", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      TO_CHAR(week_date, 'YYYY-MM') as month,
      TO_CHAR(week_date, 'Month YYYY') as month_name,
      SUM(first_time_households) as total_first_time,
      SUM(returning_households) as total_returning,
      SUM(total_adults) as total_adults,
      SUM(total_children) as total_children,
      SUM(total_seniors) as total_seniors,
      SUM(total_pounds_distributed) as total_pounds,
      COUNT(*) as total_weeks
    FROM pantry
    GROUP BY TO_CHAR(week_date, 'YYYY-MM'), TO_CHAR(week_date, 'Month YYYY')
    ORDER BY month DESC;
  `;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/pantry/reports/monthly error:", err);
      res.sendStatus(500);
    });
});

// ========== BASE ROUTES ==========

// Get all pantry records
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      first_time_households,
      returning_households,
      total_adults,
      total_children,
      total_seniors,
      total_pounds_distributed,
      notes,
      created_by,
      created_at,
      updated_at
    FROM pantry 
    ORDER BY week_date DESC;
  `;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/pantry error:", err);
      res.sendStatus(500);
    });
});

// Post pantry record (force Monday)
router.post("/", rejectUnauthenticated, (req, res) => {
  const {
    week_date,
    first_time_households,
    returning_households,
    total_adults,
    total_children,
    total_seniors,
    total_pounds_distributed,
    notes,
  } = req.body;
  
  if (!week_date) {
    return res.status(400).json({
      message: "Week date required",
    });
  }

  if (
    first_time_households < 0 ||
    returning_households < 0 ||
    total_adults < 0 ||
    total_children < 0 ||
    total_seniors < 0 ||
    total_pounds_distributed < 0
  ) {
    return res.status(400).json({
      message: "All entries must be a positive number",
    });
  }

  const sqlText = `
    WITH inserted AS (
      INSERT INTO pantry (week_date, first_time_households, returning_households, total_adults, total_children, total_seniors, total_pounds_distributed, notes, created_by)
      VALUES (
        (DATE_TRUNC('week', $1::date + INTERVAL '1 day') - INTERVAL '1 day')::date,
        $2, $3, $4, $5, $6, $7, $8, $9
      )
      RETURNING id, week_date, first_time_households, returning_households, total_adults, total_children, total_seniors, total_pounds_distributed, notes, created_by, created_at, updated_at
    )
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      first_time_households,
      returning_households,
      total_adults,
      total_children,
      total_seniors,
      total_pounds_distributed,
      notes,
      created_by,
      created_at,
      updated_at
    FROM inserted;
  `;

  pool
    .query(sqlText, [
      week_date,
      first_time_households || 0,
      returning_households || 0,
      total_adults || 0,
      total_children || 0,
      total_seniors || 0,
      total_pounds_distributed || 0,
      notes || null,
      req.user.id,
    ])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST /api/pantry error:", error);

      if (error.code === "23505") {
        res.status(409).json({
          message: `A record for the week of ${week_date} already exists`,
        });
      } else {
        res.sendStatus(500);
      }
    });
});

// Get single pantry record
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const pantryId = req.params.id;
  const sqlText = `
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      first_time_households,
      returning_households,
      total_adults,
      total_children,
      total_seniors,
      total_pounds_distributed,
      notes,
      created_by,
      created_at,
      updated_at
    FROM pantry 
    WHERE id = $1;
  `;

  pool
    .query(sqlText, [pantryId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("GET /api/pantry/:id error:", err);
      res.sendStatus(500);
    });
});

// Update pantry record
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const pantryId = req.params.id;
  const {
    first_time_households,
    returning_households,
    total_adults,
    total_children,
    total_seniors,
    total_pounds_distributed,
    notes,
  } = req.body;

  if (
    first_time_households === undefined ||
    returning_households === undefined ||
    total_adults === undefined ||
    total_children === undefined ||
    total_seniors === undefined ||
    total_pounds_distributed === undefined
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (
    first_time_households < 0 ||
    returning_households < 0 ||
    total_adults < 0 ||
    total_children < 0 ||
    total_seniors < 0 ||
    total_pounds_distributed < 0
  ) {
    return res.status(400).json({
      message: "All numbers must be positive",
    });
  }

  const sqlText = `
    WITH updated AS (
      UPDATE pantry
      SET 
        first_time_households = $1,
        returning_households = $2,
        total_adults = $3,
        total_children = $4,
        total_seniors = $5,
        total_pounds_distributed = $6,
        notes = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING id, week_date, first_time_households, returning_households, total_adults, total_children, total_seniors, total_pounds_distributed, notes, created_by, created_at, updated_at
    )
    SELECT 
      id,
      week_date::date as week_date,
      TO_CHAR(week_date, 'YYYY-MM-DD') || ' - ' || 
      TO_CHAR(week_date + INTERVAL '6 days', 'YYYY-MM-DD') AS week_range,
      first_time_households,
      returning_households,
      total_adults,
      total_children,
      total_seniors,
      total_pounds_distributed,
      notes,
      created_by,
      created_at,
      updated_at
    FROM updated;
  `;

  pool
    .query(sqlText, [
      first_time_households,
      returning_households,
      total_adults,
      total_children,
      total_seniors,
      total_pounds_distributed,
      notes || null,
      pantryId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.json(result.rows[0]);
    })
    .catch((err) => {
      console.error("PUT /api/pantry/:id error:", err);
      res.sendStatus(500);
    });
});

// Delete pantry record
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const pantryId = req.params.id;
  const sqlText = `DELETE FROM pantry WHERE id = $1;`;

  pool
    .query(sqlText, [pantryId])
    .then((result) => {
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error("DELETE /api/pantry/:id error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;