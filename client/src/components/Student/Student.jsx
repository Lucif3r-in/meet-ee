import React, { useState } from "react";
import "./Student.css";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Student = ({
  _id,
  name,
  email,
  rollnumber,
  profilePhoto,
  removeStudent,
  github,
  linkedin,
  twitter,
  instagram,
  about,
  areaOfInterest,
  internshipExperiences,
  achievements,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveStudent = () => {
    removeStudent(_id);
  };

  return (
    <>
      <div className="Student-Box" onClick={openModal}>
        <div className="Student-Box-Content">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="Student-Box-Photo"
            />
          ) : (
            <Avatar
              name={name}
              size="100"
              round={true}
              className="Student-Box-Photo"
            />
          )}
          <p className="Student-Box-Name">{name}</p>
          <p className="Student-Box-Enroll">{rollnumber}</p>
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
      </div>

      {isModalOpen && (
        <div className="Student-Modal-Backdrop">
          <div className="Student-Modal">
            <div className="Student-Modal-Left">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="Profile-Photo"
                />
              ) : (
                <div className="Default-Profile-Photo">{name.charAt(0)}</div>
              )}
              <p className="Modal-Name">{name}</p>
              <p className="Modal-Roll">{rollnumber}</p>
            </div>
            <div className="Student-Modal-Right">
              <div className="Modal-Section">
                <h2>About</h2>
                <p>{about}</p>
              </div>
              <div className="Modal-Section">
                <h2>Area of Interest</h2>
                <p>{areaOfInterest}</p>
              </div>
              <div className="Modal-Section">
                <h2>Internship Experiences</h2>
                <p>{internshipExperiences}</p>
              </div>
              <div className="Modal-Section">
                <h2>Achievements</h2>
                <p>{achievements}</p>
              </div>
              <div className="Modal-Section">
                <h2>Contact</h2>
                {email && <p>Email: {email}</p>}
                {github && <p>Github: {github}</p>}
                {linkedin && <p>Linkedin: {linkedin}</p>}
                {twitter && <p>Twitter: {twitter}</p>}
                {instagram && <p>Instagram: {instagram}</p>}
              </div>
            </div>
            <button className="Modal-Close" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Student;
