import { useEffect } from "react";
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

  useEffect(() => {
    fetchMonthlyHousing();
    fetchSummaryHousing();
  }, [fetchMonthlyHousing, fetchSummaryHousing]);

  return (
    <>
      <h2>Housing Reports</h2>
      <HousingMonthlyTable />
      <HousingMonthlySummary />
    </>
  );
}
