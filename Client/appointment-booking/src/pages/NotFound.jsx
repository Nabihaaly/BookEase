import { useNavigate } from "react-router-dom";

// ============== NotFound.jsx ==============
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}