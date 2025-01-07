import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  chudes: [],
  chude: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/topics", {
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

export const fetchTopicById = createAsyncThunk(
  "topics/fetchTopicById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/topics/${id}`, {
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

export const createTopic = createAsyncThunk(
  "topics/createTopic",
  async (topic, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/topics", topic, {
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

export const editTopic = createAsyncThunk(
  "topics/editTopic",
  async (topic, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/topics/${topic.id}`, topic, {
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

export const deleteTopic = createAsyncThunk(
  "topics/deleteTopic",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/topics/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chudeSlice = createSlice({
  name: "chudes",
  initialState,
  reducers: {
    clearChude(state, action) {
      state.chude = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chudes = action.payload.data;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTopicById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chude = action.payload.data;
      })
      .addCase(fetchTopicById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTopic.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chudes.push(action.payload.data);
      })
      .addCase(createTopic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editTopic.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(editTopic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chudes = state.chudes.map((chude) =>
          chude.id === action.payload.id ? action.payload : chude
        );
      })
      .addCase(editTopic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTopic.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chudes = state.chudes.filter(
          (chude) => chude.id !== action.payload.id
        );
      })
      .addCase(deleteTopic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default chudeSlice.reducer;
