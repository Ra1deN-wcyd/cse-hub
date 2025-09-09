import React from "react";

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
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '2rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          🚀 Student Projects
        </h1>

        {Object.keys(projectCategories).map((category, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '3rem'
            }}
          >
            <h2
              style={{
                color: '#fff',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                fontWeight: '600',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {category}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {projectCategories[category].map((project, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.5)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <h3
                    style={{
                      color: '#fff',
                      fontSize: '1.2rem',
                      marginBottom: '0.75rem',
                      fontWeight: '600',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      color: '#a0a0a0',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      margin: 0
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Projects;
