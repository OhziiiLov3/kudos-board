import { FaRegTrashCan } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import { useState, useEffect } from "react";
import { addComment, deleteComment, getComments } from "../../services/CardApi";

import '../Card/Card.css'


const Card = ({ card, onUpvote, onDelete }) => {
  const { title, message, gifUrl, author, upvotes,card_id, space_id} = card;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

 useEffect(() => {
  if(showComments){
    fetchComments();
  }
 }, [showComments]);

 
 const fetchComments = async () =>{
 try {
  const commentsData = await getComments(space_id,card_id);
  setComments(commentsData);
 } catch (error) {
  console.error('Error fetching comments:', error);
 }
 };


 const handleAddComment = async () =>{
if(!newComment) return;
try {
  await addComment(space_id,card_id, {content: newComment, author: "User 002"})
  setNewComment("");
  fetchComments();
} catch (error) {
  console.error('Error adding comment:', error);
}
 };

 const handleDeleteComment = async (commentId) =>{
 try {
  await deleteComment(space_id,card_id, commentId);
  fetchComments();
  console.log("delete Comment", commentId);
 } catch (error) {
  console.error('Error deleting comment:', error);
 }
 };

 const toggleComments = () =>{
  setShowComments(!showComments);
 }


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
      
    {  showComments && (
      <div className="comments-list">
        {comments.length > 0 ? comments.map(comment=>(
          <div className="comment" key={comment.comment_id}>
            <p>{comment.content}</p>
            <small>By: {comment.author}</small>
            <button className="delete-button" onClick={()=> handleDeleteComment(comment.comment_id)}>Delete</button>
          </div>
        )): <p>No comments yet.</p>}
      </div>
        )}
      <div className="comments-section">
        <input 
        type="text" 
        placeholder="Add a Comment"
        value={newComment}
        onChange={(e)=> setNewComment(e.target.value)}
        />
               <button className="filter-btn" onClick={handleAddComment}>Add Comment</button>
               <button className="filter-btn" onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

    </div>
  );
};

export default Card;
