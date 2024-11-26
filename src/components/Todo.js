import React from "react";
import Wrapper from "../assets/wrappers/Todo";
import TodoInfo from "./TodoInfo";
import moment from "moment-timezone";
import {
  FaHourglassStart,
  FaHourglassEnd,
  FaStopwatch,
  FaList,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../features/todo/todoSlice";

function Todo({
  id,
  familyMemberId,
  planedStartDateTime,
  planedEndDateTime,
  description,
  status,
  familyId,
  hours,
}) {
  moment.locale("da");
  const fra = moment(planedStartDateTime).add(1, "hours");
  const til = moment(planedEndDateTime).add(1, "hours");

  const { familymembers } = useSelector((store) => store.familymember);
  const dispatch = useDispatch();

  const name = familymembers.find(
    (member) => member.id === familyMemberId
  )?.name;

  const handleStatusChange = () => {
    if (status === "Pending") {
      dispatch(
        editTodo({
          id: id,
          status: "Fulfilled",
          description: description,
          hours: hours,
          planedEndDateTime: planedEndDateTime,
          planedStartDateTime: planedStartDateTime,
          familyMemberId: familyMemberId,
          familyId: familyId,
        })
      );
    }
  };
  const handleDeleteTodo = () => {
    dispatch(deleteTodo(id));
  };
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{name}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TodoInfo
            icon={<FaHourglassStart />}
            text={fra.format("Do MMM YYYY, H:mm")}
          />
          <TodoInfo
            icon={<FaHourglassEnd />}
            text={til.format("Do MMM YYYY, H:mm")}
          />
          <TodoInfo icon={<FaStopwatch />} text={hours} />
          <TodoInfo icon={<FaList />} text={description} />
        </div>
        <div className="content-center">
          <button
            className="edit-btn btn btn-block"
            onClick={handleStatusChange}
            disabled={status === "Fulfilled"}
          >
            {status}
          </button>
          <button
            className="delete-btn btn btn-block"
            onClick={handleDeleteTodo}
          >
            delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Todo;
