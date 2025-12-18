const express = require("express");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// GET rOUTE KITCHEN
router.get("/", rejectUnauthenticated, (req, res) => {
  // query
  const sqlText = `SELECT * FROM kitchen ORDER BY week_date DESC;`;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.error("GET /api/kitchen error:", err);
      res.sendStatus(500);
    });
});

// kitchen post route

router.post("/", rejectUnauthenticated, (req, res) => {
  const { week_date, total_meals_served, notes } = req.body;

  // validation checks
  if (!week_date || total_meals_served === undefined) {
    return res.status(400).json({
      message: "Week date and total meals served are required",
    });
  }
  // validation if meals are less than 0
  if (total_meals_served < 0) {
    return res.status(400).json({
      message: "Total meals served must be a positive number",
    });
  }

  const sqlText = `
    INSERT INTO kitchen (week_date, total_meals_served, notes, created_by)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  pool
    .query(sqlText, [week_date, total_meals_served, notes || null, req.user.id])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST /api/kitchen error:", error);

      // postgress will check if duplicate exists
      if (error.code === "23505") {
        res.status(409).json({
          message: `A record for ${week_date} already exists`,
        });
      } else {
        res.sendStatus(500);
      }
    });
});

// get single week by id

router.get("/:id", rejectUnauthenticated, (req, res) => {
  const kitchenId = req.params.id;

  const sqlText = `SELECT * FROM kitchen WHERE id = $1;`;

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

// update
// PUT /api/kitchen/:id
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
    UPDATE kitchen
    SET total_meals_served = $1, notes = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
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

// DELETE /api/kitchen/:id
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
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.error("GET /api/kitchen/reports/monthly error:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
