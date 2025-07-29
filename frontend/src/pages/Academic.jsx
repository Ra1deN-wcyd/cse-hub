import React from 'react';
import './Academic.css';


const universities = [
  { name: "BUET", url: "https://cse.buet.ac.bd/academics/ug_courses" },
  { name: "AUST", url: "https://www.aust.edu/cse/syllabus" },
  { name: "KUET", url: "https://old.kuet.ac.bd/department/CSE/index.php/welcome/syllabus" },
  { name: "RUET", url: "https://www.cse.ruet.ac.bd/page/course-curriculum" },
  { name: "CUET", url: "https://cuet.ac.bd" },
  { name: "IUT", url: "https://www.iutoic-dhaka.edu" },
  { name: "NSU", url: "https://www.northsouth.edu/academic/undergraduate-programs/cse.html" },
  { name: "BRACU", url: "https://www.bracu.ac.bd/academics/departments/computer-science-and-engineering" },
  { name: "JU", url: "https://juniv.edu/department/cse" },
  { name: "DU (IIT)", url: "https://iit.du.ac.bd" }
];

const semesterCourses = {
  "1st Semester": [
    "Structured Programming / C",
    "Discrete Mathematics",
    "Calculus / Differential Calculus",
    "Physics",
    "English / Communication"
  ],
  "2nd Semester": [
    "Object-Oriented Programming (OOP)",
    "Digital Logic Design",
    "Linear Algebra / Coordinate Geometry",
    "Basic Electrical Engineering",
    "Chemistry / Environment"
  ],
  "3rd Semester": [
    "Data Structures & Algorithms I",
    "Computer Architecture",
    "Database Systems",
    "Differential Equations",
    "Numerical Methods"
  ],
  "4th Semester": [
    "Data Structures & Algorithms II",
    "Theory of Computation / Automata",
    "Operating Systems (Intro)",
    "Statistics",
    "Software Engineering (Intro)"
  ]
};

const Academic = () => {
  return (
    <div className="academic-container">
      <h1 className="title">🎓 Academic Information</h1>

      <section className="section">
        <h2>CSE Syllabus of the Top Universities in Bangladesh</h2>
        <ul className="university-list">
          {universities.map((uni, index) => (
            <li key={index}>
              <a href={uni.url} target="_blank" rel="noopener noreferrer">{uni.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <h2 className="sub-title">Common CSE Core Courses by Semester</h2>
      <div className="semester-grid">
        {Object.entries(semesterCourses).map(([semester, courses], index) => (
          <div className="semester-box" key={index}>
            <h3>{semester}</h3>
            <ul className="course-list">
              {courses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Academic;