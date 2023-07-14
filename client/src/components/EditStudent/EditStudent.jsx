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
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [about, setAbout] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [internshipExperiences, setInternshipExperiences] = useState("");
  const [achievements, setAchievements] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const search = props.location.search;
        const id = search.substring(1, search.length);
        const updateStudent = await axios(`/api/students/${id}`);
        const {
          name,
          email,
          rollnumber,
          github,
          linkedin,
          twitter,
          instagram,
          about,
          areaOfInterest,
          internshipExperiences,
          achievements,
        } = updateStudent.data.student;
        setId(id);
        setName(name);
        setEmail(email);
        setRollNumber(rollnumber);
        setGithub(github);
        setLinkedin(linkedin);
        setTwitter(twitter);
        setInstagram(instagram);
        setAbout(about);
        setAreaOfInterest(areaOfInterest);
        setInternshipExperiences(internshipExperiences);
        setAchievements(achievements);
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
    } else if (name === "github") {
      setGithub(value);
    } else if (name === "linkedin") {
      setLinkedin(value);
    } else if (name === "twitter") {
      setTwitter(value);
    } else if (name === "instagram") {
      setInstagram(value);
    } else if (name === "about") {
      setAbout(value);
    } else if (name === "areaOfInterest") {
      setAreaOfInterest(value);
    } else if (name === "internshipExperiences") {
      setInternshipExperiences(value);
    } else if (name === "achievements") {
      setAchievements(value);
    }
  };

  const updateStudentHandler = async (e) => {
    e.preventDefault();
    try {
      const student = await axios.put(`/api/students/${id}`, {
        name,
        email,
        rollnumber,
        github,
        linkedin,
        twitter,
        instagram,
        about,
        areaOfInterest,
        internshipExperiences,
        achievements,
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
        <label htmlFor="github">Github: </label>
        <input
          type="text"
          placeholder="Enter your Github link"
          value={github}
          name="github"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="github"
        />
        <label htmlFor="linkedin">Linkedin: </label>
        <input
          type="text"
          placeholder="Enter your Linkedin link"
          value={linkedin}
          name="linkedin"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="linkedin"
        />
        <label htmlFor="twitter">Twitter: </label>
        <input
          type="text"
          placeholder="Enter your Twitter link"
          value={twitter}
          name="twitter"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="twitter"
        />
        <label htmlFor="instagram">Instagram: </label>
        <input
          type="text"
          placeholder="Enter your Instagram link"
          value={instagram}
          name="instagram"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="instagram"
        />
        <label htmlFor="about">About: </label>
        <textarea
          placeholder="Enter a short description about yourself"
          value={about}
          name="about"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="about"
          required
          minLength="10"
          maxLength="500"
        ></textarea>
        <label htmlFor="areaOfInterest">Area of Interest: </label>
        <textarea
          placeholder="Enter your area of interest"
          value={areaOfInterest}
          name="areaOfInterest"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="areaOfInterest"
          required
          minLength="10"
          maxLength="500"
        ></textarea>
        <label htmlFor="internshipExperiences">Internship Experiences:</label>
        <textarea
          placeholder="Enter your internship experiences"
          value={internshipExperiences}
          name="internshipExperiences"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="internshipExperiences"
        ></textarea>
        <label htmlFor="achievements">Achievements:</label>
        <textarea
          placeholder="Enter your achievements"
          value={achievements}
          name="achievements"
          onChange={onChangeHandler}
          className="Edit-Student-Input"
          id="achievements"
        ></textarea>
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
