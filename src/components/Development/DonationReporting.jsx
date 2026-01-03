import { useState } from "react";
import DonationByDonorReport from "./DonationByDonorReport";
import DonationMonthlyReport from "./DonationMonthlyReport";
import DonationWeeklyReport from "./DonationWeeklyReport";


export default function DonationReporting() {
  const [activeTab, setActiveTab] = useState("weekly");

  const tabs = {
    weekly: <DonationWeeklyReport />,
    monthly: <DonationMonthlyReport />,
    byDonor: <DonationByDonorReport />,
  };

  return (
    <div>
      <h3>Donation Reports</h3>
      <div>
        <button onClick={() => setActiveTab("weekly")}>Weekly</button>
        <button onClick={() => setActiveTab("monthly")}>Monthly</button>
        <button onClick={() => setActiveTab("byDonor")}>By Donor</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
}