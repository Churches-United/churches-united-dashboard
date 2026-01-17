import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import MediaReportsToolBar from "./MediaReportsToolBar";
import MonthlyMediaReport from "./MonthlyMediaReport";
import NewsletterReport from "./NewsletterReport";
import AudienceGrowthReport from "./AudienceGrowthReport";
import MediaLineChart from "../Charts/MediaLineChart";
import "../Charts/MediaDashboard.css";

export default function MediaReports() {
  // ---------------- Store actions ----------------
  const fetchMonthlyMediaReport = useStore(
    (state) => state.fetchMonthlyMediaReport
  );
  const fetchNewsletterReport = useStore(
    (state) => state.fetchNewsletterReport
  );
  const fetchAudienceGrowthReport = useStore(
    (state) => state.fetchAudienceGrowthReport
  );

  // ---------------- Store data ----------------
  const monthlyReport = useStore((state) => state.monthlyReport);
  const newsletterReport = useStore((state) => state.newsletterReport);
  const audienceReport = useStore((state) => state.audienceReport);

  const loadingMonthly = useStore((state) => state.loadingMonthlyReports);
  const loadingNewsletter = useStore((state) => state.loadingNewsletterReports);
  const loadingAudience = useStore((state) => state.loadingAudienceReports);

  // ---------------- Local state ----------------
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [activeReport, setActiveReport] = useState("monthly");

  // ---------------- Fetch data ----------------
  useEffect(() => {
    fetchMonthlyMediaReport();
    fetchNewsletterReport();
    fetchAudienceGrowthReport();
  }, [
    fetchMonthlyMediaReport,
    fetchNewsletterReport,
    fetchAudienceGrowthReport,
  ]);

  // ---------------- Year options ----------------
  const years = Array.from(
    new Set(monthlyReport.map((r) => r.month_date.slice(0, 4)))
  ).sort((a, b) => b - a);

  // ---------------- Chart data (last 6 months) ----------------
  const sortedMonthly = [...monthlyReport].sort(
    (a, b) => new Date(a.month_date) - new Date(b.month_date)
  );
  const last6Months = sortedMonthly.slice(-6);

  const labels = last6Months.map((r) =>
    new Date(r.month_date).toLocaleString("default", { month: "short" })
  );

  const PLATFORM_CONFIG = {
    Website: {
      key: "pageviews",
      color: "#1f77b4",
    },
    Facebook: {
      key: "social_views",
      color: "#4267B2",
    },
    Instagram: {
      key: "social_views",
      color: "#C13584",
    },
    TikTok: {
      key: "social_views",
      color: "#69C9D0",
    },
  };

  const datasets = Object.entries(PLATFORM_CONFIG).map(
    ([platform, config]) => ({
      label: platform,
      data: last6Months.map((month) => {
        const row = monthlyReport.find(
          (r) => r.platform === platform && r.month_date === month.month_date
        );
        return row ? Number(row[config.key]) || 0 : 0;
      }),
      borderColor: config.color,
      backgroundColor: "transparent",
      tension: 0.3,
      fill: false,
    })
  );

  // Get latest newsletter month
  const latestNewsletterMonth = newsletterReport.length
    ? new Date(newsletterReport[0].month_date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })
    : "";

  // ---------------- Newsletter KPIs ----------------
  const latestNewsletter = [...newsletterReport].sort(
    (a, b) => new Date(b.month_date) - new Date(a.month_date)
  )[0];

  // ---------------- Filtered monthly table ----------------
  const filteredMonthly = monthlyReport
    .filter((r) => !platform || r.platform === platform)
    .filter((r) => !year || r.month_date.startsWith(year))
    .filter(
      (r) => !search || r.platform.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="hub-container">
      <DepartmentHeader
        title="Media Reports"
        actions={
          <>
            <NavLink
              to="/media"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
            </NavLink>
            <NavLink
              to="/media/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* ---------------- Charts + Newsletter KPIs ---------------- */}
      <div className="dashboard-container media">
        <div className="charts-row media">
          <div className="chart-column media">
            <MediaLineChart labels={labels} datasets={datasets} />
          </div>

          <div className="kpi-column media">
            {latestNewsletter && (
              <div className="newsletter-kpi">
                <h4 className="newsletter-title">{latestNewsletterMonth}</h4>
                <h4 className="newsletter-title">Newsletter</h4>

                <div className="newsletter-box">
                  <div className="value">{latestNewsletter.total_sent}</div>
                  <div className="label">Total Sent</div>
                </div>

                <div className="newsletter-box">
                  <div className="value">{latestNewsletter.open_rate}%</div>
                  <div className="label">Open Rate</div>
                </div>

                <div className="newsletter-box">
                  <div className="value">{latestNewsletter.click_rate}%</div>
                  <div className="label">Click Rate</div>
                </div>

                <div className="newsletter-box">
                  <div className="value">{latestNewsletter.total_clicks}</div>
                  <div className="label">Total Clicks</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- Toolbar ---------------- */}
        <MediaReportsToolBar
          year={year}
          setYear={setYear}
          platform={platform}
          setPlatform={setPlatform}
          search={search}
          setSearch={setSearch}
          activeReport={activeReport}
          setActiveReport={setActiveReport}
          YEAR_OPTIONS={years}
          PLATFORM_OPTIONS={[
            "Website",
            "Facebook",
            "Instagram",
            "TikTok",
            "Newsletter",
          ]}
          onClear={() => {
            setYear("");
            setPlatform("");
            setSearch("");
          }}
        />

        {/* ---------------- Tables ---------------- */}
        <div style={{ marginTop: "1rem" }}>
          {activeReport === "monthly" &&
            (loadingMonthly ? (
              <p>Loading monthly report…</p>
            ) : (
              <MonthlyMediaReport records={filteredMonthly} />
            ))}

          {activeReport === "newsletter" &&
            (loadingNewsletter ? (
              <p>Loading newsletter report…</p>
            ) : (
              <NewsletterReport records={newsletterReport} />
            ))}

          {activeReport === "audience-growth" &&
            (loadingAudience ? (
              <p>Loading audience growth report…</p>
            ) : (
              <AudienceGrowthReport records={audienceReport} />
            ))}
        </div>
      </div>
    </div>
  );
}
