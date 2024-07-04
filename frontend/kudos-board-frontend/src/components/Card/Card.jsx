
import '../Card/Card.css'


const Card = ({ card, onUpvote, onDelete }) => {
  const { title, message, gifUrl, author, upvotes,card_id } = card;
  return (
    <div className="card"  >
      <h3>{title}</h3>
      {gifUrl && <img src={gifUrl} alt="GIF" />}
      <p>{message}</p>
      <p>{author}</p>
      <button className='upvote-button' onClick={() => onUpvote(card_id)}>Vote: {upvotes}</button>
      <button className="delete-button" onClick={() => onDelete(card_id)}>Delete</button>
    </div>
  );
};

export default Card;
