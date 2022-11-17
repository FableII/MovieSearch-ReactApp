import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import "./Home.css";

export const Home = () => {
  return (
    <div className="app__home">
      <Suspense fallback={<Loader />}>
        <h1 className="app__home-header">
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
        </h1>
        <Link to="/movies">
          <Button buttonName="Start your journey" />
        </Link>
      </Suspense>
    </div>
  );
};
