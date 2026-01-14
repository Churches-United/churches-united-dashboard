import { FaUsers, FaUser, FaMapMarkerAlt, FaCheck } from "react-icons/fa";
import "./OutreachReports.css";

export default function VolunteerSummaryCards({
  periodData = [],
  ytdData = [],
}) {
  // Period totals (e.g., this month)
  let periodVolunteers = 0;
  let periodSignups = 0;
  let periodGroup = 0;
  let periodIndividual = 0;
  const periodLocations = {};

  periodData.forEach((row) => {
    const volunteers = Number(row.number_volunteers ?? 0);
    const signups = Number(row.software_signups ?? 0);

    periodVolunteers += volunteers;
    periodSignups += signups;

    if (volunteers > 1) {
      periodGroup += volunteers;
    } else if (volunteers === 1) {
      periodIndividual += volunteers;
    }

    if (row.location) {
      periodLocations[row.location] =
        (periodLocations[row.location] || 0) + volunteers;
    }
  });

  // YTD totals
  let ytdVolunteers = 0;
  let ytdSignups = 0;
  let ytdGroup = 0;
  let ytdIndividual = 0;
  const ytdLocations = {};

  ytdData.forEach((row) => {
    const volunteers = Number(row.number_volunteers ?? 0);
    const signups = Number(row.software_signups ?? 0);

    ytdVolunteers += volunteers;
    ytdSignups += signups;

    if (volunteers > 1) {
      ytdGroup += volunteers;
    } else if (volunteers === 1) {
      ytdIndividual += volunteers;
    }

    if (row.location) {
      ytdLocations[row.location] =
        (ytdLocations[row.location] || 0) + volunteers;
    }
  });

  const topLocationPeriod = Object.entries(periodLocations).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const topLocationYTD = Object.entries(ytdLocations).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    // todo - Since we are in January... could do quarter data? 
    <div className="summary-card-grid">
      <div className="summary-card">
        <h4>Total Volunteers</h4>
        <p className="summary-value">
          <FaUsers /> {periodVolunteers}
        </p>
        <small>This Year: {ytdVolunteers}</small>
      </div>

      <div className="summary-card">
        <h4>Software Signups</h4>
        <p className="summary-value">
          <FaCheck /> {periodSignups}
        </p>
        <small>This Year: {ytdSignups}</small>
      </div>
      {/* <div className="summary-card">
        <h4>Volunteer Type</h4>
        <p className="summary-value">
          <FaUsers /> Group: {periodGroup}
        </p>
        <small>
          <FaUser /> Individual: {periodIndividual}
        </small>
        <br />
        <small>
          This Year — Group: {ytdGroup}, Individual: {ytdIndividual}
        </small>
      </div> */}

      <div className="summary-card">
        <h4>Top Location</h4>
        <p className="summary-value">
          <FaMapMarkerAlt /> {topLocationPeriod ? topLocationPeriod[0] : "—"}
        </p>
        <small>
          {topLocationYTD
            ? `This Year: ${topLocationYTD[0]} (${topLocationYTD[1]})`
            : ""}
        </small>
      </div>
    </div>
  );
}
