import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/TodoContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Todo from "./Todo";

import { getAllTodos } from "../features/todo/todoSlice";
function TodoContainer() {
  const { isLoading, todos } = useSelector((store) => store.todo);
  const { id } = useSelector((store) => store.user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTodos(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading center />;
  }

  if (todos.length === 0) {
    return (
      <Wrapper>
        <h2>There is not registeret todos...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="jobs">
        {todos.map((todo) => {
          console.log(todo);
          return <Todo key={todo.id} {...todo} />;
        })}
        {/* <WorkedResult todos={todos} start={start} end={end} /> */}
      </div>
    </Wrapper>
  );
}

export default TodoContainer;
