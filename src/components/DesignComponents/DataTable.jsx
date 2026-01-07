import PropTypes from "prop-types";
import "../DesignComponents/DataTable.css";

export default function DataTable({
  columns,
  data,
  isLoading = false,
  error = null,
  renderActions,
  maxWidth = "100%",
}) {
  if (isLoading) {
    return <div className="table-loading">Loading records...</div>;
  }

  if (error) {
    return <div className="table-error">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="table-empty">No records found</div>;
  }

  return (
    <div
      className="table-container"
      style={{ maxWidth, margin: "0 auto" }}
    >
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={row.id ?? idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}

              {renderActions && (
                <td>
                  <div className="table-actions">
                    {renderActions(row)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  renderActions: PropTypes.func,
  maxWidth: PropTypes.string,
};
