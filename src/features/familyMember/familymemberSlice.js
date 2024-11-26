import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getFamilymemberThunk,
  registerFamilymemberThunk,
  deleteFamilymemberThunk,
  getAllFamilymemberThunk,
} from "./familymemberThunk";

import { getFamilymemberFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  familymember: getFamilymemberFromLocalStorage(),
  familymembers: [],
  currentfamilymember: {},
};

export const getFamilymember = createAsyncThunk(
  "familymember/",
  getFamilymemberThunk
);

export const getAllFamilymember = createAsyncThunk(
  "/familymember/all/",
  getAllFamilymemberThunk
);
export const deleteFamilymember = createAsyncThunk(
  "familymember/delete",
  deleteFamilymemberThunk
);
export const registerFamilymember = createAsyncThunk(
  "familymember/create",
  registerFamilymemberThunk
);

const familymemberSlice = createSlice({
  name: "familymember",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerFamilymember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerFamilymember.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Familymember is added succesfully");
      })
      .addCase(registerFamilymember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteFamilymember.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteFamilymember.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(getAllFamilymember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFamilymember.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.familymembers = payload.data;
      })
      .addCase(getAllFamilymember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getFamilymember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFamilymember.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentfamilymember = payload;
      })
      .addCase(getFamilymember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearValues } = familymemberSlice.actions;
export default familymemberSlice.reducer;
