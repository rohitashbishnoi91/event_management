import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Event Manager</h1>
      <p>Join or create events easily.</p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button style={{ backgroundColor: "green" }}>Register</button>
      </Link>
    </div>
  );
};

export default Home;
