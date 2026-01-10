import "./Media.css";

export default function MediaToolBar({ onAdd }) {
  return (
    <div className="table-toolbar">
      <div className="table-toolbar-left">
        {/* Reserved for filters/search later */}
      </div>

      <div className="table-toolbar-right">
        <button
          className="btn btn-primary"
          onClick={onAdd}
        >
          Add Media Record
        </button>
      </div>
    </div>
  );
}
