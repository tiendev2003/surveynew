
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  lophocs: [],
  lophoc: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/classes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
       return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchClassById = createAsyncThunk(
  "classes/fetchClassById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createClass = createAsyncThunk(
  "classes/createClass",
  async (lophoc, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/classes", lophoc, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editClass = createAsyncThunk(
  "classes/editClass",
  async (lophoc, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/classes/${lophoc.id}`,
        lophoc,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/classes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const lophocSlice = createSlice({
  name: "lophoc",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.data);
        state.lophocs = action.payload.data;
        state.error = null;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchClassById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lophoc = action.payload.data;
        state.error = null;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createClass.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lophocs.push(action.payload.data);
        state.error = null;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editClass.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lophoc = action.payload.data;
        state.error = null;
      })
      .addCase(editClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClass.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lophocs = state.lophocs.filter(
          (lophoc) => lophoc.id !== action.payload.data.id
        );
        state.error = null;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default lophocSlice.reducer;