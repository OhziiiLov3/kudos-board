import { FaRegTrashCan } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";

import '../Card/Card.css'


const Card = ({ card, onUpvote, onDelete }) => {
  const { title, message, gifUrl, author, upvotes,card_id } = card;
  return (
    <div className="card"  >
      <h3>{title}</h3>
      {gifUrl && <img src={gifUrl} alt="GIF" />}
      <p>{message}</p>
      <p><strong>By:</strong>{author}</p>
      <button className='upvote-button' onClick={() => onUpvote(card_id)}> <SlLike />  {upvotes}</button>
      <button className="delete-button" onClick={() => onDelete(card_id)}>
      <FaRegTrashCan/>
      </button>
    </div>
  );
};

export default Card;
