import { Suspense } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/hooks";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";

import "./Home.css";

export const Home = () => {
  const { username } = useCurrentUser() || {};

  return (
    <div className="app__home">
      <Suspense fallback={<Loader />}>
        <div className="app__home-header">
          <h1 className="app__home-header-1">
            Unlimited movies, TV shows, and more.
          </h1>
          <h1 className="app__home-header-2">
            {" "}
            Watch anywhere. Cancel anytime.
          </h1>
        </div>
        <h2>Welcome, {username || "stranger"}!</h2>
        <Link to="/movies">
          <Button buttonName="Start your journey" />
        </Link>
      </Suspense>
    </div>
  );
};
