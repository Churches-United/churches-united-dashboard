const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const router = express.Router();

// GET /api/media
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const sqlText = `
      SELECT *
      FROM media_stats
      ORDER BY month_date DESC, platform;
    `;
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/media error:", err);
    res.sendStatus(500);
  }
});

// POST /api/media
router.post("/", rejectUnauthenticated, async (req, res) => {
  const {
    month_date,
    platform,
    total_visits,
    unique_visits,
    pageviews,
    bounce_rate,
    social_views,
    audience_start,
    audience_end,
    total_sent,
    total_opens,
    open_rate,
    total_clicks,
    click_rate,
    notes,
  } = req.body;

  if (!month_date || !platform) {
    return res.status(400).json({ error: "month and platform are required" });
  }

  try {
    const sqlText = `
      INSERT INTO media_stats (
        month_date,
        platform,
        total_visits,
        unique_visits,
        pageviews,
        bounce_rate,
        social_views,
        audience_start,
        audience_end,
        total_sent,
        total_opens,
        open_rate,
        total_clicks,
        click_rate,
        notes
      )
      VALUES (
        DATE_TRUNC('month', $1::date),
        $2,
        $3, $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12, $13, $14,
        $15
      )
      RETURNING *;
    `;
    const result = await pool.query(sqlText, [
      month_date,
      platform,
      total_visits,
      unique_visits,
      pageviews,
      bounce_rate,
      social_views,
      audience_start,
      audience_end,
      total_sent,
      total_opens,
      open_rate,
      total_clicks,
      click_rate,
      notes,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/media error:", err);
    res.sendStatus(500);
  }
});

// PUT /api/media/:platform/:month
router.put("/:platform/:month", rejectUnauthenticated, async (req, res) => {
  const { platform, month } = req.params;
  const {
    total_visits,
    unique_visits,
    pageviews,
    bounce_rate,
    social_views,
    audience_start,
    audience_end,
    total_sent,
    total_opens,
    open_rate,
    total_clicks,
    click_rate,
    notes,
  } = req.body;

  if (bounce_rate !== undefined && (bounce_rate < 0 || bounce_rate > 100)) {
    return res.status(400).json({ error: "bounce_rate must be 0–100" });
  }
  if (open_rate !== undefined && (open_rate < 0 || open_rate > 100)) {
    return res.status(400).json({ error: "open_rate must be 0–100" });
  }
  if (click_rate !== undefined && (click_rate < 0 || click_rate > 100)) {
    return res.status(400).json({ error: "click_rate must be 0–100" });
  }

  try {
    const sqlText = `
      UPDATE media_stats
      SET
        total_visits = COALESCE($1, total_visits),
        unique_visits = COALESCE($2, unique_visits),
        pageviews = COALESCE($3, pageviews),
        bounce_rate = COALESCE($4, bounce_rate),
        social_views = COALESCE($5, social_views),
        audience_start = COALESCE($6, audience_start),
        audience_end = COALESCE($7, audience_end),
        total_sent = COALESCE($8, total_sent),
        total_opens = COALESCE($9, total_opens),
        open_rate = COALESCE($10, open_rate),
        total_clicks = COALESCE($11, total_clicks),
        click_rate = COALESCE($12, click_rate),
        notes = COALESCE($13, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE platform = $14
        AND month_date = DATE_TRUNC('month', $15::date)
      RETURNING *;
    `;
    const result = await pool.query(sqlText, [
      total_visits,
      unique_visits,
      pageviews,
      bounce_rate,
      social_views,
      audience_start,
      audience_end,
      total_sent,
      total_opens,
      open_rate,
      total_clicks,
      click_rate,
      notes,
      platform,
      month,
    ]);

    if (result.rowCount === 0) return res.sendStatus(404);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /api/media/:platform/:month error:", err);
    res.sendStatus(500);
  }
});

// DELETE /api/media/:platform/:month
router.delete("/:platform/:month", rejectUnauthenticated, async (req, res) => {
  const { platform, month } = req.params;

  try {
    const sqlText = `
      DELETE FROM media_stats
      WHERE platform = $1
        AND month_date = DATE_TRUNC('month', $2::date)
      RETURNING *;
    `;
    const result = await pool.query(sqlText, [platform, month]);

    if (result.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /api/media/:platform/:month error:", err);
    res.sendStatus(500);
  }
});

// Reporting
// GET /api/media/reports/monthly
router.get("/reports/monthly", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
      month_date,
      platform,
      SUM(total_visits) AS total_visits,
      SUM(unique_visits) AS unique_visits,
      SUM(pageviews) AS pageviews,
      ROUND(AVG(bounce_rate), 2) AS avg_bounce_rate,
      SUM(social_views) AS social_views,
      MAX(audience_start) AS audience_start,
      MAX(audience_end) AS audience_end,
      MAX(audience_end) - MAX(audience_start) AS audience_gain,
      SUM(total_sent) AS total_sent,
      SUM(total_opens) AS total_opens,
      ROUND((SUM(total_opens)::decimal / NULLIF(SUM(total_sent),0)) * 100, 2) AS open_rate,
      SUM(total_clicks) AS total_clicks,
      ROUND((SUM(total_clicks)::decimal / NULLIF(SUM(total_sent),0)) * 100, 2) AS click_rate
    FROM media_stats
    GROUP BY month_date, platform
    ORDER BY month_date DESC, platform;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/media/reports/monthly error:", err);
    res.sendStatus(500);
  }
});

// GET /api/media/reports/newsletter
router.get("/reports/newsletter", rejectUnauthenticated, async (req, res) => {
  const sqlText = `
    SELECT
        month_date,
        total_sent,
        total_opens,
        ROUND((total_opens::decimal / NULLIF(total_sent, 0)) * 100, 2) AS open_rate,
        total_clicks,
        ROUND((total_clicks::decimal / NULLIF(total_sent, 0)) * 100, 2) AS click_rate,
        notes
    FROM media_stats
    WHERE platform = 'Newsletter'
    ORDER BY month_date DESC;
  `;

  try {
    const result = await pool.query(sqlText);
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/media/reports/newsletter error:", err);
    res.sendStatus(500);
  }
});

// GET /api/media/reports/audience-growth
router.get(
  "/reports/audience-growth",
  rejectUnauthenticated,
  async (req, res) => {
    const sqlText = `
    SELECT
      month_date,
      platform,
      audience_end,
      audience_end
        - LAG(audience_end) OVER (
            PARTITION BY platform
            ORDER BY month_date
          ) AS audience_gain
    FROM media_stats
    WHERE audience_end IS NOT NULL
    ORDER BY platform, month_date;
  `;

    try {
      const result = await pool.query(sqlText);
      res.json(result.rows);
    } catch (err) {
      console.error("GET /api/media/reports/audience-growth error:", err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
