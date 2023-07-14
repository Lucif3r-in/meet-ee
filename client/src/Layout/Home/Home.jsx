import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
// Components
import StudentBox from "../../components/Student/Student";
import SearchStudents from "../../components/SearchStudent/SearchStudents";

const Home = () => {
  const [data, setData] = useState(null);
  const [allStudents, setAllStudents] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await axios("/api/students/");
        setData(students.data);
      } catch (err) {
        setError("Error fetching students data.");
      }
    };

    fetchData();
  }, []);

  const removeStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      const students = await axios("/api/students/");
      setData(students.data);
    } catch (err) {
      setError("Error removing student.");
    }
  };

  const searchStudents = (username) => {
    let allStudentsCopy = [...data.students];
    if (allStudents === null) setAllStudents(allStudentsCopy);

    let students = data.students.filter(({ name }) =>
      name.toLowerCase().includes(username.toLowerCase())
    );
    if (students.length > 0) setData({ students });

    if (username.trim() === "") setData({ students: allStudents });
  };

  let students;

  if (data) {
    students =
      data.students &&
      data.students.map((student) => (
        <StudentBox
          key={student._id}
          {...student}
          removeStudent={removeStudent}
        />
      ));
  } else if (error) {
    return <h1>{error}</h1>;
  } else {
    return (
      <div className="Spinner-Wrapper">
        <PropagateLoader color={"#333"} />
      </div>
    );
  }

  if (data !== null && !data.students.length)
    return <h1 className="No-Students">No students!</h1>;

  return (
    <div className="Table-Wrapper">
      <h1>Students:</h1>
      <SearchStudents searchStudents={searchStudents} />
      <div className="Grid-Container">{students}</div>
    </div>
  );
};

export default Home;
