import { useState } from "react";
import HousingForm from "./HousingForm";
import HousingTable from "./HousingTable";

export default function HousingHome() {
  const [editingRecord, setEditingRecord] = useState(null);

  return (
    <main>
      <h2>North Campus Housing</h2>
      <HousingForm
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />
      <HousingTable onEdit={setEditingRecord} />
    </main>
  );
}
