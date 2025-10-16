import { useNavigate } from "react-router-dom";

// ============== Unauthorized.jsx ==============
export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>403 - Unauthorized Access</h1>
      <p>You don't have permission to access this page.</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}