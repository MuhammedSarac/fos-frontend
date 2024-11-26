import { FaHourglassStart, FaHourglassEnd, FaStopwatch } from "react-icons/fa";
import Wrapper from "../assets/wrappers/UpdateEvent";
import moment from "moment";
import "moment/locale/da";
import EventInfo from "./EventInfo";
import UpdateEventIndex from "./UpdateEventIndex";
const UpdateEvent = ({ id, start, end, event }) => {
  moment.locale("da");
  const fra = moment(start);
  const til = moment(end);
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>Event id : {id}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <EventInfo
            icon={<FaHourglassStart />}
            text={fra.format("Do MMM YYYY, H:mm")}
          />
          <EventInfo
            icon={<FaHourglassEnd />}
            text={til.format("Do MMM YYYY, H:mm")}
          />
          <EventInfo icon={<FaStopwatch />} text={event} />
        </div>
      </div>
      <UpdateEventIndex id={id} />
    </Wrapper>
  );
};
export default UpdateEvent;
