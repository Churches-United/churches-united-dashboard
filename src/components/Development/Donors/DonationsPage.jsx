import { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import DonationForm from "./DonationForm";
import DonationTable from "./DonationTable";

export default function DonationsPage() {
  const fetchDonations = useStore((s) => s.fetchDonations);
  const deleteDonation = useStore((s) => s.deleteDonation);
  const editDonation = useStore((s) => s.editDonation);
  const addDonation = useStore((s) => s.addDonation);
  const donations = useStore((s) => s.donations);
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);
  const donors = useStore((s) => s.donors);
  const fetchDonors = useStore((s) => s.fetchDonors);

  const [editingDonation, setEditingDonation] = useState(null);

  useEffect(() => {
    fetchDonations();
    fetchDonors();
  }, [fetchDonations, fetchDonors]);

  const handleSubmit = async (data) => {
    if (editingDonation) {
      await editDonation(editingDonation.id, data);
      setEditingDonation(null);
    } else {
      await addDonation(data);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      await deleteDonation(id);
    }
  };

  return (
    <div>
      <h2>Donations</h2>
      <DonationForm donors={donors} onSubmit={handleSubmit} initialData={editingDonation} />
      <h3>All Donations</h3>
      {loading ? <p>Loading donations...</p> : error ? <p>Error: {error}</p> :
        <DonationTable donations={donations} onEdit={setEditingDonation} onDelete={handleDelete} />
      }
    </div>
  );
}
