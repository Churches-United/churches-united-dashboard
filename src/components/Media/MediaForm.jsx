import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

const emptyForm = {
  month_date: "",
  platform: "",
  total_visits: "",
  unique_visits: "",
  pageviews: "",
  bounce_rate: "",
  social_views: "",
  audience_start: "",
  audience_end: "",
  instagram_views: "",
  tiktok_views: "",
  total_sent: "",
  total_opens: "",
  open_rate: "",
  total_clicks: "",
  click_rate: "",
  notes: "",
};

const platforms = ["Website", "Facebook", "Instagram", "TikTok", "Newsletter"];

export default function MediaForm({ editRecord, setEditRecord }) {
  const addMediaRecord = useStore((state) => state.addMediaRecord);
  const updateMediaRecord = useStore((state) => state.updateMediaRecord);
  const loadingMedia = useStore((state) => state.loadingMedia);

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editRecord) {
      setFormData({
        ...editRecord,
        month_date: editRecord.month_date.slice(0, 7),
      });
    }
  }, [editRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert "YYYY-MM" to "YYYY-MM-01" for Postgres
    const normalizedData = {
      ...formData,
      month_date:
        formData.month_date.length === 7
          ? formData.month_date + "-01"
          : formData.month_date,

      // Integer fields
      total_visits: formData.total_visits ? parseInt(formData.total_visits) : 0,
      unique_visits: formData.unique_visits
        ? parseInt(formData.unique_visits)
        : 0,
      pageviews: formData.pageviews ? parseInt(formData.pageviews) : 0,
      social_views: formData.social_views ? parseInt(formData.social_views) : 0,
      audience_start: formData.audience_start
        ? parseInt(formData.audience_start)
        : null,
      audience_end: formData.audience_end
        ? parseInt(formData.audience_end)
        : null,
      instagram_views: formData.instagram_views
        ? parseInt(formData.instagram_views)
        : 0,
      tiktok_views: formData.tiktok_views ? parseInt(formData.tiktok_views) : 0,
      total_sent: formData.total_sent ? parseInt(formData.total_sent) : 0,
      total_opens: formData.total_opens ? parseInt(formData.total_opens) : 0,
      total_clicks: formData.total_clicks ? parseInt(formData.total_clicks) : 0,

      // Decimal / numeric fields
      bounce_rate: formData.bounce_rate
        ? parseFloat(formData.bounce_rate)
        : null,
      open_rate: formData.open_rate ? parseFloat(formData.open_rate) : null,
      click_rate: formData.click_rate ? parseFloat(formData.click_rate) : null,
    };

    if (editRecord) {
      await updateMediaRecord(
        editRecord.platform,
        editRecord.month_date,
        normalizedData
      );
      setEditRecord(null);
    } else {
      await addMediaRecord(normalizedData);
    }

    setFormData(emptyForm);
  };

  const handleCancel = () => {
    setEditRecord(null);
    setFormData(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="media-form">
      <h3>{editRecord ? "Edit Media Record" : "Add Media Record"}</h3>

      {/* Month + Platform */}
      <div className="form-section-inline">
        <label>
          Month:
          <input
            type="month"
            name="month_date"
            value={formData.month_date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Platform:
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            disabled={!!editRecord}
            required
          >
            <option value="">Select Platform</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Dynamic Fields */}
      {formData.platform === "Website" && (
        <>
          <h4>Website Data</h4>
          <label>
            Total Visits:{" "}
            <input
              type="number"
              name="total_visits"
              value={formData.total_visits}
              onChange={handleChange}
            />
          </label>
          <label>
            Unique Visits:{" "}
            <input
              type="number"
              name="unique_visits"
              value={formData.unique_visits}
              onChange={handleChange}
            />
          </label>
          <label>
            Pageviews:{" "}
            <input
              type="number"
              name="pageviews"
              value={formData.pageviews}
              onChange={handleChange}
            />
          </label>
          <label>
            Bounce Rate (%):{" "}
            <input
              type="number"
              step="0.01"
              name="bounce_rate"
              value={formData.bounce_rate}
              onChange={handleChange}
            />
          </label>
        </>
      )}

      {formData.platform === "Facebook" && (
        <>
          <h4>Facebook Data</h4>
          <label>
            Views:{" "}
            <input
              type="number"
              name="social_views"
              value={formData.social_views}
              onChange={handleChange}
            />
          </label>
          <label>
            Audience Start:{" "}
            <input
              type="number"
              name="audience_start"
              value={formData.audience_start}
              onChange={handleChange}
            />
          </label>
          <label>
            Audience End:{" "}
            <input
              type="number"
              name="audience_end"
              value={formData.audience_end}
              onChange={handleChange}
            />
          </label>
        </>
      )}

      {formData.platform === "Instagram" && (
        <>
          <h4>Instagram Data</h4>
          <label>
            Views:{" "}
            <input
              type="number"
              name="instagram_views"
              value={formData.instagram_views}
              onChange={handleChange}
            />
          </label>
        </>
      )}

      {formData.platform === "TikTok" && (
        <>
          <h4>TikTok Data</h4>
          <label>
            Views:{" "}
            <input
              type="number"
              name="tiktok_views"
              value={formData.tiktok_views}
              onChange={handleChange}
            />
          </label>
        </>
      )}

      {formData.platform === "Newsletter" && (
        <>
          <h4>Newsletter Data</h4>
          <label>
            Total Sent:{" "}
            <input
              type="number"
              name="total_sent"
              value={formData.total_sent}
              onChange={handleChange}
            />
          </label>
          <label>
            Total Opens:{" "}
            <input
              type="number"
              name="total_opens"
              value={formData.total_opens}
              onChange={handleChange}
            />
          </label>
          <label>
            Open Rate (%):{" "}
            <input
              type="number"
              step="0.01"
              name="open_rate"
              value={formData.open_rate}
              onChange={handleChange}
            />
          </label>
          <label>
            Total Clicks:{" "}
            <input
              type="number"
              name="total_clicks"
              value={formData.total_clicks}
              onChange={handleChange}
            />
          </label>
          <label>
            Click Rate (%):{" "}
            <input
              type="number"
              step="0.01"
              name="click_rate"
              value={formData.click_rate}
              onChange={handleChange}
            />
          </label>
        </>
      )}

      {/* Notes */}
      <label>
        Notes:{" "}
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>

      {/* Buttons */}
      <div className="form-buttons">
        <button type="submit" disabled={loadingMedia}>
          {editRecord ? "Update" : "Add"}
        </button>
        {editRecord && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
