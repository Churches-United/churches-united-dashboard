import { useState } from "react";
import UpcomingEventsReport from "./UpcomingEventsReport";
import EventsByVenueReport from "./EventsByVenueReport";

export default function EventsReporting() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const tabs = {
    upcoming: <UpcomingEventsReport />,
    venue: <EventsByVenueReport />,
  };

  return (
    <div>
      <h3>Events Reports</h3>
      <div>
        <button onClick={() => setActiveTab("upcoming")}>Upcoming Events</button>
        <button onClick={() => setActiveTab("venue")}>By Venue</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {tabs[activeTab]}
      </div>
    </div>
  );
}
