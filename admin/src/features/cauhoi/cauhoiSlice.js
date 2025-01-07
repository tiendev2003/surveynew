import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  cauhois: [],
  cauhoi: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};
export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/questions", {
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
export const fetchQuestionById = createAsyncThunk(
  "questions/fetchQuestionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/questions/${id}`, {
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
export const createQuestion = createAsyncThunk(
  "questions/createQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/questions", question, {
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
export const editQuestion = createAsyncThunk(
  "questions/editQuestion",
  async (question, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/questions/${question.id}`,
        question,
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

export const deleteQuestion = createAsyncThunk(
  "questions/deleteQuestion",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/questions/${id}`, {
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

export const fetchQuestionsByExam = createAsyncThunk(
  "questions/fetchQuestionsByExam",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/questions/status/true?survey_type_id=${id}`, {
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

const cauhoiSlice = createSlice({
  name: "cauhoi",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cauhois = action.payload.data;
        state.error = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchQuestionsByExam.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestionsByExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cauhois = action.payload.data;
        state.error = null;
      })
      .addCase(fetchQuestionsByExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchQuestionById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cauhoi = action.payload.data;
        state.error = null;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createQuestion.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cauhois.push(action.payload.data);
        state.error = null;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editQuestion.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cauhoi = action.payload.data;
        state.error = null;
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteQuestion.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(state.cauhoi);
        state.cauhois = state.cauhois.filter(
          (cauhoi) => cauhoi.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cauhoiSlice.reducer;
