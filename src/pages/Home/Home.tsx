import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import "./Home.css";

export const Home = () => {
  return (
    <div className="app__home">
      <h1 className="app__home-header">
        Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
      </h1>
      <Link to="/movies">
      <Button buttonName="Start your journey"/>
      </Link>
    </div>
  );
};
