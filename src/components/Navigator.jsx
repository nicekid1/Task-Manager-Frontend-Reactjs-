import { Link } from "react-router-dom";
const Navigator = () => {
  return (
    <ul>
      <li>
        <Link to="/">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
    </ul>
  );
};

export default Navigator;