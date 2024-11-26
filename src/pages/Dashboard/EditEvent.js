import Wrapper from "../../assets/wrappers/EditEventPage";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../components";
import { UpdateEvent } from "../../components";
import { useEffect } from "react";
import { getAllEvents } from "../../features/event/eventSlice";

const EditEvent = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user.user);
  useEffect(() => {
    dispatch(getAllEvents(id));
  }, [dispatch, id]);
  const { events, isLoading } = useSelector((store) => store.event);

  if (isLoading) {
    return <Loading center />;
  }

  if (events.length === 0) {
    return (
      <Wrapper>
        <h2>Der er ikke registeret arbejd i perioden...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {events.map((event) => {
          return <UpdateEvent key={event.id} {...event} />;
        })}
      </div>
    </Wrapper>
  );
};
export default EditEvent;
