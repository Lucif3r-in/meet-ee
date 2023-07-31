import React, { useState } from "react";
import "./AddStudent.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
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
  const [profilePhotoLink, setProfilePhotoLink] = useState(""); // New state for profile photo link

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
    } else if (name === "internshipExperience") {
      setInternshipExperiences(value);
    } else if (name === "achievement") {
      setAchievements(value);
    } else if (name === "profilePhotoLink") {
      setProfilePhotoLink(value);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await axios.post("/api/students/", {
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
        profilePhoto: profilePhotoLink,
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
    <>
      <h1 style={{ textAlign: 'center',textShadow: '2px 2px 5px red' }}>Add Student:</h1>


      <div className="AddStudent-Wrapper">

        <form onSubmit={addStudent} className="form-item">


          <div className="formTop">
            <div className="form-right">
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
                Email: <b>(must be a valid email)</b>
              </label>
              <input
                type="email"
                placeholder="Enter your email here"
                name="email"
                onChange={onChangeHandler}
                value={email}
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
            </div>




            <div className="form-left">
              <label htmlFor="github">Github: </label>
              <input
                type="text"
                placeholder="Enter your Github link"
                name="github"
                onChange={onChangeHandler}
                value={github}
                className="Add-Student-Input"
                id="github"
              />
              <label htmlFor="linkedin">Linkedin: </label>
              <input
                type="text"
                placeholder="Enter your Linkedin link"
                name="linkedin"
                onChange={onChangeHandler}
                value={linkedin}
                className="Add-Student-Input"
                id="linkedin"
              />
              <label htmlFor="twitter">Twitter: </label>
              <input
                type="text"
                placeholder="Enter your Twitter link"
                name="twitter"
                onChange={onChangeHandler}
                value={twitter}
                className="Add-Student-Input"
                id="twitter"
              />
              <label htmlFor="instagram">Instagram: </label>
              <input
                type="text"
                placeholder="Enter your Instagram link"
                name="instagram"
                onChange={onChangeHandler}
                value={instagram}
                className="Add-Student-Input"
                id="instagram"
              />
            </div>

          </div>




          <div className="form-bottom">
            <label htmlFor="about">About: </label>
            <textarea
              placeholder="Enter a short description about yourself"
              name="about"
              onChange={onChangeHandler}
              value={about}
              className="Add-Student-Input"
              id="about"
              required
              minLength="10"
              maxLength="500"
            ></textarea>
            <label htmlFor="areaOfInterest">Area of Interest: </label>
            <textarea
              placeholder="Enter your area of interest"
              name="areaOfInterest"
              onChange={onChangeHandler}
              value={areaOfInterest}
              className="Add-Student-Input"
              id="areaOfInterest"
              required
              minLength="10"
              maxLength="500"
            ></textarea>
            <label htmlFor="internshipExperience">Internship Experiences:</label>
            <textarea
              placeholder="Enter your internship experiences"
              name="internshipExperience"
              onChange={onChangeHandler}
              value={internshipExperiences}
              className="Add-Student-Input"
              id="internshipExperience"
            ></textarea>
            <label htmlFor="achievement">Achievements:</label>
            <textarea
              placeholder="Enter your achievements"
              name="achievement"
              onChange={onChangeHandler}
              value={achievements}
              className="Add-Student-Input"
              id="achievement"
            ></textarea>
          

            <div className="btn">
              <button
                type="submit" title="ADD"
                className="Add-Student-Submit fa fa-plus"
              ></button>
              <button
                type="reset" title="RELOAD"
                className="Add-Student-Reset fa fa-refresh"
              ></button>
            </div>

          </div>





        </form>
      </div>
      <ToastContainer />
    </>

  );
};

export default AddStudent;
