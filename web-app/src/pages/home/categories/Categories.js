import { useHistory } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const history = useHistory()
  return (
    <div className="categories__container d-flex flex-column align-items-center justify-content-center">
      <div className="categories__sectionHeading d-flex flex-column align-items-center justify-content-center">
        <p className="my-0">How Can We Help You?</p>
        <div className="categories__borderDiv"></div>
      </div>
      <div className="categories__categoryHeading">
        <p>Prediction Categories</p>
      </div>
      <div className="categories__predictionBox">
        <div className="categories__rowContainer row">
          <div className="categories__columnContainerDiv col d-flex">
            <p className="categories__serialInfo my-0">1</p>
            <p className="categories__name mb-0">Covid</p>
          </div>
          <div class="categories__columnContainerDiv col d-flex">
            <p className="categories__serialInfo my-0">2</p>
            <p className="categories__name mb-0">Pneumonia</p>
          </div>
          <div class="categories__columnContainerDiv col d-flex">
            <p className="categories__serialInfo my-0">3</p>
            <p className="categories__name mb-0">Tuberculosis</p>
          </div>
          <div class="categories__columnContainerDiv col d-flex">
            <p className="categories__serialInfo my-0">4</p>
            <p className="categories__name mb-0">Normal</p>
          </div>
        </div>
      </div>
      <div className="categories__uploadBtn">
        <button onClick={() => {history.push("/upload")}}>Check Your X-ray</button>
      </div>
    </div>
  );
};

export default Categories;
