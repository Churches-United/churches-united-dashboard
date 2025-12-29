import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/user.slice.js";
import donorsSlice from "./slices/donors.slice.js";
import donationsSlice from "./slices/donations.slice.js";
import complianceWeeklySlice from "./slices/compliance.slice.js";
import complianceReportsSlice from "./slices/complianceReports.slice.js"; 

import eventsSlice from "./slices/events.slice.js";
import kitchenSlice from "./slices/kitchen.slice.js";
import donationReporting from "./slices/donationReportingSlice.js";
import eventsReporting from "./slices/eventsReporting.slice.js";
import pantrySlice from "./slices/pantry.slice.js";


// Combine all slices in the store:
// update.. added devtools
const useStore = create(
  devtools((...args) => ({
    ...userSlice(...args),
    ...donorsSlice(...args),
    ...donationsSlice(...args),
    ...complianceWeeklySlice(...args),
    ...complianceReportsSlice(...args),
    ...eventsSlice(...args),
    ...kitchenSlice(...args),
    ...eventsReporting(...args),
    ...donationReporting(...args),
    ...pantrySlice(...args)

  }))
);

export default useStore;
