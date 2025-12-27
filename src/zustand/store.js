import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/user.slice.js";
import donorsSlice from "./slices/donors.slice.js";
import donationsSlice from "./slices/donations.slice.js";
import complianceWeeklySlice from "./slices/compliance.slice.js";
import eventsSlice from "./slices/events.slice.js";

// Combine all slices in the store:
// update.. added devtools
const useStore = create(
  devtools((...args) => ({
    ...userSlice(...args),
    ...donorsSlice(...args),
    ...donationsSlice(...args),
    ...complianceWeeklySlice(...args),
    ...eventsSlice(...args),
  }))
);

export default useStore;
