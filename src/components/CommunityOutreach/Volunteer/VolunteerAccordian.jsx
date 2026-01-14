import { useState } from "react";
import VolunteerList from "./VolunteerList";

export default function VolunteerAccordion() {
  const [open, setOpen] = useState(false);

  return (
    // todo - department page over this
    <div className="accordion">
      <button className="accordion-header" onClick={() => setOpen(!open)}>
        Volunteers {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className="accordion-content">
          <VolunteerList />
        </div>
      )}
    </div>
  );
}
