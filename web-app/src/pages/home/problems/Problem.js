import "./Problem.css";
import Problem1 from "../../../assets/problem1.jpg";
import Problem2 from "../../../assets/problem2.png";
import Problem3 from "../../../assets/problem3.jpeg";

const Problem = () => {
  return (
    <div className="problem__container">
      <div className="problem__sectionHeading d-flex flex-column align-items-center justify-content-cente">
        <p className="my-0">What We Solve ?</p>
        <div className="problem__borderDiv"></div>
      </div>
      <div className="problem__infoTextHeading d-flex justify-content-center"><p>About Alveoli</p></div>
      <div className="problem__containerDiv">
        <div className="problem__cardsDiv  card" style={{ width: "22rem" }}>
          <img src={Problem1} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center fs-3">Early Detection</h5>
            <p className="card-text">
              Early Detection without the need of a doctor which helps in saving millions of lives.
            </p>
          </div>
        </div>


        <div className="problem__cardsDiv  card" style={{ width: "22rem" }}>
          <img src={Problem2} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center fs-3">Faster Results</h5>
            <p className="card-text">
              Able to detect Covid-19 faster than most RTPCR tests within seconds.
            </p>
          </div>
        </div>


        <div className="problem__cardsDiv  card" style={{ width: "22rem" }}>
          <img src={Problem3} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-center fs-3">Ease of Access</h5>
            <p className="card-text">
              Readily available to any patient in the world with a click of a button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
