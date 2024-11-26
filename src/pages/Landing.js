import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
// import { Logo } from '../components';
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>{/* <Logo /> */}</nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Family <span>organizing</span> system
          </h1>
          <p>
            Stay organized and connected with Family Organizer, your all-in-one
            solution for managing family activities and tasks. Designed to
            simplify family coordination, Family Manager provides: Shared Family
            Calendar: Keep track of important dates, events, and appointments
            with a centralized calendar that the whole family can access. Plan
            family gatherings, schedule activities, and never miss a moment!
            Personalized To-Do Lists: Assign tasks to individual family members
            with our easy-to-use to-do list feature. Keep everyone on track with
            reminders and progress tracking for personal and family
            responsibilities. Streamline your family's daily routines, foster
            better communication, and enjoy more quality time together with
            Family Organizer!
          </p>
          <Link to="/register" className="btn btn-hero">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
