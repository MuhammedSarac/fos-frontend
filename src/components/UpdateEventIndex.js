import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  handleChange,
  handleChangeStart,
  handleChangeEnd,
  editEvent,
  deleteEvent,
} from "../features/event/eventSlice.js";
import { getAllFamilymember } from "../features/familyMember/familymemberSlice.js";
import FormRowDate from "./FormRowDate";
import FormRow from "./FormRow.js";
import FormRowSelect from "./FormRowSelect.js";

const UpdateEventIndex = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const familyId = useSelector((store) => store.user.user.id);

  useEffect(() => {
    dispatch(getAllFamilymember(familyId));
  }, [dispatch, familyId]);

  const { isLoading, start, end, description } = useSelector(
    (store) => store.event
  );
  const { familymembers } = useSelector((store) => store.familymember);

  // Initialize `name` only after `familymembers` is available
  const [name, setName] = useState(
    familymembers.length > 0 ? familymembers[0].name : ""
  );

  // Update `name` state when `familymembers` changes
  useEffect(() => {
    if (familymembers.length > 0 && !name) {
      setName(familymembers[0].name);
    }
  }, [familymembers, name]);

  const handleDateInputFra = (e) => {
    dispatch(handleChangeStart(e));
  };

  const handleDateInputTil = (e) => {
    dispatch(handleChangeEnd(e));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !start || !end) {
      toast.error("Please fill out all fields");
      return;
    }

    const fullDescription = description + " createdby: " + name;
    const familymemberId = familymembers.find(
      (member) => member.name === name
    )?.id;

    dispatch(
      editEvent({
        id,
        events: {
          event: fullDescription,
          start: start,
          end: end,
          familyId: familyId,
          familyMemberId: familymemberId,
        },
      })
    )
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        toast.error("Error updating event");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(
      deleteEvent(id).then(() => {
        navigate("/");
      })
    );
  };

  return (
    <div className="content">
      <div className="content-center content-space">
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
          handleChange={handleDateInputFra}
        />
        {/* end */}
        <FormRowDate
          name="slut"
          labelText="Slut"
          value={end}
          handleChange={handleDateInputTil}
        />
        <div className="btn-container">
          <button
            type="submit"
            className="btn btn-block edit-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            edit
          </button>
        </div>
        <div className="btn-container">
          <button
            className="btn btn-block delete-btn"
            onClick={handleDelete}
            disabled={isLoading}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventIndex;
