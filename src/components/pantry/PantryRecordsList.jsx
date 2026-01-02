import { useEffect } from 'react';
import useStore from '../../zustand/store';

const PantryRecordsList = () => {
  const pantryRecords = useStore((state) => state.pantryRecords);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const deletePantryRecord = useStore((state) => state.deletePantryRecord);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deletePantryRecord(id);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pantry Records</h2>
      
      {pantryRecords.length === 0 ? (
        <p>No records found</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Week Date</th>
              <th>First-Time</th>
              <th>Returning</th>
              <th>Adults</th>
              <th>Children</th>
              <th>Seniors</th>
              <th>Total Pounds</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pantryRecords.map((record) => (
              <tr key={record.id}>
                <td>{new Date(record.week_date).toLocaleDateString()}</td>
                <td>{record.first_time_households}</td>
                <td>{record.returning_households}</td>
                <td>{record.adults}</td>
                <td>{record.children}</td>
                <td>{record.seniors}</td>
                <td>{record.total_pounds}</td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PantryRecordsList;