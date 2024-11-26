import customFetch from "../../utils/axios";

export const getTodosByFamilyThunk = async (familyId, thunkAPI) => {
  try {
    const resp = await customFetch.get(`/todos/getbyfamilyid/${familyId}`);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log("There are this error: ", error);
  }
};

export const getTodosByFamilymemberThunk = async (familyMemberId, thunkAPI) => {
  try {
    const resp = await customFetch.get(
      `/todos/getbyfamilymemberid/${familyMemberId}`
    );
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const getTodoByIdThunk = async (id, thunkAPI) => {
  try {
    const resp = customFetch.get(`/todos/${id}`);
    console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
export const createTodoThunk = async (events, thunkAPI) => {
  console.log(events);
  try {
    const resp = await customFetch.post("/todos", events);
    //thunkAPI.dispatch(clearValues());
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const editTodoThunk = async (todo, thunkAPI) => {
  try {
    const resp = await customFetch.put(`/todos/${todo.id}`, todo);
    return resp.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const deleteTodoThunk = async (id, thunkAPI) => {
  try {
    const resp = await customFetch.delete(`/todos/${id}`);
    console.log(resp);
    return id;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Failed to delete todo");
  }
};
