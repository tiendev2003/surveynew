import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  khaosats: [],
  khaosat: {},
  thongke: {},
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};
export const fetchSurveys = createAsyncThunk(
  "surveys/fetchSurveys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/surveys`, {
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

export const createSurvey = createAsyncThunk(
  "surveys/createSurvey",
  async (survey, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/surveys", survey, {
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

export const fetchSurveysPending = createAsyncThunk(
  "surveys/fetchSurveysPending",
  async (role, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/surveys/pending", {
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
export const approveSurvey = createAsyncThunk(
  "surveys/approveSurvey",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(`/api/surveys/${id}/approve`, {
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

export const updateSurvey = createAsyncThunk(
  "surveys/updateSurvey",
  async (survey, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/surveys/${survey.id}`,
        survey,
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

export const deleteSurvey = createAsyncThunk(
  "surveys/deleteSurvey",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/surveys/${id}`, {
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

export const saveSurveyResponses = createAsyncThunk(
  "surveys/saveSurveyResponses",
  async (responses, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/api/surveys/response", responses, {
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

export const fetchSurvey = createAsyncThunk(
  "surveys/fetchSurvey",
  async (id, { rejectWithValue }) => {
     try {
      const response = await axiosClient.get(`/api/surveys/${id}`, {
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

export const copySurvey = createAsyncThunk(
  "surveys/copySurvey",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        `/api/surveys/${id}/duplicate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendSurvey = createAsyncThunk(
  "surveys/sendSurvey",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(`/api/surveys/${data.id}/send`,{
        type : data.type,
        ids : data.ids
      }, {
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

export const scheduleSurvey = createAsyncThunk(
  "surveys/scheduleSurvey",
  async (survey, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(
        `/api/surveys/${survey.id}/schedule`,
        survey,
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

export const createSurveyLink = createAsyncThunk(
  "surveys/createSurveyLink",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        `/api/surveys/${id}/share-link`,
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

export const fetchSurveyByStudent = createAsyncThunk(
  "surveys/fetchSurveyByStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/surveys/all/student`, {
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
export const fetchSurveyStatis= createAsyncThunk(
  "surveys/fetchSurveyStatis",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/surveys/${id}/statistics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const fetchSurveyAllAdmin = createAsyncThunk(
  "surveys/fetchSurveyAllAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/surveys/all/admin`, {
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

const khaosatSlice = createSlice({
  name: "khaosat",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurveys.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.khaosats = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSurveys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createSurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.error = null;
      })
      .addCase(createSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveysPending.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSurveysPending.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.khaosats = action.payload.data.surveys;
        state.error = null;
      })
      .addCase(fetchSurveysPending.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(approveSurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(approveSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.khaosats = state.khaosats.filter(
          (khaosat) => khaosat.id !== action.payload
        );
      })
      .addCase(approveSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateSurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.khaosats = state.khaosats.filter(
          (khaosat) => khaosat.id !== action.payload
        );
      })
      .addCase(deleteSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
         
         state.khaosat = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(copySurvey.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(copySurvey.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.khaosats.push(action.payload.data);
        state.error = null;
      })
      .addCase(copySurvey.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyByStudent.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSurveyByStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.khaosats = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSurveyByStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyStatis.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSurveyStatis.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.thongke = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSurveyStatis.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSurveyAllAdmin.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      }
      )
      .addCase(fetchSurveyAllAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.khaosats = action.payload.data;
        state.error = null;
      })
      .addCase(fetchSurveyAllAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default khaosatSlice.reducer;
