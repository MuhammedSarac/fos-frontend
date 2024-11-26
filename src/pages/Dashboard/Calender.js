import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllFamilymember } from "../../features/familyMember/familymemberSlice";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../features/event/eventSlice";
import { addHours, parseISO } from "date-fns";

const localizer = momentLocalizer(moment);

const Calender = () => {
  const { events } = useSelector((store) => store.event);

  const id = useSelector((store) => store.user.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents(id));
    dispatch(getAllFamilymember(id));
  }, [dispatch, id]);

  const formattedEvents = events.map((event) => {
    const parsedStart = parseISO(event.start);
    const parsedEnd = parseISO(event.end);

    const adjustStart = addHours(parsedStart, 1);
    const adjustEnd = addHours(parsedEnd, 1);

    return {
      title: event.event,
      start: adjustStart,
      end: adjustEnd,
      id: event.id,
      familyId: event.familyId,
      familyMemberId: event.familyMemberId,
    };
  });

  console.log(formattedEvents);

  const handleSubmit = () => {
    console.log("handle submit");
  };

  const eventStyleGetter = (event) => {
    let style = {};
    if (event.color === "green") {
      style.backgroundColor = "green";
    }
    return { style };
  };

  return (
    <Wrapper style={{ height: "95vh" }}>
      <Link to="/editevent" className="btn btn-rediger" onClick={handleSubmit}>
        Edit Event
      </Link>
      <Calendar
        eventPropGetter={eventStyleGetter}
        localizer={localizer}
        events={formattedEvents} // Use formatted events here
        defaultView="week"
      />
    </Wrapper>
  );
};

export default Calender;
