import { useEffect, useState } from 'react';
import useStore from '../../zustand/store';

const PantryRecordsList = () => {
  const pantryRecords = useStore((state) => state.pantryRecords);
  const editPantryRecord = useStore((state) => state.editPantryRecord);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const deletePantryRecord = useStore((state) => state.deletePantryRecord);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
   const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_time_households: 0,
    returning_households: 0,
    total_adults: 0,
    total_children: 0,
    total_seniors: 0,
    total_pounds_distributed: 0,
  });

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deletePantryRecord(id);
    }
  };

  const handleEdit = (record) => {
  setEditId(record.id);
  setEditFormData({
    first_time_households: record.first_time_households,
    returning_households: record.returning_households,
    total_adults: record.total_adults,
    total_children: record.total_children,
    total_seniors: record.total_seniors,
    total_pounds_distributed: record.total_pounds_distributed,
  });
};

const handleCancelEdit = () => {
  setEditId(null);
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditFormData((prev) => ({
    ...prev,
    [name]: parseFloat(value) || 0,
  }));
};

const handleSaveEdit = async (id) => {
  await editPantryRecord(id, editFormData);
  setEditId(null);
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
      
      {editId === record.id ? (
        <>
          <td>
            <input type="number" name="first_time_households" value={editFormData.first_time_households} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <input type="number" name="returning_households" value={editFormData.returning_households} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <input type="number" name="total_adults" value={editFormData.total_adults} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <input type="number" name="total_children" value={editFormData.total_children} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <input type="number" name="total_seniors" value={editFormData.total_seniors} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <input type="number" step="0.01" name="total_pounds_distributed" value={editFormData.total_pounds_distributed} onChange={handleEditChange} min="0" />
          </td>
          <td>
            <button onClick={() => handleSaveEdit(record.id)}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{record.first_time_households}</td>
          <td>{record.returning_households}</td>
          <td>{record.total_adults}</td>
          <td>{record.total_children}</td>
          <td>{record.total_seniors}</td>
          <td>{record.total_pounds_distributed}</td>
          <td>
            <button onClick={() => handleEdit(record)}>Edit</button>
            <button onClick={() => handleDelete(record.id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  ))}

          </tbody>
        </table>
      )}
    </div>
  );
};

export default PantryRecordsList;