

import "./NewSpaceForm.css"; 

const NewSpaceForm = () => {
  return (
    <div className="form-container">
      <h2>Create a Hi-Five</h2>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Message" rows="4"></textarea>
      <button type="submit">Submit</button>
    </div>
  );
};

export default NewSpaceForm;
