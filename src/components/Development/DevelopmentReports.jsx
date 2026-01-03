import React from "react";
import DonationReporting from "./DonationReporting";
import EventsReporting from "./EventsReporting";

export default function DevelopmentReports() {
  return (
    <>
      <h2>Development Reports</h2>

      <section style={{ marginBottom: "2rem" }}>
        <DonationReporting />
      </section>

      <section>
        <EventsReporting />
      </section>
    </>
  );
}
