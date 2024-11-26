import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getEventsByFamilyThunk,
  getEventByIdThunk,
  getEventsByFamilymemberThunk,
  deleteEventThunk,
  editEventThunk,
  createEventThunk,
} from "./eventThunk";

const initialState = {
  events: [],
  isLoading: false,
  description: "",
  start: new Date(),
  end: new Date(),
  familymembers: [],
};

export const getAllEvents = createAsyncThunk(
  "events/getalleventsbyfamily",
  getEventsByFamilyThunk
);

export const getAllEventsByFamilymember = createAsyncThunk(
  "events/getalleventsbyfamilymember",
  getEventsByFamilymemberThunk
);

export const getAllEventById = createAsyncThunk(
  "events/getevents",
  getEventByIdThunk
);

export const createEvent = createAsyncThunk(
  "events/createevent",
  createEventThunk
);

export const editEvent = createAsyncThunk("events/editevent", editEventThunk);

export const deleteEvent = createAsyncThunk(
  "events/deleteevent",
  deleteEventThunk
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    handleChangeStart: (state, { payload: value }) => {
      state.start = value;
    },
    handleChangeEnd: (state, { payload: value }) => {
      state.end = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditEvent: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Event is added succesfully");
      })
      .addCase(createEvent.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteEvent.fulfilled, () => {
        toast.success("Event is deleted");
      })
      .addCase(deleteEvent.rejected, ({ payload }) => {
        toast.error(payload);
      })
      .addCase(getAllEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEventById.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.events = payload;
      })
      .addCase(getAllEventById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllEventsByFamilymember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEventsByFamilymember.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.events = payload.data;
      })
      .addCase(getAllEventsByFamilymember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.events = payload.data;
      })
      .addCase(getAllEvents.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Event is edited succesfully", payload);
      })
      .addCase(editEvent.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  handleChange,
  handleChangeEnd,
  handleChangeStart,
  setEditEvent,
  clearValues,
} = eventSlice.actions;
export default eventSlice.reducer;
