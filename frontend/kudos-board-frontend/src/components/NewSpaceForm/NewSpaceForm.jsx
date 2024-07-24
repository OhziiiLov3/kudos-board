import {useState, useEffect} from 'react';
import { createSpace } from '../../services/SpaceApi';
import { searchGifs } from '../../services/gifApi';
import { getCurrentUser } from '../../services/UserApi';

import "../NewSpaceForm/NewSpaceForm.css";

const NewSpaceForm = ({fetchSpaces, toggleForm}) => {
  const [formData, setFormData] = useState({
    title: "",
    author : "",
    category : "",
    stickerUrl: "",
  });

  const [ searchQuery, setSearchQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [currentUser, setCurrentUser ] = useState(null);


useEffect(()=>{
  fetchCurrentUser();
},[]);


const fetchCurrentUser = async () => {
try {
  const userData = await getCurrentUser();
  // Set current user data received from API
  setCurrentUser(userData);
} catch (error) {
  console.error('Error fetching current user:', error);
}
};



const handleChange = (e) =>{
  const {name, value} = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
console.log(formData);


const handleSearchChange = (e) =>{
 setSearchQuery(e.target.value);
};

const handleSearchGifs = async () => {
  try {
    const response = await searchGifs(searchQuery);
    setGifs(response.data);
  } catch (error) {
    console.error('Error fetching GIFs:', error);
  }
};

const handleSelectGif = (url) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    stickerUrl: url,
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if(currentUser){
      await createSpace({
        ...formData,
        author: currentUser.username,
      });
      fetchSpaces();
      toggleForm(); 
    }else{
      console.error('Current user data not available');
    }
  } catch (error) {
    console.error("Error creating space:", error);
  }
};
  return (
    <div className="form-container">
      <h2>Create a Hi-Five</h2>
      <form onSubmit={handleSubmit}>
   <input type="text" placeholder="Title" name="title" value={formData.title}  onChange={handleChange}/>
   {/* <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleChange}/> */}
   <select name="category" value={formData.category}  onChange={handleChange} >
    <option value="">Select a category</option>
    {/* <option value="All">All</option>
    <option value="Recent">Recent</option> */}
    <option value="Encouragement">Encouragement</option>
    <option value="Thank you">Thank you</option>
    <option value="Inspiration">Inspiration</option>
  </select>

  <div className="giphy-search">
          <input
            type="text"
            placeholder="Search for a sticker"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="button"  onClick={handleSearchGifs}>Search</button>
          <div className="giphy-results">
            {gifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt={gif.title}
                onClick={() => handleSelectGif(gif.images.fixed_height_small.url)}
              />
            ))}
          </div>
        </div>
        {formData.stickerUrl && (
          <div className="selected-sticker">
            <h3>Selected Sticker</h3>
            <img src={formData.stickerUrl} alt="Selected Sticker" />
          </div>
        )}
   <button type="submit" >Submit</button>
   </form>
    </div>
  );
};

export default NewSpaceForm;
