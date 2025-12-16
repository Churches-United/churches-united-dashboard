import { create } from "zustand";
import { devtools } from "zustand/middleware";
import userSlice from "./slices/user.slice.js";


// Combine all slices in the store:
// update.. added devtools
const useStore = create(
  devtools((...args) => ({
    ...userSlice(...args),
  }))
);

export default useStore;
