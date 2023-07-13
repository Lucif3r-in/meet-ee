import React, { useState } from "react";
import "./AddStudent.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollnumber, setRollNumber] = useState("");

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "rollnumber") {
      setRollNumber(value);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await axios.post("/api/students/", {
        name,
        email,
        rollnumber,
      });

      toast(
        "Student " + newStudent.data.newStudent.name + " created successfully",
        { type: toast.TYPE.SUCCESS, autoClose: 3000 }
      );
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  return (
    <div className="AddStudent-Wrapper">
      <h1>Add Student:</h1>
      <form onSubmit={addStudent}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Enter the name of the students here"
          name="name"
          onChange={onChangeHandler}
          value={name}
          className="Add-Student-Input"
          required
          minLength="3"
          maxLength="33"
          id="name"
        />
        <label htmlFor="email">
          email: <b>(must be a valid email)</b>
        </label>
        <input
          type="text"
          placeholder="enter your email here"
          name="email"
          onChange={onChangeHandler}
          value={email}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          className="Add-Student-Input"
          required
          id="email"
        />
        <label htmlFor="rollnumber">Enrollment Number: </label>
        <input
          type="text"
          placeholder="121EEXXXX"
          name="rollnumber"
          pattern="^121EE\d{4}$"
          onChange={onChangeHandler}
          value={rollnumber}
          className="Add-Student-Input"
          required
          id="rollnumber"
        />

        <button
          type="submit"
          className="Add-Student-Submit fa fa-plus"
        ></button>
        <button
          type="reset"
          className="Add-Student-Reset fa fa-refresh"
        ></button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddStudent;
