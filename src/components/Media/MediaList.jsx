import { useEffect } from "react";
import useStore from "../../zustand/store";
import { numberFormatter, formatPercent } from "../../styles/formatters";

export default function MediaList({ records, onEdit }) {
  const deleteMediaRecord = useStore((state) => state.deleteMediaRecord);
  const fetchMediaRecords = useStore((state) => state.fetchMediaRecords);
  const loadingMedia = useStore((state) => state.loadingMedia);

  useEffect(() => {
    fetchMediaRecords();
  }, [fetchMediaRecords]);

  const handleDelete = async (platform, month_date) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await deleteMediaRecord(platform, month_date);
      await fetchMediaRecords();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loadingMedia)
    return <p className="table-loading">Loading media records…</p>;
  if (!records.length)
    return <p className="table-empty">No media records found.</p>;

  return (
    <div className="table-container media-table-container">
      <table className="table-app media-table">
        <thead>
          <tr>
            <th className="col-platform">Platform</th>
            <th className="col-month">Month</th>
            <th className="col-number">Total Visits</th>
            <th className="col-number">Unique Visits</th>
            <th className="col-number">Pageviews</th>
            <th className="col-number">Bounce Rate (%)</th>
            <th className="col-number">Social Views</th>
            <th className="col-number">Audience Start</th>
            <th className="col-number">Audience End</th>
            <th className="col-number">Total Sent</th>
            <th className="col-number">Total Opens</th>
            <th className="col-number">Open Rate (%)</th>
            <th className="col-number">Total Clicks</th>
            <th className="col-number">Click Rate (%)</th>
            <th className="col-notes">Notes</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={`${r.platform}-${r.month_date}`}>
              <td className="col-platform">{r.platform}</td>
              <td className="col-month">
                {r.month_date
                  ? new Date(r.month_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })
                  : "-"}
              </td>

              <td className="col-number">
                {r.total_visits != null
                  ? numberFormatter.format(r.total_visits)
                  : "-"}
              </td>
              <td className="col-number">
                {r.unique_visits != null
                  ? numberFormatter.format(r.unique_visits)
                  : "-"}
              </td>
              <td className="col-number">
                {r.pageviews != null
                  ? numberFormatter.format(r.pageviews)
                  : "-"}
              </td>
              <td className="col-number">
                {r.bounce_rate != null ? formatPercent(r.bounce_rate) : "-"}
              </td>
              <td className="col-number">
                {r.social_views != null
                  ? numberFormatter.format(r.social_views)
                  : "-"}
              </td>
              <td className="col-number">
                {r.audience_start != null
                  ? numberFormatter.format(r.audience_start)
                  : "-"}
              </td>
              <td className="col-number">
                {r.audience_end != null
                  ? numberFormatter.format(r.audience_end)
                  : "-"}
              </td>
              <td className="col-number">
                {r.total_sent != null
                  ? numberFormatter.format(r.total_sent)
                  : "-"}
              </td>
              <td className="col-number">
                {r.total_opens != null
                  ? numberFormatter.format(r.total_opens)
                  : "-"}
              </td>
              <td className="col-number">
                {r.open_rate != null ? formatPercent(r.open_rate) : "-"}
              </td>
              <td className="col-number">
                {r.total_clicks != null
                  ? numberFormatter.format(r.total_clicks)
                  : "-"}
              </td>
              <td className="col-number">
                {r.click_rate != null ? formatPercent(r.click_rate) : "-"}
              </td>

              <td className="col-notes">{r.notes || "-"}</td>

              <td className="col-actions">
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(r)}>
                   Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => handleDelete(r.platform, r.month_date)}
                  >
                   Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
