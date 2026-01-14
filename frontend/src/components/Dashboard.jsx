import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    localStorage.removeItem("user");  // remove user info
    navigate("/"); // back to page containing navbar with login/register
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Welcome to Dashboard 🎉</h2>
      <p>You have successfully logged in!</p>

      
    </div>
  );
}
