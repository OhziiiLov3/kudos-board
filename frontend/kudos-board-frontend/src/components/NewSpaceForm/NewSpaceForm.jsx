import {useState} from 'react';
import { createSpace } from '../../services/SpaceApi';
import "./NewSpaceForm.css"; 

const NewSpaceForm = ({fetchSpaces, toggleForm}) => {
  const [formData, setFormData] = useState({
    title: "",
    author : "",
    category : "",
  })


const handleChange = (e) =>{
  const {name, value} = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
console.log(formData);


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createSpace(formData);
    fetchSpaces();
    toggleForm(); 
  } catch (error) {
    console.error("Error creating space:", error);
  }
};
  return (
    <div className="form-container">
      <h2>Create a Hi-Five</h2>
<<<<<<< HEAD
      <input type="text" placeholder="Title" />
      <input type="text" placeholder="Author" />
      <select name="" id="">
        <option value="">Select a category</option>
        <option value="">All</option>
        <option value="">Recent</option>
        <option value="">Encouragement</option>
        <option value="">Thank you</option>
        <option value="">Inspiration</option>
      </select>
      <textarea placeholder="Message" rows="4"></textarea>
      <button type="submit">Submit</button>
=======
   <form onSubmit={handleSubmit}>
   <input type="text" placeholder="Title" name="title" value={formData.title}  onChange={handleChange}/>
   <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleChange}/>
   <select name="category" value={formData.category}  onChange={handleChange} >
    <option value="">Select a category</option>
    {/* <option value="All">All</option>
    <option value="Recent">Recent</option> */}
    <option value="Encouragement">Encouragement</option>
    <option value="Thank you">Thank you</option>
    <option value="Inspiration">Inspiration</option>
  </select>
   <button type="submit">Submit</button>
   </form>
>>>>>>> 71f4dc1b81099b9241d02dd5d99b9fcba5bc50ed
    </div>
  );
};

export default NewSpaceForm;
