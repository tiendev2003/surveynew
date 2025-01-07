import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  khoas: [],
  khoa: {},
  loading: false,
  errors: null,
};

export const fetchKhoas = createAsyncThunk(
  "khoa/fetchKhoas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/departments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteKhoa = createAsyncThunk(
  "khoa/deleteKhoa",
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/departments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createKhoa = createAsyncThunk(
  "khoa/createKhoa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/departments", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateKhoa = createAsyncThunk(
  "khoa/updateKhoa",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/departments/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchKhoaById = createAsyncThunk(
  "khoa/fetchKhoaById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/departments/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const khoaSlice = createSlice({
  name: "khoa",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchKhoas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKhoas.fulfilled, (state, action) => {
        state.khoas = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchKhoas.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(deleteKhoa.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteKhoa.fulfilled, (state, action) => {
        state.khoas = state.khoas.filter((khoa) => khoa.id !== action.payload);
        state.loading = false;
        state.errors = null;
      })
      .addCase(deleteKhoa.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(createKhoa.pending, (state) => {
        state.loading = true;
      })
      .addCase(createKhoa.fulfilled, (state, action) => {
        state.khoas.push(action.payload.data);
        state.loading = false;
        state.errors = null;
      })
      .addCase(createKhoa.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(updateKhoa.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateKhoa.fulfilled, (state, action) => {
        state.khoas = state.khoas.map((khoa) =>
          khoa.id === action.payload.data.id ? action.payload.data : khoa
        );
        state.loading = false;
        state.errors = null;
      })
      .addCase(updateKhoa.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      })
      .addCase(fetchKhoaById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchKhoaById.fulfilled, (state, action) => {
        state.khoa = action.payload.data;
        state.loading = false;
        state.errors = null;
      })
      .addCase(fetchKhoaById.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.error;
      });
  },
});

export default khoaSlice.reducer;
