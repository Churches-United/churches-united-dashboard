import { useState } from "react";
import HousingForm from "./HousingForm";
import HousingTable from "./HousingTable";

export default function HousingHome() {
  const [editingRecord, setEditingRecord] = useState(null);

  return (
    <div>
      <h2>North Campus Housing</h2>
      <HousingForm
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />
      <HousingTable onEdit={setEditingRecord} />

      <section style={{ marginTop: "2rem" }}>
        <h3>Quick Overview</h3>
        <p>Summary metrics/graphs/cards coming soon.</p>
      </section>
    </div>
  );
}
