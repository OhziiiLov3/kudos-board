import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import Header from "../Header/Header";
import NewSpaceForm from "../NewSpaceForm/NewSpaceForm";
import { getSpaces } from "../../services/SpaceApi";

const Dashboard = () => {
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilterSpaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const spaces = await getSpaces();
      setSpaces(spaces);
      setFilterSpaces(spaces);
      console.log(spaces);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  
  // modal pop up
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const searchInput = e.target.value;
    setSearchQuery(searchInput);
    filterSpaces(searchInput);
  }

  const filterSpaces = (searchInput) =>{
    const filtered = spaces.filter((space) =>
      space.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilterSpaces(filtered)
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Hi-Fives..."
          value={searchQuery}
          onChange={handleInputChange}
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
            <NewSpaceForm fetchSpaces={fetchSpaces}  toggleForm={toggleForm}/>
          </div>
        </div>
      )}
      <section className="space-grid">
      {filteredSpaces.map((space,idx) => (
          <div className="space-preview" key={idx}>
            <img src={`https://picsum.photos/200/300?random${space.space_id}`} alt="" />
            <h3>{space.title}</h3>
            <p>{space.category}</p>
            <div className="btn-container">
              <a href={`/board/${space.space_id}`}>See Space</a>
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
