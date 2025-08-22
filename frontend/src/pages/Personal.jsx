// src/pages/Personal.jsx
import React from 'react';
import './Personal.css';

const skillAreas = [
  { name: "Time Management", resource: "https://www.mindtools.com/pages/main/newMN_HTE.htm" },
  { name: "Communication Skills", resource: "https://www.coursera.org/courses?query=communication%20skills" },
  { name: "Leadership", resource: "https://www.edx.org/course/leadership-and-influence" },
  { name: "Critical Thinking", resource: "https://www.edx.org/course/critical-thinking-skills-for-university-success" },
  { name: "Teamwork", resource: "https://www.futurelearn.com/courses/teamwork-skills" },
  { name: "Stress Management", resource: "https://www.helpguide.org/articles/stress/stress-management.htm" },
  { name: "Problem Solving", resource: "https://www.futurelearn.com/courses/problem-solving" },
  { name: "Public Speaking", resource: "https://www.toastmasters.org/find-a-club" },
  { name: "Personal Finance", resource: "https://www.khanacademy.org/college-careers-more/personal-finance" },
  { name: "Career Building", resource: "https://www.linkedin.com/learning/" }
];

const habits = [
  "📝 Daily Journaling – Reflect on what you learned and set small goals.",
  "⏳ Use the Pomodoro Technique – Study in 25-min focus sessions with 5-min breaks.",
  "🏃 Regular Exercise – Even 20 mins a day boosts focus & energy.",
  "📖 Read at least 20 minutes a day – Books, research papers, or blogs.",
  "🎯 Set Weekly Goals – Break down big tasks into achievable steps.",
  "🤝 Networking – Connect with seniors, teachers, and professionals.",
  "🌍 Stay Updated – Follow tech news, AI, software trends, and global issues.",
  "🧠 Practice Mindfulness – Meditation or breathing exercises to reduce stress.",
  "💻 Build Side Projects – Apply your learning in real projects.",
  "📂 Organize Notes – Use Notion, OneNote, or Google Keep.",
  "💡 Learn Soft Skills – Communication, teamwork, adaptability.",
  "📊 Track Progress – Use a planner or app to measure growth.",
  "🌱 Volunteer – Join social work or tech communities.",
  "📢 Attend Seminars & Webinars – Learn beyond textbooks.",
  "🌐 Improve English – Practice writing, speaking, and presentations.",
  "💼 Internships – Gain real-world experience early.",
  "💵 Learn Financial Literacy – Budget, save, and plan expenses.",
  "💤 Sleep Well – 7–8 hrs of sleep for productivity and memory retention."
];

const Personal = () => {
  return (
    <div className="personal-container">
      <h1 className="title">🌱 Personal Improvement</h1>

      {/* Section: Skill Development */}
      <section className="section">
        <h2>Skill Development Resources</h2>
        <ul className="skill-list">
          {skillAreas.map((skill, index) => (
            <li key={index}>
              <a href={skill.resource} target="_blank" rel="noopener noreferrer">
                {skill.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Productive Habits */}
      <h2 className="sub-title">✅ Recommended Things for Students</h2>
      <div className="habits-box">
        <ul className="habit-list">
          {habits.map((habit, i) => (
            <li key={i}>{habit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Personal;
