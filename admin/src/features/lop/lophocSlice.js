import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  lophocs: [],
  lophoc: {},
  loading: false,
  errors: null,
};

export const fetchLophocs = createAsyncThunk(
  "lophoc/fetchLophocs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/classes");
       return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteLophoc = createAsyncThunk(
  "lophoc/deleteLophoc",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/classes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createLophoc = createAsyncThunk(
  "lophoc/createLophoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/classes", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLophoc = createAsyncThunk(
  "lophoc/updateLophoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/classes/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLophocById = createAsyncThunk(
  "lophoc/fetchLophocById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/classes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const lophocSlice = createSlice({
  name: "lophoc",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLophocs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLophocs.fulfilled, (state, action) => {
        state.lophocs = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchLophocs.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(deleteLophoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLophoc.fulfilled, (state, action) => {
        state.lophocs = state.lophocs.filter(
          (lophoc) => lophoc.id !== action.payload
        );
        state.loading = false;
        state.errors = null;
      })
      .addCase(deleteLophoc.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(createLophoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLophoc.fulfilled, (state, action) => {
        state.lophocs.push(action.payload.data);
        state.loading = false;
        state.errors = null;
      })
      .addCase(createLophoc.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(updateLophoc.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLophoc.fulfilled, (state, action) => {
        state.lophocs = state.lophocs.map((lophoc) =>
          lophoc.id === action.payload.data.id ? action.payload.data : lophoc
        );
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateLophoc.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(fetchLophocById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLophocById.fulfilled, (state, action) => {
        state.lophoc = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchLophocById.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      });
      
  },
});

export default lophocSlice.reducer;
