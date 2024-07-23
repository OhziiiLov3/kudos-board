import { FaRegTrashCan } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import { useState, useEffect } from "react";
import { addComment, deleteComment, getComments } from "../../services/CardApi";
import { getCurrentUser, getUserById } from "../../services/UserApi";
import { FaRegUserCircle } from "react-icons/fa";
import "../Card/Card.css";

const Card = ({ card, onUpvote, onDelete }) => {
  const { title, message, gifUrl, upvotes, card_id, space_id, authorId } = card;
  console.log(card);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [showComments]);

  useEffect(() => {
    fetchCurrentUser();
    fetchAuthorDetails();
  }, [authorId]);

  const fetchCurrentUser = async () => {
    try {
      const userData = await getCurrentUser();
      console.log("Fetched Current User:", userData);
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchAuthorDetails = async () => {
    try {
      const authorData = await getUserById(authorId);
      console.log("Fetched Author Details:", authorData);
      setAuthor(authorData);
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getComments(space_id, card_id);
      console.log("Comment Data", commentsData);
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment || !currentUser) return;
    try {
      const { username, user_id } = currentUser;
      await addComment(space_id, card_id, {
        content: newComment,
        author: username,
        authorId: user_id,
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(space_id, card_id, commentId);
      fetchComments();
      console.log("delete Comment", commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Helper function to determine if current user can delete
  const canDelete = (itemAuthorId) =>
    currentUser && currentUser.user_id === itemAuthorId;

  return (
    <div className="comment-card-container">
      <div className="comment-card">
        <h3>{title}</h3>
        <div className="card-content">
          {gifUrl && <img src={gifUrl} alt="GIF" />}
          <div className="author-info">
          <FaRegUserCircle className="user-icon" />
        <p>{author ? author.username : "Unknown"}</p>
      </div>
          <p className="card-message"> {message}</p>
        </div>
        <div className="card-footer">
          <button className="upvote-button" onClick={() => onUpvote(card_id)}>
            {" "}
            <SlLike className="like-icon" /> {upvotes}
          </button>
          {canDelete(authorId) && (
            <button className="delete-button" onClick={() => onDelete(card_id)}>
              <FaRegTrashCan />
            </button>
          )}
        </div>
        {showComments && (
          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="comment" key={comment.comment_id}>
                  <p>{comment.content}</p>
                  <small>By: {comment.author.username}</small>
                  {canDelete(comment.authorId) && (
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteComment(comment.comment_id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        )}
        <div className="comments-section">
          <input
            type="text"
            placeholder="Add a Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="comment-btn-container">
            <button className="add-comment-btn" onClick={handleAddComment}>
              Add Comment
            </button>
            <button className="delete-comment-btn" onClick={toggleComments}>
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
