import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch users from the API using native fetch
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit, skip }) => {
    // Construct the URL with query parameters for pagination
    const url = new URL("https://dummyjson.com/users");
    url.searchParams.append("limit", limit); // Number of records to fetch
    url.searchParams.append("skip", skip); // Offset for fetching records

    // Fetch data from the API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users"); // Handle error if fetch fails
    }

    // Parse the JSON data from the response
    const data = await response.json();
    return data; // Return the data to be used by the slice
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [], // Array to hold the list of users
    totalUsers: 0, // Total number of users available
    loading: false, // Loading state for fetching users
    error: null, // Error state for handling fetch errors
    filters: {
      gender: "", // Filter by gender
      country: "", // Filter by country
    },
    sort: "id", // Default sort field
  },
  reducers: {
    // Reducer to set the sorting field
    setSort(state, action) {
      state.sort = action.payload;
    },
    // Reducer to update filters
    setFilter(state, action) {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value; // Update filter based on action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true; // Set loading state when fetch starts
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state when fetch is successful
        // Append new users to the existing list, avoiding duplicates
        state.users = [
          ...state.users,
          ...action.payload.users.filter(
            (user) => !state.users.some((u) => u.id === user.id)
          ),
        ];
        state.totalUsers = action.payload.total; // Update total number of users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false; // Reset loading state on fetch error
        state.error = action.error.message; // Set error message from action
      });
  },
});

// Export actions for use in components
export const { setSort, setFilter } = userSlice.actions;
// Export the reducer to be used in the store
export default userSlice.reducer;