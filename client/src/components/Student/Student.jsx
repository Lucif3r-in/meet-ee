import React from "react";
import "./Student.css";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Student = ({ _id, name, email, rollnumber, removeStudent }) => {
  return (
    <div className="Student-Box">
      <div className="Student-Box-Content">
        <p className="Student-Box-Name">{name}</p>
        <p className="Student-Box-Email">{email}</p>
        <p className="Student-Box-Enroll">{rollnumber}</p>
      </div>
      <div className="Student-Box-Actions">
        <button
          onClick={() => removeStudent(_id)}
          className="Action-Button fa fa-trash"
        ></button>
        <Link to={{ pathname: "/edit", search: _id }}>
          <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </div>
    </div>
  );
};

export default Student;
