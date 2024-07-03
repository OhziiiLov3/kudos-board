import { useState } from "react";
import { searchGifs } from "../../services/gifApi";
import { createCard } from "../../services/CardApi";
import "../NewCardForm/NewCardForm.css";

const NewCardForm = ({ spaceId, onCardCreated }) => {
  const [cardData, setCardData] = useState({
    title: "",
    message: "",
    gifUrl: "",
    author: "",
  });

  const [gifs, setGifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleGifSearch = async () => {
    console.log("Searching GIFs for query:", searchQuery);
    if (searchQuery.trim() === "") {
      setGifs([]);
      return;
    }
    try {
      const response = await searchGifs(searchQuery);
      console.log("GIF search response:", response.data);
      setGifs(response.data || []);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(cardData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCard({ ...cardData, spaceId });
      onCardCreated();
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  const handleGifSelect = (url) => {
    setCardData((prevData) => ({
      ...prevData,
      gifUrl: url,
    }));
    setGifs([]); // clear the gif results after selectig
  };
  return (
    <div className="form-container">
      <h2>Send a Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a card Title"
          name="title"
          value={cardData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder=" Search Gifs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Write a Message"
          name="message"
          value={cardData.message}
          onChange={handleChange}
        />
        <button type="button" onClick={handleGifSearch}>
          Search Gif
        </button>
        <div className="gif-results">
          {gifs.map((gif) => (
            <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt="gif"
            onClick={() => handleGifSelect(gif.images.fixed_height.url)}
            />
          ))}
        
        </div>
        <input
          type="text"
          placeholder="Author"
          name="author"
          value={cardData.author}
          onChange={handleChange}
        />

        <button className="card-btn" type="submit">
          Create Card
        </button>
      </form>
    </div>
  );
};

export default NewCardForm;
