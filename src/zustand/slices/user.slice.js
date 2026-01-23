import axios from "axios";

// All requests made with axios will include credentials, which means
// the cookie that corresponds with the session will be sent along
// inside every request's header
axios.defaults.withCredentials = true;

const createUserSlice = (set, get) => ({
  user: {},
  authErrorMessage: "",
  fetchUser: async () => {
    //  Retrieves the current user's data from the /api/user endpoint.
    try {
      const { data } = await axios.get("/api/user");
      set({ user: data });
    } catch (err) {
      console.log("fetchUser error:", err);
      set({ user: {} });
    }
  },
  register: async (newUserCredentials) => {
    get().setAuthErrorMessage("");
    try {
      // Convert frontend camelCase to backend snake_case
      const payload = {
        username: newUserCredentials.username,
        password: newUserCredentials.password,
        email: newUserCredentials.email,
        first_name: newUserCredentials.firstName,
        last_name: newUserCredentials.lastName,
        role: newUserCredentials.role,
        department: newUserCredentials.department || null,
      };

      await axios.post("/api/user/register", payload);

      // Log in the new user automatically
      get().logIn({
        username: newUserCredentials.username,
        password: newUserCredentials.password,
      });
    } catch (err) {
      console.log("register error:", err);
      get().setAuthErrorMessage(
        "Oops! Registration failed. That username might already be taken or a required field is missing."
      );
    }
  },

  logIn: async (userCredentials) => {
    // Logs in an existing user by sending a POST request
    // to /api/user/login and then retrieves their data.
    get().setAuthErrorMessage("");
    try {
      await axios.post("/api/user/login", userCredentials);
      get().fetchUser();
    } catch (err) {
      console.log("logIn error:", err);
      if (err.response.status === 401) {
        // 401 is the status code sent from passport if user isn't in the database or
        // if the username and password don't match in the database, so:
        get().setAuthErrorMessage(
          "Oops! Login failed. You have entered an invalid username or password. Try again!"
        );
      } else {
        // Got an error that wasn't status 401, so we'll show a more generic error:
        get().setAuthErrorMessage(
          "Oops! Login failed. It might be our fault. Try again!"
        );
      }
    }
  },
  logOut: async () => {
    // Logs out the current user by sending a DELETE request to
    // /api/user/logout, and then clears their data.
    try {
      await axios.delete("/api/user/logout");
      set({ user: {} });
    } catch (err) {
      console.log("logOut error:", err);
    }
  },
  setAuthErrorMessage: (message) => {
    // Sets an error message for authentication-related issues.
    set({ authErrorMessage: message });
  },

  updateProfile: async (profileData) => {
    try {
      const userId = get().user.id;
      if (!userId) throw new Error("No user logged in");

      const payload = {
        email: profileData.email,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
      };

      const { data: updatedUser } = await axios.put(`/api/user/me`, payload);

      set({ user: updatedUser });
      console.log("Profile updated successfully!");
    } catch (err) {
      console.error("updateProfile error:", err);
      get().setAuthErrorMessage("Failed to update profile. Please try again.");
    }
  },

  updatePassword: async ({ currentPassword, newPassword }) => {
    try {
      const userId = get().user.id;
      if (!userId) throw new Error("No user logged in");

      await axios.put(`/api/user/${userId}/password`, {
        currentPassword,
        newPassword,
      });

      return true;
    } catch (err) {
      console.error("updatePassword error:", err);
      get().setAuthErrorMessage(
        "Failed to update password. Please check your current password and try again."
      );
      return false;
    }
  },
});

export default createUserSlice;
