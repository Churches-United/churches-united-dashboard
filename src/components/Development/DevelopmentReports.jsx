import React from "react";
import DonationReporting from "./Reports/DonationReporting";
import EventsReporting from "./Reports/EventsReporting";

export default function DevelopmentReports() {
  return (
    <>
      <h2>Development Reports</h2>

      <section style={{ marginBottom: "2rem" }}>
        <DonationReporting />
      </section>
      {/* todo - should these two be tabs? */}
      <section>
        <EventsReporting />
      </section>
    </>
  );
}
