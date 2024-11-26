import { FormRow, FormRowDate, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  handleChangeStart,
  handleChangeEnd,
  createEvent,
} from "../../features/event/eventSlice";
import { useState } from "react";

const AddEvent = () => {
  const { isLoading, description, start, end } = useSelector(
    (store) => store.event
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

    dispatch(
      createEvent({
        event: fullDescription,
        start: start,
        end: end,
        familyId: id,
        familyMemberId: familymemberId,
      })
    );
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
        <h3> add event</h3>
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
export default AddEvent;

// family member id si eklenecek famiy member tarafi bitince
