import Header from "../Header/Header";
import "../SpacePage/SpacePage.css";
import { FaArrowLeft } from "react-icons/fa";
import {Link} from 'react-router-dom'

const SpacePage = () => {
  return (
    <div>
      <div className="space-card-container">
        <Link to='/' className="back-link">
      <FaArrowLeft />
        </Link>
        <Header />
        <div className="create-card-container">
          <button className="create-card-btn filter-btn">
            Create a Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpacePage;
