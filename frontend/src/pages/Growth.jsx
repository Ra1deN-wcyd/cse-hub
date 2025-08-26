import React, { useState } from "react";
import "./Growth.css";

const Growth = () => {
  const [skills, setSkills] = useState([
    { name: "React", level: 70 },
    { name: "JavaScript", level: 85 },
    { name: "C++", level: 60 },
    { name: "Python", level: 75 },
  ]);

  const addSkill = () => {
    const skillName = prompt("Enter skill name:");
    const skillLevel = prompt("Enter skill level (0-100):");
    if (skillName && skillLevel) {
      setSkills([...skills, { name: skillName, level: parseInt(skillLevel) }]);
    }
  };

  return (
    <div className="growth-container">
      {/* ===== Portfolio Section ===== */}
      <div className="growth-section">
        <h2>📂 Portfolio</h2>
        <p>
          Showcase your projects, internships, GitHub repositories, designs, or
          articles. Build a professional presence online.
        </p>
        <button
          className="growth-btn"
          onClick={() => window.open("https://github.com/", "_blank")}
        >
          🌐 Create GitHub Portfolio
        </button>
        <button
          className="growth-btn"
          onClick={() => window.open("https://www.behance.net/", "_blank")}
        >
          🎨 Create Design Portfolio
        </button>
      </div>

      {/* ===== Resume Section ===== */}
      <div className="growth-section">
        <h2>📄 Resume / CV Builder</h2>
        <p>
          Keep your resume always up-to-date with your projects and skills. Use
          online builders to generate professional resumes.
        </p>
        <button
          className="growth-btn"
          onClick={() =>
            window.open("https://www.canva.com/resumes/templates/", "_blank")
          }
        >
          📌 Build Resume on Canva
        </button>
        <button
          className="growth-btn"
          onClick={() =>
            window.open("https://novoresume.com/resume-builder", "_blank")
          }
        >
          ⚡ Build Resume on Novoresume
        </button>
      </div>

      {/* ===== Skill Tracker Section ===== */}
      <div className="growth-section">
        <h2>📊 Skill Tracker</h2>
        <p>Log your progress and track improvement over time.</p>

        {skills.map((skill, index) => (
          <div key={index} className="skill-bar">
            <div className="skill-label">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}

        <button className="growth-btn" onClick={addSkill}>
          ➕ Add New Skill
        </button>
      </div>

      {/* ===== Certifications Section ===== */}
      <div className="growth-section">
        <h2>🎓 Certifications</h2>
        <p>Showcase verified achievements and online courses.</p>
        <div className="certifications">
          <div className="cert-card">
            <h3>Coursera</h3>
            <p>Completed courses in Machine Learning & Web Development.</p>
          </div>
          <div className="cert-card">
            <h3>Udemy</h3>
            <p>Certified in JavaScript, React, and Backend Development.</p>
          </div>
          <div className="cert-card">
            <h3>Hackerrank</h3>
            <p>Problem-solving and coding challenges certificates.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Growth;
