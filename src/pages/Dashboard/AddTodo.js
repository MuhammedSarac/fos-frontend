import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect, FormRowDate } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import moment from "moment";
import {
  handleChange,
  clearValues,
  handleChangeStart,
  handleChangeEnd,
  createTodo,
} from "../../features/todo/todoSlice";

const AddTodo = () => {
  const { isLoading, description, start, end } = useSelector(
    (store) => store.todo
  );
  const { familymembers } = useSelector((store) => store.familymember);
  const { id } = useSelector((store) => store.user.user);
  const [name, setName] = useState(familymembers[0].name);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !start || !end) {
      toast.error("Please fill out all fields");
      return;
    }
    const familymemberId = familymembers.find(
      (member) => member.name === name
    )?.id;
    const fullDescription = description + " createdby: " + name;
    console.log(fullDescription);
    moment.locale("da");
    const fra = moment(start);
    const til = moment(end);
    const duration = moment.duration(til.diff(fra));

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    const formattedResult = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    console.log(start);
    dispatch(
      createTodo({
        name: name,
        description: description,
        hours: formattedResult,
        planedStartDateTime: start,
        planedEndDateTime: end,
        status: "Pending",
        familyId: id,
        familyMemberId: familymemberId,
      })
    );
    dispatch(clearValues());
  };
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.name === "name") {
      setName(value);
    }
    dispatch(handleChange({ name, value }));
  };
  const handleDateInputStart = (e) => {
    dispatch(handleChangeStart(e));
  };
  const handleDateInputEnd = (e) => {
    dispatch(handleChangeEnd(e));
  };
  return (
    <Wrapper>
      <form className="form">
        <h3> add todo</h3>
        <div className="form-center">
          {/* familymembers */}
          <FormRowSelect
            name="name"
            value={name}
            labelText="name"
            handleChange={handleInput}
            list={familymembers}
          />
          {/* position */}
          <FormRow
            type="text"
            name="description"
            value={description}
            labelText="description"
            handleChange={handleInput}
          />
          {/* start */}
          <FormRowDate
            name="start"
            labelText="Start"
            value={start}
            handleChange={handleDateInputStart}
          />
          {/* end */}
          <FormRowDate
            name="end"
            labelText="end"
            value={end}
            handleChange={handleDateInputEnd}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTodo;
