import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard/Dashboard.css";
import Header from "../Header/Header";
import NewSpaceForm from "../NewSpaceForm/NewSpaceForm";
import { getSpaces, deleteSpace } from "../../services/SpaceApi";


const Dashboard = ({openLoginModal, isLoggedIn, username, handleLogout, handleLogin}) => {
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilterSpaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      fetchSpaces();
  }, []);
  

  const fetchSpaces = async () => {
    try {
      const spaces = await getSpaces();
      setSpaces(spaces);
      setFilterSpaces(spaces);
    } catch (error) {
      console.error("Error fetching boards:", error);
    }
  };

  // Handle space deletion
  const handleDeleteSpace = async (id) => {
    try {
      await deleteSpace(id);
      // Remove the deleted space from the state
      const updatedSpaces = spaces.filter((space) => space.space_id !== id);
      setSpaces(updatedSpaces);
      setFilterSpaces(updatedSpaces);
    } catch (error) {
      console.error("Error deleting space:", error);
    }
  };

  // modal pop up
  const toggleForm = () => {
    const isLoggedIn = localStorage.getItem('token');
    if(isLoggedIn){
      setShowForm(!showForm);
    }else{
      openLoginModal();
    }
  };
  // Handle space link click
  const handleSpaceLinkClick = (spaceId) => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      navigate(`/spaces/${spaceId}`);
    } else {
      openLoginModal();
    }
  };


  const handleInputChange = (e) => {
    const searchInput = e.target.value;
    setSearchQuery(searchInput);
    filterSpaces(searchInput);
  };

  const filterSpaces = (searchInput) => {
    const filtered = spaces.filter(
      (space) =>
        space.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        space.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        space.author.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilterSpaces(filtered);
  };

  const handleCategoryClick = (category) => {
    if (category === "All") {
      setFilterSpaces(spaces);
    } else if (category === "Recent") {
      const sortedByDate = [...spaces].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilterSpaces(sortedByDate);
    } else {
      const filtered = spaces.filter((space) => space.category === category);
      setFilterSpaces(filtered);
    }
  };

  return (
    <div className="dashboard">
      <Header isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout}  handleLogin={handleLogin} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Hi-Fives..."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div className="category-btns">
        <button
          className="filter-btn"
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>
        <button
          className="filter-btn"
          onClick={() => handleCategoryClick("Recent")}
        >
          Recent
        </button>
        <button
          className="filter-btn"
          onClick={() => handleCategoryClick("Encouragement")}
        >
          Encouragement
        </button>
        <button
          className="filter-btn"
          onClick={() => handleCategoryClick("Thank you")}
        >
          Thank You
        </button>
        <button
          className="filter-btn"
          onClick={() => handleCategoryClick("Inspiration")}
        >
          Inspiration
        </button>
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
            <NewSpaceForm fetchSpaces={fetchSpaces} toggleForm={toggleForm} />
          </div>
        </div>
      )}
      <section className="space-grid">
        {filteredSpaces.map((space, idx) => (
          <div className="space-preview" key={idx}>
            <img
              src={space.stickerUrl || `https://picsum.photos/200/200?random${space.space_id}`}
              alt=""
            />
            <h3>{space.title}</h3>
            <p>{space.category}</p>
            <div className="btn-container">
              <a href={`/spaces/${space.space_id}`} onClick={(e) => {
                  e.preventDefault(); 
                  handleSpaceLinkClick(space.space_id);
                }}>See Space</a>
              <button
                className="board-card btn filter-btn"
                onClick={() => handleDeleteSpace(space.space_id)}
              >
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
