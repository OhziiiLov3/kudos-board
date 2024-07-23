import { useNavigate } from 'react-router-dom';
import '../PageNotFound/PageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <button onClick={goHome}>Go to Home</button>
  </div>
  )
}

export default PageNotFound