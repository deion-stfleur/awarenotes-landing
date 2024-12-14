import './App.css';
import logo from '../src/assets/Apple-Icon.svg'
import android from '../src/assets/Android-Icon.svg'
import React, {useState, useEffect} from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './Login';
import HomePage from './HomePage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import { ThemeProvider } from './ThemeContext';

function AuthHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentPath = window.location.pathname;

      if (user && currentPath !== '/home') {
        navigate('/home');
      } else if (!user && currentPath !== '/landing-page' && currentPath !== '/login') {
        navigate('/landing-page');
      }
    });

   
    return () => unsubscribe();
  }, [navigate]);

  return null;
}

function App() {
  const [expanded, setExpanded] = useState(null);




  const rectangles = [
    { id: 1, title: "Scan, Save, Simplify", text: "Transform handwritten notes or documents into organized, shareable PDFs in just a few taps. Whether it's meeting minutes, study material, or personal reminders, your notes are always ready when you need them." },
    { id: 2, title: "Speak It, Note It", text: "Turn your thoughts into text effortlessly with our audio-to-note feature. Record meetings, lectures, or casual conversations, and let us transcribe them into actionable notes or structured documents, tailored just for you.." },
  ];

  const [bgColor, setBgColor] = useState("white");
  const [title, setTitle] = useState("Awarenotes");

  const toggleExpand = (index) => {
    setExpanded((prev) => (prev === index ? null : index));
  };
  const toggleBackgroundAndTitle = () => {
    setBgColor((prevColor) => (prevColor === "white" ? "#1b1b1b" : "white"));
    setTitle((prevTitle) =>
      prevTitle === "Awarenotes" ? "Awarenotes" : "Awarenotes"
    );
  };

  return (
    <ThemeProvider>
        <Router>
        <AuthHandler />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  </ThemeProvider>
  );
}

export default App;
