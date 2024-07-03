import {useState, useEffect} from 'react'
import { getSpace } from '../../services/SpaceApi';
import Header from "../Header/Header";
import "../SpacePage/SpacePage.css";
import { FaArrowLeft } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom'
import NewCardForm from '../NewCardForm/NewCardForm';

const SpacePage = () => {
  const [space, setSpace] = useState(null);
  const [openCardForm , setOpenCardForm ] = useState(false)
  const {id} = useParams();

  useEffect(()=>{
    fetchSpace();
  },[]);


  const fetchSpace = async () =>{
    try {
      const response = await getSpace(id);
      setSpace(response);
    } catch (error) {
      console.error('Error fetching space:', error);
    }
  };

  const handleCardForm = () =>{
    console.log("Click")
    setOpenCardForm(false);
    fetchSpace();
  }

  return (
    <div>
      <div className="space-card-container">
        <Link to='/' className="back-link">
      <FaArrowLeft />
        </Link>
        <Header />
        { space ?  <h1>{space.title}</h1> : 
            <p>Loading...</p>}
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
    </div>
  );
};

export default SpacePage;
