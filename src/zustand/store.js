import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/user.slice.js";
import donorsSlice from "./slices/donors.slice.js";
import donationsSlice from "./slices/donations.slice.js";
import complianceWeeklySlice from "./slices/compliance.slice.js";
import complianceReportsSlice from "./slices/complianceReports.slice.js";
import shelterWeeklySlice from "./slices/shelter.slice.js";
import shelterReportsSlice from "./slices/shelterReports.slice.js";
import financeWeeklySlice from "./slices/finance.slice.js";
import financeReportsSlice from "./slices/financeReports.slice.js";
import hrSlice from "./slices/hr.slice.js";

import eventsSlice from "./slices/events.slice.js";
import kitchenSlice from "./slices/kitchen.slice.js";
import donationReporting from "./slices/donationReportingSlice.js";
import eventsReporting from "./slices/eventsReporting.slice.js";
import pantrySlice from "./slices/pantry.slice.js";
import housingSlice from "./slices/housing.slice.js";
import volunteersSlice from "./slices/volunteer.slice.js";
import volunteerEngagementsSlice from "./slices/volunteerEngagement.slice.js";
import volunteerReportsSlice from "./slices/volunteerReports.slice.js";
import mediaSlice from "./slices/media.slice.js";
import mediaReportSlice from "./slices/mediaReporting.js";
import adminUsersSlice from "./slices/adminUser.slice.js";

// Combine all slices in the store:
// update.. added devtools
const useStore = create(
  devtools((...args) => ({
    ...userSlice(...args),
    ...donorsSlice(...args),
    ...donationsSlice(...args),
    ...complianceWeeklySlice(...args),
    ...complianceReportsSlice(...args),
    ...shelterWeeklySlice(...args),
    ...shelterReportsSlice(...args),
    ...financeWeeklySlice(...args),
    ...financeReportsSlice(...args),
    ...eventsSlice(...args),
    ...kitchenSlice(...args),
    ...eventsReporting(...args),
    ...donationReporting(...args),
    ...pantrySlice(...args),
    ...housingSlice(...args),
    ...volunteersSlice(...args),
    ...volunteerEngagementsSlice(...args),
    ...volunteerReportsSlice(...args),
    ...mediaSlice(...args),
    ...mediaReportSlice(...args),
    ...hrSlice(...args),
    ...adminUsersSlice(...args),

  }))
);

export default useStore;
