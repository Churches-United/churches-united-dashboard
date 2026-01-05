import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import HousingMonthlySummary from "./HousingMonthlySummary.jsx";
import HousingMonthlyTable from "./HousingMonthlyTable.jsx";

export default function HousingReports() {
  const fetchMonthlyHousing = useStore(
    (state) => state.fetchHousingMonthlyReport
  );
  const fetchSummaryHousing = useStore(
    (state) => state.fetchHousingMonthlySummary
  );

  const [activeTab, setActiveTab] = useState("table");

  useEffect(() => {
    fetchMonthlyHousing();
    fetchSummaryHousing();
  }, [fetchMonthlyHousing, fetchSummaryHousing]);

  return (
    <>
      <h2>Housing Reports</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <button onClick={() => setActiveTab("table")}>Table</button>
        <button onClick={() => setActiveTab("summary")}>Summary</button>
      </div>
      <div>
        {activeTab === "table" && <HousingMonthlyTable />}
        {activeTab === "summary" && <HousingMonthlySummary />}
      </div>
    </>
  );
}
