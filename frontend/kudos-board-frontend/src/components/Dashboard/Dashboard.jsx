import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import Header from "../Header/Header";
import NewSpaceForm from "../NewSpaceForm/NewSpaceForm";
import { getSpaces } from "../../services/api";

const Dashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const response = await getSpaces();
      console.log(response.data.boards);
      setSpaces(response.data.boards);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  // modal pop up
  const toggleForm = () => {
    setShowForm(!showForm);
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
      <section className="space-grid">
      {spaces.map((space,idx) => (
          <div className="space-preview" key={idx}>
            <img src="https://picsum.photos/200/300?random" alt="" />
            <h3>{space.title}</h3>
            <p>{space.category}</p>
            <div className="btn-container">
              <a href={`/board/${space.board_id}`}>See Space</a>
              <button className="board-card btn filter-btn">
                Delete Space
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
