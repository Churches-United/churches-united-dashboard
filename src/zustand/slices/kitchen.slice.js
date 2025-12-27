import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function KitchenPage() {
  const fetchKitchenRecords = useStore((state) => state.fetchKitchenRecords);
  const deleteKitchenRecord = useStore((state) => state.deleteKitchenRecord);
  const editKitchenRecord = useStore((state) => state.editKitchenRecord);
  const kitchenRecords = useStore((state) => state.kitchenRecords);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const addKitchenRecord = useStore((state) => state.addKitchenRecord);

  const [weekDate, setWeekDate] = useState("");
  const [totalMeals, setTotalMeals] = useState("");
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState("");

  return (
    <div>
      <h2>Kitchen Operations</h2>
    </div>
  );
}