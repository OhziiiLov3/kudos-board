

const Card = () => {
    const {title, message, gif, author} = card;
  return (
    <div className="card">
       <h3>{title}</h3>
      <p>{message}</p>
      <img src={gif} alt="GIF" />
      <p>{author}</p>
      <button className='upvote-button' onClick={handleUpvote}>Upvote: {votes}</button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

export default Card
