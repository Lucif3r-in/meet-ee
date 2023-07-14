import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav className="NavBar-Wrapper">
      <Link to="/" className="NavBar-Link">
        <h3 className="NavBar-Title">Electrical Students</h3>
      </Link>
      <div className="NavBar-Links">
        <Link to="/" className="NavBar-Link">
          Home
        </Link>
        <Link to="/add" className="NavBar-Link">
          Add
        </Link>
      </div>
    </nav>
  );
};

export default Home;
