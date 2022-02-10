import LandingPage from "./landingPage/LandingPage";
import "./Home.css";
import About from "./about/About";
import { Fragment } from "react";
import Categories from "./categories/Categories";

const Home = () => {
  return (
    <Fragment>
      <LandingPage />
      <About />
      <Categories />
    </Fragment>
  );
};

export default Home;
