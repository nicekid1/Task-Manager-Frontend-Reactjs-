import { Link } from "react-router-dom";
import styles from './../styles/nav.module.css'
const Navbar = () => {
  return (
    <ul className={styles}>
      <li>
        <Link to="/register">Register</Link>
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

export default Navbar;