import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  users: [],
  user: {},
  loading: false,
  errors: null,
};

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/users");
      console.log(response.data.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      });
  },
});

export default userSlice.reducer;
