import { useEffect, useState } from "react";
import useStore from "../../zustand/store"; 

export default function DonationReporting() {
  const [activeTab, setActiveTab] = useState("weekly");

  const weeklyReports = useStore((state) => state.weeklyReports);
  const monthlyReports = useStore((state) => state.monthlyReports);
  const byDonorReports = useStore((state) => state.byDonorReports);
  const loadingReports = useStore((state) => state.loadingReports);
  const fetchWeeklyDonationReports = useStore((state) => state.fetchWeeklyDonationReports);
  const fetchMonthlyDonationReports = useStore((state) => state.fetchMonthlyDonationReports);
  const fetchByDonorReports = useStore((state) => state.fetchByDonorReports);

  useEffect(() => {
    if (activeTab === "weekly") fetchWeeklyDonationReports();
    if (activeTab === "monthly") fetchMonthlyDonationReports();
    if (activeTab === "byDonor") fetchByDonorReports();
  }, [activeTab]);

  if (loadingReports) return <p>Loading reports...</p>;

  const renderWeekly = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Week</th>
          <th>Total Donations</th>
          <th>Donation Count</th>
          <th>Restricted Amount</th>
          <th>Notable Amount</th>
        </tr>
      </thead>
      <tbody>
        {weeklyReports.map((r) => (
          <tr key={r.week_start}>
            <td>{r.week_range}</td>
            <td>${r.total_amount}</td>
            <td>{r.donation_count}</td>
            <td>${r.restricted_amount}</td>
            <td>${r.notable_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMonthly = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Total Donations</th>
          <th>Donation Count</th>
          <th>Restricted Amount</th>
          <th>Notable Amount</th>
        </tr>
      </thead>
      <tbody>
        {monthlyReports.map((r) => (
          <tr key={r.month_start}>
            <td>{r.month_label}</td>
            <td>${r.total_amount}</td>
            <td>{r.donation_count}</td>
            <td>${r.restricted_amount}</td>
            <td>${r.notable_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderByDonor = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Donor</th>
          <th>Type</th>
          <th>Total Donated</th>
          <th>Donation Count</th>
          <th>Restricted Total</th>
          <th>Notable Total</th>
        </tr>
      </thead>
      <tbody>
        {byDonorReports.map((r) => (
          <tr key={r.donor_id}>
            <td>{r.donor_name}</td>
            <td>{r.donor_type}</td>
            <td>${r.total_donated}</td>
            <td>{r.donation_count}</td>
            <td>${r.restricted_total}</td>
            <td>${r.notable_total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Donation Reports</h2>
      <div>
        <button onClick={() => setActiveTab("weekly")}>Weekly</button>
        <button onClick={() => setActiveTab("monthly")}>Monthly</button>
        <button onClick={() => setActiveTab("byDonor")}>By Donor</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {activeTab === "weekly" && renderWeekly()}
        {activeTab === "monthly" && renderMonthly()}
        {activeTab === "byDonor" && renderByDonor()}
      </div>
    </div>
  );
}
