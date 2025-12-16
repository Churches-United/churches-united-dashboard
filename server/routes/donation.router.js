const express = require("express");
const pool = require("../modules/pool");
const { rejectUnauthenticated } = require("../modules/authentication-middleware");

const router = express.Router();

///////// DONORS
//  GET /api/donors
router.get("/", rejectUnauthenticated, (req, res) => {
  const sqlText = `SELECT * FROM donors ORDER BY name;`;

  pool
    .query(sqlText)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error("GET donors error", error);
      res.sendStatus(500);
    });
});

//  POST /api/donors
router.post("/", rejectUnauthenticated, (req, res) => {
  const { name, type } = req.body;
  const sqlText = `
    INSERT INTO donors (name, type)
    VALUES ($1, $2)
    RETURNING *;`;

  pool
    .query(sqlText, [name, type])
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error("POST donor error", error);
      res.sendStatus(500);
    });
});

// GET by id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  const donorId = req.params.id;

  const sqlText = `
    SELECT *
    FROM donors
    WHERE id = $1;
  `;

  try {
    const result = await pool.query(sqlText, [donorId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/donors/:id error:", err);
    res.sendStatus(500);
  }
});

//  PUT /api/donors/:id
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  const donorId = req.params.id;
  const { name, type } = req.body;

  const sqlText = `
    UPDATE donors
    SET name = $1, type = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *;
    `;

  try {
    const result = await pool.query(sqlText, [name, type, donorId]);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("PUT error", error);
    res.sendStatus(500);
  }
});

//  DELETE /api/donors/:id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const sqlText = `DELETE FROM donors WHERE id = $1;`;

  pool
    .query(sqlText, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error("DELETE donor error", error);
      res.sendStatus(500);
    });
});

///////// DONATIONS

//  GET /api/donations

//  POST /api/donations

//  PUT /api/donations/:id

//  DELETE /api/donations/:id

module.exports = router;
