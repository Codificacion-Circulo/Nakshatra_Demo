import {useHistory} from 'react-router-dom';
import "./LandingPage.css";

// assets imports
import landingPageBg from "../../../assets/laptop-work.jpg";

const LandingPage = () => {
  const history = useHistory()
  return (
    <div className="landingPage__container">
      <div className="landingPage__rowContainer row">
        <div className="landingPage__bgContainer col-lg-8 col-md-7 col-sm-6">
          <img src={landingPageBg} alt="Background image" />
        </div>
        <div className="landingPage__bgInfoContainer col-lg-4 col-md-5 col-sm-6 d-flex justify-content-center align-items-center">
          <div className="landingPage__bgInfo d-flex flex-column  justify-content-center">
            <div className="landingPage__smallPHeading">
              <p>Reliabe and Accessible to all</p>
            </div>
            <div className="landingPage__heading">Alice Hope MD</div>
            <div className="landingPage__subHeading">
              <p>Online Medical Services</p>
            </div>
            <div className="landingPage__checkBtn">
                <button onClick={() => {history.push("/upload")}}>Check your X-ray</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
