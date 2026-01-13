import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import MediaReportsToolBar from "./MediaReportsToolBar";
import MonthlyMediaReport from "./MonthlyMediaReport";
import NewsletterReport from "./NewsletterReport";
import AudienceGrowthReport from "./AudienceGrowthReport";

export default function MediaReports() {
  // --- Store actions ---
  const fetchMonthlyMediaReport = useStore(
    (state) => state.fetchMonthlyMediaReport
  );
  const fetchNewsletterReport = useStore(
    (state) => state.fetchNewsletterReport
  );
  const fetchAudienceGrowthReport = useStore(
    (state) => state.fetchAudienceGrowthReport
  );

  // --- Store data ---
  const monthlyReport = useStore((state) => state.monthlyReport);
  const newsletterReport = useStore((state) => state.newsletterReport);
  const audienceReport = useStore((state) => state.audienceReport);

  const loadingMonthly = useStore((state) => state.loadingMonthlyReports);
  const loadingNewsletter = useStore((state) => state.loadingNewsletterReports);
  const loadingAudience = useStore((state) => state.loadingAudienceReports);

  // --- Local state ---
  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [activeReport, setActiveReport] = useState("monthly");

  // --- Fetch all reports on mount ---
  useEffect(() => {
    fetchMonthlyMediaReport();
    fetchNewsletterReport();
    fetchAudienceGrowthReport();
  }, [
    fetchMonthlyMediaReport,
    fetchNewsletterReport,
    fetchAudienceGrowthReport,
  ]);

  // --- Determine available years dynamically from monthly report ---
  const years = Array.from(
    new Set(monthlyReport.map((r) => r.month_date.slice(0, 4)))
  ).sort((a, b) => b - a);

  // --- Filtered monthly report ---
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

      {/* Toolbar */}
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

      {/* Report content */}
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
  );
}
