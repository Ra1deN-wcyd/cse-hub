import React, { useState } from "react";
import "./Internship.css";

const Internship = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions Ltd.",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Work on React-based projects and collaborate with the frontend team.",
      applyLink: "https://example.com/apply/frontend",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "InnovateX",
      location: "Remote",
      type: "Full-time",
      description: "Develop scalable software solutions for international clients.",
      applyLink: "https://example.com/apply/software",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "DataWorks",
      location: "Chittagong, Bangladesh",
      type: "Internship",
      description: "Analyze datasets and create meaningful reports for clients.",
      applyLink: "https://example.com/apply/data",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "NextGen IT",
      location: "Remote",
      type: "Full-time",
      description: "Design APIs and database systems for high-performance apps.",
      applyLink: "https://example.com/apply/backend",
    },
    {
      id: 5,
      title: "UI/UX Designer Intern",
      company: "DesignPro",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Assist in creating user-friendly designs for mobile and web apps.",
      applyLink: "https://example.com/apply/uiux",
    },
    {
      id: 6,
      title: "AI Research Assistant",
      company: "FutureAI",
      location: "Remote",
      type: "Internship",
      description: "Help train and evaluate AI models for language understanding.",
      applyLink: "https://example.com/apply/ai",
    },
    {
      id: 7,
      title: "Cloud Engineer",
      company: "SkyNet Tech",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      description: "Manage cloud infrastructure (AWS, Azure, GCP).",
      applyLink: "https://example.com/apply/cloud",
    },
    {
      id: 8,
      title: "Mobile App Developer",
      company: "Appify",
      location: "Remote",
      type: "Full-time",
      description: "Develop Android/iOS apps using Flutter and React Native.",
      applyLink: "https://example.com/apply/mobile",
    },
    {
      id: 9,
      title: "Marketing Intern",
      company: "MarketWise",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Assist with social media campaigns and marketing strategies.",
      applyLink: "https://example.com/apply/marketing",
    },
    {
      id: 10,
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Remote",
      type: "Full-time",
      description: "Monitor and secure IT systems against cyber threats.",
      applyLink: "https://example.com/apply/cyber",
    },
  ];

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedJob.title}!`);
    closeModal();
  };

  return (
    <div className="internship-container">
      <h1 className="page-title">🚀 Internship & Job Opportunities</h1>
      <p className="page-subtitle">
        Browse exciting internships and full-time jobs designed for students & graduates.
      </p>

      <div className="job-list">
        {jobs.map((job) => (
          <div className={`job-card ${job.type === "Internship" ? "internship" : "fulltime"}`} key={job.id}>
            <h2>{job.title}</h2>
            <p><strong>🏢 {job.company}</strong></p>
            <p><strong>📍 {job.location}</strong></p>
            <span className={`badge ${job.type === "Internship" ? "badge-intern" : "badge-fulltime"}`}>
              {job.type}
            </span>
            <p className="job-desc">{job.description}</p>
            <button className="apply-btn" onClick={() => openModal(job)}>
              Apply Now ✨
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedJob && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Apply for {selectedJob.title}</h2>
            <p><strong>Company:</strong> {selectedJob.company}</p>

            <form className="apply-form" onSubmit={handleSubmit}>
              <label>
                Full Name:
                <input type="text" required />
              </label>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Resume Link (Google Drive/LinkedIn):
                <input type="url" required />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <a href={selectedJob.applyLink} target="_blank" rel="noreferrer" className="external-link">
                  Apply via Company Website 🌐
                </a>
                <button type="button" className="close-btn" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Internship;
