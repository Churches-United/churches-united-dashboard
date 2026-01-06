import useStore from "../../zustand/store";

export default function MediaTable({ records, setEditRecord }) {
  const deleteMediaRecord = useStore((state) => state.deleteMediaRecord);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Platform</th>
          <th>Total Visits</th>
          <th>Unique</th>
          <th>Pageviews / Views</th>
          <th>Bounce Rate</th>
          <th>Audience Start</th>
          <th>Audience End</th>
          <th>Audience Gain</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {records.map((r) => {
          const audienceGain =
            r.audience_start != null && r.audience_end != null
              ? r.audience_end - r.audience_start
              : "";

          return (
            <tr key={`${r.platform}-${r.month_date}`}>
              <td>{r.month_date.slice(0, 7)}</td>
              <td>{r.platform}</td>
              <td>{r.total_visits ?? ""}</td>
              <td>{r.unique_visits ?? ""}</td>
              <td>
                {r.platform === "Facebook"
                  ? r.social_views ?? ""
                  : r.pageviews ?? ""}
              </td>
              <td>{r.bounce_rate ?? ""}</td>
              <td>{r.audience_start ?? ""}</td>
              <td>{r.audience_end ?? ""}</td>
              <td>{audienceGain}</td>
              <td>
                <button onClick={() => setEditRecord(r)}>Edit</button>
                <button
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
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
