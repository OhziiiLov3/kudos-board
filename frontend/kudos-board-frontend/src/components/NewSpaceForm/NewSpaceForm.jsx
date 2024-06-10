

import "./NewSpaceForm.css"; 

const NewSpaceForm = () => {
  return (
    <div className="form-container">
      <h2>Create a Hi-Five</h2>
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
    </div>
  );
};

export default NewSpaceForm;
