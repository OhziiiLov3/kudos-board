import {useState, useEffect} from 'react'
import { getSpace } from '../../services/SpaceApi';
import { deleteCard,  upvoteCard, getCards  } from '../../services/CardApi';
import Header from "../Header/Header";
import "../SpacePage/SpacePage.css";
import { FaArrowLeft } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom'
import NewCardForm from '../NewCardForm/NewCardForm';
import Card from '../Card/Card';




const SpacePage = () => {
  const [space, setSpace] = useState(null);
  const [openCardForm , setOpenCardForm ] = useState(false)
  const {id} = useParams();
  const [cards, setCards] = useState([]);


  useEffect(()=>{
    fetchSpace();
    fetchCards()
  },[]);


  const fetchSpace = async () =>{
    try {
      const response = await getSpace(id);
      setSpace(response);
    } catch (error) {
      console.error('Error fetching space:', error);
    }
  };

  const fetchCards = async () => {
    try {
      const cardsData = await getCards(id);
      // const sortedCards = cardsData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
        <Header />
        { space ?  <h1>{space.title}</h1> : <p>Loading</p> }
        <div className="create-card-container">
          <button className="create-card-btn filter-btn" onClick={()=> setOpenCardForm((true))}>
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
