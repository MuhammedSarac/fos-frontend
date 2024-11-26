import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  getTodosByFamilyThunk,
  getTodoByIdThunk,
  getTodosByFamilymemberThunk,
  deleteTodoThunk,
  editTodoThunk,
  createTodoThunk,
} from "./todoThunk";

const initialState = {
  todos: [],
  isLoading: false,
  description: "",
  start: new Date(),
  end: new Date(),
  familymembers: [],
};

export const getAllTodos = createAsyncThunk(
  "todos/getalltodosbyfamily",
  getTodosByFamilyThunk
);

export const getAllTodosByFamilymember = createAsyncThunk(
  "todos/getalltodosbyfamilymember",
  getTodosByFamilymemberThunk
);

export const getTodoById = createAsyncThunk("todos/gettodos", getTodoByIdThunk);

export const createTodo = createAsyncThunk("todos/createtodo", createTodoThunk);

export const editTodo = createAsyncThunk("todos/edittodo", editTodoThunk);

export const deleteTodo = createAsyncThunk("todos/deletetodo", deleteTodoThunk);

const todoSlice = createSlice({
  name: "todo",
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
    setEditTodo: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Todo is added succesfully");
      })
      .addCase(createTodo.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter((todo) => todo.id !== payload);
        toast.success("Todo is deleted");
      })
      .addCase(deleteTodo.rejected, ({ payload }) => {
        toast.error(payload);
      })
      .addCase(getTodoById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodoById.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.todos = payload;
      })
      .addCase(getTodoById.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllTodosByFamilymember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTodosByFamilymember.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.todos = payload.data;
      })
      .addCase(getAllTodosByFamilymember.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getAllTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTodos.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.todos = payload.data;
      })
      .addCase(getAllTodos.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodo.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        // Assuming `payload` contains the updated todo object
        const updatedTodo = payload;
        console.log(payload);

        // Find the index of the todo that was edited
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );

        // Update the todo in the state
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }

        // Display success toast
        toast.success("Todo is edited successfully");
      })
      .addCase(editTodo.rejected, (state, { payload }) => {
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
} = todoSlice.actions;
export default todoSlice.reducer;
