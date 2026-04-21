import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../../services/dashboardApi";
import type { DashboardSummary, Offer } from "../../types/api";

interface DashboardState {
  summary: DashboardSummary | null;
  activeOffers: Offer[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  activeOffers: [],
  loading: false,
  error: null,
};

export const fetchDashboardThunk = createAsyncThunk("dashboard/fetch", async (_, { rejectWithValue }) => {
  try {
    const [summary, activeOffers] = await Promise.all([
      dashboardApi.summary(),
      dashboardApi.activeOffers(),
    ]);
    return { summary, activeOffers };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDashboardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.activeOffers = action.payload.activeOffers;
      })
      .addCase(fetchDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to fetch dashboard";
      });
  },
});

export default dashboardSlice.reducer;
