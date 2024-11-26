import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Landing, Register, ProtectedRoute } from "./pages";
import {
  Calender,
  SharedLayout,
  Todo,
  AddEvent,
  AddTodo,
  AddFamilymember,
  EditEvent,
} from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Calender />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="todo" element={<Todo />} />
          <Route path="addtodo" element={<AddTodo />} />
          <Route path="addfamilymember" element={<AddFamilymember />} />
          <Route path="editevent" element={<EditEvent />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
