import React, { useState, useEffect } from "react";
import { FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTodosByFamilymember,
  getAllTodos,
  //   handleChangeEnd,
  //   handleChangeStart,
} from "../features/todo/todoSlice";
import { getAllFamilymember } from "../features/familyMember/familymemberSlice";

function SearchContainer() {
  const { id } = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFamilymember(id));
  }, [dispatch, id]);
  const { isLoading, familymembers } = useSelector(
    (store) => store.familymember
  );
  //   const [start, setStart] = useState(new Date());
  //   const [end, setEnd] = useState(new Date());
  const [name, setname] = useState("All");
  const familymembersWithAll = [{ name: "All" }, ...familymembers];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "All") {
      dispatch(getAllTodos(id));
      return;
    }
    const selectedFamilymember = familymembers.find((e) => e.name === name);
    dispatch(getAllTodosByFamilymember(selectedFamilymember.id));
  };
  const handleNameInput = (e) => {
    const value = e.target.value;
    setname(value);
  };
  //   const handleDateInputStart = (e) => {
  //     dispatch(handleChangeStart(e));
  //   };
  //   const handleDateInputEnd = (e) => {
  //     dispatch(handleChangeEnd(e));
  //   };
  return (
    <Wrapper>
      <form className="form">
        <h3> search todo by name</h3>
        <div className="form-center">
          {/* names */}
          <FormRowSelect
            name="name"
            value={name}
            labelText="name"
            handleChange={handleNameInput}
            list={familymembersWithAll}
          />

          {/* <FormRowOnlyDate
            name="start"
            labelText="Start"
            value={start}
            handleChange={handleDateInputStart}
          />

          <FormRowOnlyDate
            name="end"
            labelText="End"
            value={end}
            handleChange={handleDateInputEnd}
          />  */}

          <div className="btn-container">
            {/* <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button> */}
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
          {/* {isAdmin()} */}
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
