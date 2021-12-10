import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Nav = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="row">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">Services</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <span>{(user?.displayName) ? (user?.displayName) : (user?.email)}</span>
          {user.email ?
            <button onClick={logOut} className="nav-item btn btn-text text-primary">Log Out</button>
            :
            <Link className="nav-link" to="/login">Login</Link>}
        </li>
      </ul>



    </div>
  );
};

export default Nav;