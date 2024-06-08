import {useState} from 'react'
import "../Dashboard/Dashboard.css"
import Header from "../Header/Header"
import NewSpaceForm from "../NewSpaceForm/NewSpaceForm"

const Dashboard = () => {
const [searchQuery, setSearchQuery] = useState("")
const [showForm, setShowForm] = useState(false);
  
 const toggleForm = () => {
   setShowForm(!showForm);
   console.log("Working");
 };

console.log(searchQuery);


  return (
    <div className="dashboard">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Hi-Fives..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="category-btns">
        <button className="filter-btn">All</button>
        <button className="filter-btn">Recent</button>
        <button className="filter-btn">Encouragement</button>
        <button className="filter-btn">Thank You</button>
        <button className="filter-btn">Inspiration</button>
      </div>
      <div className="create-five-container">
        <button className="create-five-btn filter-btn" onClick={toggleForm}>
          Create a Hi-Five
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={toggleForm}>
              &times;
            </span>
            <NewSpaceForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard