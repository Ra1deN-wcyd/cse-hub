// src/pages/Resources.jsx
import React from 'react'
import './Resources.css'
import ytLogo from '../assets/youtube.png' // make sure to have a small YouTube logo
import bookLogo from '../assets/book.png'   // and a book icon in assets folder

const courses = {
  "1st Semester": [
    {
      name: "Structured Programming / C",
      books: [
        { name: "Let Us C by Yashavant Kanetkar", link: "https://www.amazon.com/Let-Us-C-Yashavant-Kanetkar/dp/8176563587" },
        { name: "C Programming Language by Kernighan & Ritchie", link: "https://www.amazon.com/C-Programming-Language-2nd/dp/0131103628" }
      ],
      website: "https://www.geeksforgeeks.org/c-programming-language/",
      youtube: { name: "Anisul Hoque C Programming", link: "https://www.youtube.com/playlist?list=PLgH5QX0i9K3oJLnKp4EpgA1ynC6L9x4xI" }
    },
    {
      name: "Discrete Mathematics",
      books: [
        { name: "Discrete Mathematics and Its Applications by Kenneth H. Rosen", link: "https://www.amazon.com/Discrete-Mathematics-Its-Applications-Seventh/dp/0073383090" }
      ],
      website: "https://www.geeksforgeeks.org/discrete-mathematics/",
      youtube: { name: "Gate Smashers - Discrete Math", link: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnZ67i1GhZWzrCBl8p0JNT0B" }
    }
  ],

  "2nd Semester": [
    {
      name: "Object-Oriented Programming (OOP)",
      books: [
        { name: "C++ Primer by Stanley B. Lippman", link: "https://www.amazon.com/Primer-5th-Stanley-B-Lippman/dp/0321714113" }
      ],
      website: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
      youtube: { name: "CodeWithHarry - C++", link: "https://www.youtube.com/playlist?list=PLu0W_9lII9ah7DDtYtflgwMwpT3xmjXY9" }
    },
    {
      name: "Digital Logic Design",
      books: [
        { name: "Digital Design by M. Morris Mano", link: "https://www.amazon.com/Digital-Design-M-Morris-Mano/dp/0131989243" }
      ],
      website: "https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/",
      youtube: { name: "Neso Academy", link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS" }
    }
  ],

  "3rd Semester": [
    {
      name: "Data Structures & Algorithms I",
      books: [
        { name: "Data Structures and Algorithms Made Easy by Narasimha Karumanchi", link: "https://www.amazon.com/Data-Structures-Algorithms-Made-Easy/dp/819324527X" }
      ],
      website: "https://www.geeksforgeeks.org/data-structures/",
      youtube: { name: "Abdul Bari", link: "https://www.youtube.com/playlist?list=PLxuHi_e-dpT9xVkwP8sX3PjS2UnpNYncJ" }
    }
  ],

  "4th Semester": [
    {
      name: "Theory of Computation / Automata",
      books: [
        { name: "Introduction to Automata Theory by Hopcroft", link: "https://www.amazon.com/Introduction-Automata-Theory-Languages-Computation/dp/0321455363" }
      ],
      website: "https://www.geeksforgeeks.org/theory-of-computation-automata-tutorials/",
      youtube: { name: "Gate Smashers", link: "https://www.youtube.com/playlist?list=PLV8vIYTIdSnZz_-3IuN6kIFqAkurX9fhu" }
    },
    {
      name: "Operating Systems",
      books: [
        { name: "Operating System Concepts by Silberschatz", link: "https://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/1118063333" }
      ],
      website: "https://www.geeksforgeeks.org/operating-systems/",
      youtube: { name: "Neso Academy", link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjZkpo2A4Jk9iAaa0VYfVci" }
    }
  ]
}

const Resources = () => {
  return (
    <div className="resources-container">
      <h1>📚 Academic Resources</h1>
      {Object.entries(courses).map(([semester, courseList], idx) => (
        <div className="semester-box" key={idx}>
          <h2>{semester}</h2>
          {courseList.map((course, i) => (
            <div className="course-card" key={i}>
              <h3>{course.name}</h3>

              {/* Book Section */}
              {course.books.map((book, j) => (
                <p key={j}>
                  <img src={bookLogo} alt="Book" className="icon" />
                  <strong>Book:</strong>{' '}
                  <a href={book.link} target="_blank" rel="noreferrer">{book.name}</a>
                </p>
              ))}

              {/* Website */}
              <p>
                🌐 <strong>Website:</strong>{' '}
                <a href={course.website} target="_blank" rel="noreferrer">{course.website}</a>
              </p>

              {/* YouTube */}
              <p>
                <img src={ytLogo} alt="YouTube" className="icon" />
                <strong>YouTube:</strong>{' '}
                <a href={course.youtube.link} target="_blank" rel="noreferrer">
                  {course.youtube.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Resources
