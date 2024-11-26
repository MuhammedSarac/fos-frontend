import Wrapper from "../assets/wrappers/TodoInfo";

const TodoInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon} </span>
      <span className="text">{text} </span>
    </Wrapper>
  );
};

export default TodoInfo;
