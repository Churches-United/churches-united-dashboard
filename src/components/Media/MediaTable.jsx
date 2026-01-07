import useStore from "../../zustand/store";

export default function MediaTable({ records, setEditRecord }) {
  const deleteMediaRecord = useStore((state) => state.deleteMediaRecord);

  const mainViews = (r) => {
    if (r.platform === "Website") return r.pageviews ?? 0;
    if (["Facebook", "Instagram", "TikTok"].includes(r.platform))
      return r.social_views ?? 0;
    return "";
  };

  return (
    <div className="table-container" style={{ maxWidth: "100%" }}>
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th>Platform</th>
            <th>Total Visits</th>
            <th>Unique Visits</th>
            <th>Main Views</th>
            <th>Bounce Rate</th>
            <th>Audience Start</th>
            <th>Audience End</th>
            <th>Audience Gain</th>
            <th>Total Sent</th>
            <th>Total Opens</th>
            <th>Open Rate</th>
            <th>Total Clicks</th>
            <th>Click Rate</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => {
            // Compute audience gain only for Facebook
            const audienceGain =
              r.platform === "Facebook" &&
              r.audience_start != null &&
              r.audience_end != null
                ? r.audience_end - r.audience_start
                : "";

            return (
              <tr key={`${r.platform}-${r.month_date}`}>
                <td>{r.month_date.slice(0, 7)}</td>
                <td>{r.platform}</td>
                <td>{r.total_visits ?? ""}</td>
                <td>{r.unique_visits ?? ""}</td>
                <td>{mainViews(r)}</td>
                <td>{r.platform === "Website" ? r.bounce_rate ?? "" : ""}</td>
                <td>
                  {r.platform === "Facebook" ? r.audience_start ?? "" : ""}
                </td>
                <td>{r.platform === "Facebook" ? r.audience_end ?? "" : ""}</td>
                <td>{audienceGain}</td>
                <td>{r.platform === "Newsletter" ? r.total_sent ?? "" : ""}</td>
                <td>
                  {r.platform === "Newsletter" ? r.total_opens ?? "" : ""}
                </td>
                <td>{r.platform === "Newsletter" ? r.open_rate ?? "" : ""}</td>
                <td>
                  {r.platform === "Newsletter" ? r.total_clicks ?? "" : ""}
                </td>
                <td>{r.platform === "Newsletter" ? r.click_rate ?? "" : ""}</td>
                <td>{r.notes ?? ""}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="btn btn-sm btn-table-edit"
                      onClick={() => setEditRecord(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-table-delete"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete ${
                              r.platform
                            } - ${r.month_date.slice(0, 7)}?`
                          )
                        ) {
                          deleteMediaRecord(r.platform, r.month_date);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
