import React from "react";
import "./Projects.css";

const projectCategories = {
  "Beginner Projects": [
    { title: "To-Do List App", description: "Track your daily tasks and practice React state management." },
    { title: "Calculator", description: "A simple calculator to practice JavaScript functions." },
    { title: "Weather App", description: "Fetch real-time weather data using an API." },
    { title: "Quiz Game", description: "A fun game to test your knowledge and learn about arrays & objects." },
    { title: "Notes App", description: "Create, edit, and delete notes to learn about CRUD operations." },
  ],
  "Intermediate Projects": [
    { title: "Blog Platform", description: "Build a mini blogging site with user authentication." },
    { title: "Chat Application", description: "Real-time messaging app using Firebase or Socket.io." },
    { title: "Movie Search App", description: "Search movies from an API and save favorites." },
    { title: "Expense Tracker", description: "Track expenses with charts and filtering." },
    { title: "Recipe Finder", description: "Search recipes by ingredients using an API." },
  ],
  "Advanced Projects": [
    { title: "E-commerce Store", description: "Full-stack app with products, cart, and payments." },
    { title: "Social Media Clone", description: "Features like posts, likes, comments, and profiles." },
    { title: "AI Chatbot", description: "Integrate AI or NLP to create a chatbot." },
    { title: "Portfolio Website", description: "Personal portfolio with animations and projects showcase." },
    { title: "Learning Management System", description: "A platform for courses, quizzes, and progress tracking." },
  ],
  "Web Development Projects": [
    { title: "Landing Page Design", description: "Practice responsive design using HTML, CSS, and React." },
    { title: "News Aggregator", description: "Fetch and display the latest news articles from APIs." },
    { title: "Job Board", description: "Post and apply for jobs, filter by categories." },
    { title: "Online Forum", description: "A discussion platform with threads, replies, and user accounts." },
  ],
  "AI & Machine Learning Projects": [
    { title: "Spam Email Classifier", description: "Use ML to classify emails as spam or not spam." },
    { title: "Handwriting Digit Recognition", description: "Recognize handwritten digits using TensorFlow or PyTorch." },
    { title: "Chatbot with NLP", description: "Build a chatbot that answers common questions." },
    { title: "Stock Price Prediction", description: "Predict stock trends using ML models." },
    { title: "Image Caption Generator", description: "Generate captions for images using deep learning." },
  ],
  "Data Science Projects": [
    { title: "Data Visualization Dashboard", description: "Use Python and libraries like Matplotlib/D3.js." },
    { title: "COVID-19 Data Tracker", description: "Track and visualize COVID-19 cases worldwide." },
    { title: "Sales Forecasting", description: "Predict sales using regression models." },
    { title: "Customer Segmentation", description: "Group customers using clustering techniques." },
    { title: "Sports Analytics", description: "Analyze player or team performance using data sets." },
  ],
  "Competitive Programming Practice": [
    { title: "Sorting Visualizer", description: "Visualize sorting algorithms like quicksort, mergesort, etc." },
    { title: "Sudoku Solver", description: "Solve Sudoku puzzles using backtracking." },
    { title: "Pathfinding Visualizer", description: "Implement algorithms like BFS, DFS, A* to find paths." },
    { title: "Number Theory Toolkit", description: "Implement prime check, gcd, modular arithmetic, etc." },
    { title: "Dynamic Programming Challenges", description: "Practice knapsack, LIS, and classic DP problems." },
  ],
  "Hardware & IoT Projects": [
    { title: "Smart Home Automation", description: "Control lights and appliances using Arduino or Raspberry Pi." },
    { title: "IoT Weather Station", description: "Measure temperature, humidity, and pressure with sensors." },
    { title: "Health Monitoring System", description: "Wearable device to monitor heart rate and temperature." },
    { title: "Smart Agriculture", description: "Monitor soil moisture and automate irrigation." },
    { title: "Home Security System", description: "Motion detection and alerts with IoT devices." },
  ],
};

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="projects-title">Student Projects</h1>
      {Object.keys(projectCategories).map((category, idx) => (
        <div className="project-category" key={idx}>
          <h2>{category}</h2>
          <div className="project-list">
            {projectCategories[category].map((project, index) => (
              <div className="project-card" key={index}>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
