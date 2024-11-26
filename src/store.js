import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./features/user/userSlice";
import eventSlice from "./features/event/eventSlice";
import familymemberSlice from "./features/familyMember/familymemberSlice";
import todoSlice from "./features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    event: eventSlice,
    familymember: familymemberSlice,
    todo: todoSlice,
  },
});
