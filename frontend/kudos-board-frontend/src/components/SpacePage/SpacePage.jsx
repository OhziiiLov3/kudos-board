import {useState, useEffect} from 'react'
import { getSpace } from '../../services/SpaceApi';
import Header from "../Header/Header";
import "../SpacePage/SpacePage.css";
import { FaArrowLeft } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom'

const SpacePage = () => {
  const [space, setSpace] = useState(null);
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
  }

  return (
    <div>
      <div className="space-card-container">
        <Link to='/' className="back-link">
      <FaArrowLeft />
        </Link>
        <Header />
        <div className="create-card-container">
          <button className="create-card-btn filter-btn">
            Create a Card
          </button>
        </div>
        {space ? (
              <div>

              <h1>{space.title}</h1>
              <h1>{space.author}</h1>
              <h1>{space.category}</h1>
              </div>
            ): (

            <p>Loading...</p>
            )}
      </div>
    </div>
  );
};

export default SpacePage;
