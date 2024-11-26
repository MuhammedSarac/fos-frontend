import customFetch from "../../utils/axios";

export const getEventsByFamilyThunk = async (familyId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/events/getallbyfamily/${familyId}`);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log("There are this error: ", error);
  }
};

export const getEventsByFamilymemberThunk = async (
  familyMemberId,
  thunkAPI
) => {
  try {
    const resp = await customFetch.get(
      `/events/getallbyfamilymember/${familyMemberId}`
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const getEventByIdThunk = async (id, thunkAPI) => {
  try {
    const resp = customFetch.get(`/events/${id}`);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const createEventThunk = async (events, thunkAPI) => {
  console.log(events);
  try {
    const resp = await customFetch.post("/events", events);
    //thunkAPI.dispatch(clearValues());
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const editEventThunk = async ({ id, events }, thunkAPI) => {
  console.info("Starting editEventThunk with id and events:");

  try {
    const resp = await customFetch.put(`/events/${id}`, events);
    console.warn(resp);
    return resp;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const deleteEventThunk = async (id) => {
  try {
    const resp = await customFetch.delete(`/events/${id}`);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
