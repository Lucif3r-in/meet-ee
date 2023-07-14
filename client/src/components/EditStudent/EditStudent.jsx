import React, { useState, useEffect } from "react";
import "./EditStudent.css";
import axios from "axios";
import { withRouter } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStudent = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollnumber, setRollNumber] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const search = props.location.search;
        const id = search.substring(1, search.length);
        const updateStudent = await axios(`/api/students/${id}`);
        const { name, email, rollnumber } = updateStudent.data.student;
        setId(id);
        setName(name);
        setEmail(email);
        setRollNumber(rollnumber);
      } catch (err) {
        setResponse("Student not found!");
      }
    };

    fetchData();
  }, [props.location.search]);

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

  const updateStudentHandler = async (e) => {
    e.preventDefault();
    try {
      const student = await axios.put(`/api/students/${id}`, {
        name,
        email,
        rollnumber,
      });
      toast(student.data.message, { type: toast.TYPE.INFO, autoClose: 3000 });
    } catch (err) {
      toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
    }
  };

  if (response === "Student not found!") {
    return <h1>Student not found!</h1>;
  }

  return (
    <div className="Edit-Student-Wrapper">
      <h1>Edit page</h1>
      <form onSubmit={updateStudentHandler}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          placeholder="Name..."
          value={name}
          name="name"
          onChange={onChangeHandler}
          required
          className="Edit-Student-Input"
          id="name"
        />
        <label htmlFor="email">
          Email: <b>(must be a valid email)</b>
        </label>
        <input
          type="email"
          placeholder="Enter your email here"
          value={email}
          name="email"
          required
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="email"
        />
        <label htmlFor="rollnumber">Enrollment Number: </label>
        <input
          type="text"
          placeholder="Enter the student's enrollment number"
          value={rollnumber}
          name="rollnumber"
          required
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="rollnumber"
        />
        <button
          type="submit"
          className="Edit-Student-Submit fa fa-pencil"
        ></button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default withRouter(EditStudent);
