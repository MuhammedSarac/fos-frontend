import { FaUserPlus, FaCalendarPlus, FaCalendarAlt } from "react-icons/fa";
import { FcTodoList, FcAddRow } from "react-icons/fc";

const links = [
  { id: 1, text: "calender", path: "/", icon: <FaCalendarAlt /> },
  {
    id: 2,
    text: "add event",
    path: "addevent",
    icon: <FaCalendarPlus />,
  },
  { id: 3, text: "todo", path: "todo", icon: <FcTodoList /> },
  { id: 4, text: "add todo", path: "addtodo", icon: <FcAddRow /> },
  //   {
  //     id: 5,
  //     text: "",
  //     path: "",
  //     icon: <IoBarChartSharp />,
  //   },
  {
    id: 6,
    text: "add familymember",
    path: "addfamilymember",
    icon: <FaUserPlus />,
  },
];

export default links;
