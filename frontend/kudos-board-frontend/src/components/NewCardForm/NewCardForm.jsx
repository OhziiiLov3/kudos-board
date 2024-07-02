import {useState} from 'react';
import { searchGifs } from '../../services/gifApi';
import { createCard } from '../../services/CardApi';
import '../NewCardForm/NewCardForm.css';

const NewCardForm = ({boardId, onCardCreated}) => {
    const [formData, setFormData] = useState({
        message: "",
        gifUrl : "",
        author : "",
      });
   const [gifs, setGifs] = useState([]);

      const handleGifSearch = async (query) =>{
        const response = await searchGifs(query);
        setGifs(response.data.data || [])
      }
    
    
    const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.name] : e.target.value,
      });
    };
    console.log(formData);
    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createCard({...formData, boardId});
        onCardCreated();
      } catch (error) {
        console.error("Error creating space:", error);
      }
    };
      return (
        <div className="form-container">
          <h2>Send a Card</h2>
       <form onSubmit={handleSubmit}>
       <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleChange}/>
       <input type="text" placeholder=" Search Gifs"  onChange={(e)=> handleGifSearch(e.target.value)}/>
       <textarea type="text" placeholder="Message" name="message" value={formData.message}  onChange={handleChange}/>
      <div>
        {gifs.map((gif) => (
          <img  key={gif.id} src={gif.images.fixed_height.url} alt="gif" onClick={()=> setFormData({...formData, gifUrl: gif.images.fixed_height.url})}/>
        ))}
      </div>

       <button type="submit">Submit</button>
       </form>
        </div>
      );
}

export default NewCardForm
