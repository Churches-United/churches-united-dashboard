export default function DepartmentHeader({ title, actions }) {
  return (
    <div className="department-header">
      <h2>{title}</h2>

      <div className="department-actions">
        {actions}
      </div>
    </div>
  );
}

