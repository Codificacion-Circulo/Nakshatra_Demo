import "./LandingPage.css";

// assets imports
import landingPageBg from "../../../assets/laptop-work.jpg";

const LandingPage = () => {
  return (
    <div className="landingPage__container">
      <div className="landingPage__rowContainer row">
        <div className="landingPage__bgContainer col-8">
          <img src={landingPageBg} alt="Background image" />
        </div>
        <div className="landingPage__bgInfoContainer col-4 d-flex justify-content-center align-items-center">
          <div className="landingPage__bgInfo d-flex flex-column  justify-content-center">
            <div className="landingPage__smallPHeading">
              <p>Reliabe and Accessible to all</p>
            </div>
            <div className="landingPage__heading">Alice Hope MD</div>
            <div className="landingPage__subHeading">
              <p>Online Medical Services</p>
            </div>
            <div className="landingPage__checkBtn">
                <button>Check your X-ray</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
