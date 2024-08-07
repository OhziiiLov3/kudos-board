import {useState, useEffect} from 'react'
import { getSpace } from '../../services/SpaceApi';
import { deleteCard,  upvoteCard, getCards  } from '../../services/CardApi';
import Header from "../Header/Header";
import "../SpacePage/SpacePage.css";
import { FaArrowLeft } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom'
import NewCardForm from '../NewCardForm/NewCardForm';
import Card from '../Card/Card';




const SpacePage = ({ isLoggedIn, username, handleLogout, handleLogin }) => {
  const [space, setSpace] = useState(null);
  const [openCardForm , setOpenCardForm ] = useState(false)
  const {id} = useParams();
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    fetchSpace();
    fetchCards()
  },[id]);


  const fetchSpace = async () =>{
    try {
      const response = await getSpace(id);
      console.log(response);
      setSpace(response);
    } catch (error) {
      console.error('Error fetching space:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const cardsData = await getCards(id);
      // sort by most votes 
      const sortedCards = cardsData.sort((a, b) => b.upvotes - a.upvotes);
      setCards(sortedCards);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleCardForm = () =>{
    setOpenCardForm(false);
    fetchSpace();
    fetchCards();
  }

  const handleUpvote  = async (cardId) =>{
    try {
      const updatedCard = await  upvoteCard(id, cardId);
      setCards(cards.map(card=> (card.card_id === cardId ? updatedCard : card)))
      fetchCards();
    } catch (error) {
      console.error('Error upvoting card:', error);
    }
  }
  const handleDelete  = async (cardId) =>{
    try {
      await deleteCard(id, cardId);
      fetchCards();
    } catch (error) {
      console.error('Error upvoting card:', error);
    }
  }



  return (
    <>
      <div className="space-card-container">
        <Link to='/' className="back-link">
      <FaArrowLeft />
        </Link>
        <Header isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} handleLogin={handleLogin} />
        { space ?  <h1>{space.title}</h1> : <p>Loading</p> }
        <div className="create-card-container">
          <button className="create-card-btn" onClick={()=> setOpenCardForm((true))}>
            Create a Card
          </button>
        </div>
      </div>
      {openCardForm && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="modal-close" onClick={() => setOpenCardForm(false)}>
              &times;
            </span>
         <NewCardForm spaceId={id} onCardCreated={handleCardForm}/>
          </div>
        </div>
      )}
        {/* Display cards */}
        <div className="cards-container">
  {space && cards && cards.length > 0 ? (
    cards.map(card => (
      <Card key={card.card_id} card={card}  onUpvote={handleUpvote} onDelete={handleDelete} />
    ))
  ) : (
    <p>No cards available.</p>
  )}
</div>
    </>
  );
};

export default SpacePage;
