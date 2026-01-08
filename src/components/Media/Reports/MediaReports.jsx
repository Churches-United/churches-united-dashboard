import { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import MonthlyMediaReport from "./MonthlyMediaReport";
import NewsletterReport from "./NewsletterReport";
import AudienceGrowthReport from "./AudienceGrowthReport";
import TableToolBar from "../../DesignComponents/TableToolBar/TableToolBar";


export default function MediaReports() {
  const fetchMonthlyMediaReport = useStore(
    (state) => state.fetchMonthlyMediaReport
  );
  const fetchNewsletterReport = useStore(
    (state) => state.fetchNewsletterReport
  );
  const fetchAudienceGrowthReport = useStore(
    (state) => state.fetchAudienceGrowthReport
  );

  const [activeTab, setActiveTab] = useState("monthly");

  useEffect(() => {
    fetchMonthlyMediaReport();
    fetchNewsletterReport();
    fetchAudienceGrowthReport();
  }, [
    fetchMonthlyMediaReport,
    fetchNewsletterReport,
    fetchAudienceGrowthReport,
  ]);

  return (
    <>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("monthly")}>Monthly</button>
        <button onClick={() => setActiveTab("newsletter")}>Newsletter</button>
        <button onClick={() => setActiveTab("audience")}>
          Audience Growth
        </button>
      </div>

      <div>
        {activeTab === "monthly" && <MonthlyMediaReport />}
        {activeTab === "newsletter" && <NewsletterReport />}
        {activeTab === "audience" && <AudienceGrowthReport />}
      </div>
    </>
  );
}
