import React, { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { IoSunnyOutline } from "react-icons/io5";
import { LuSunMoon } from "react-icons/lu";
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(null);
    const { bgColor, title, toggleBackgroundAndTitle } = useTheme(); // Access global state




    const rectangles = [
      { id: 1, title: "Scan, Save, Simplify", text: "Transform handwritten notes or documents into organized, shareable PDFs in just a few taps. Whether it's meeting minutes, study material, or personal reminders, your notes are always ready when you need them." },
      { id: 2, title: "Speak It, Note It", text: "Turn your thoughts into text effortlessly with our audio-to-note feature. Record meetings, lectures, or casual conversations, and let us transcribe them into actionable notes or structured documents, tailored just for you.." },
    ];
  
    // const [bgColor, setBgColor] = useState("white");
    // const [title, setTitle] = useState("Awarenotes");
  
    const toggleExpand = (index) => {
      setExpanded((prev) => (prev === index ? null : index));
    };
    // const toggleBackgroundAndTitle = () => {
    //   setBgColor((prevColor) => (prevColor === "white" ? "#1b1b1b" : "white"));
    //   setTitle((prevTitle) =>
    //     prevTitle === "Awarenotes" ? "Awarenotes" : "Awarenotes"
    //   );
    // };
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          console.error("Sign in error", error);
        }
      };
  return (
    <div className='background-img' style={{ backgroundColor: bgColor, minHeight: "100vh", padding: "20px" }}>

        <div style={{width: '90%', margin: 'auto', marginBottom: '20px'}}>

   <div className='header-row'>
    <Link style={{textDecoration: 'none'}} to="/landing-page">
          <h1 className='title' style={{ color: bgColor === "white" ? "#333" : "white" }}>{title}</h1>
    </Link>


    <div className='login-row'>

            <div>
            <a href="/login" className='login' style={{ color: bgColor === "white" ? "#333" : "white" }}>Login</a>
            </div>
          {bgColor === "white" ? (
            <div className='border-gray'>
              <IoSunnyOutline onClick={toggleBackgroundAndTitle} className='sunIcon' />
            </div>
          ) : (
            <div className='border-white'>
              <LuSunMoon onClick={toggleBackgroundAndTitle} className='moonIcon' style={{ color: "white"}} />
            </div>
          )}
    </div>
        </div>
        </div>
        <p style={{ color: bgColor === "white" ? "#333" : "white" }} className='welcome'>Welcome!</p>

        <div className='login-form'>

          
      <form onSubmit={handleSignIn}>
      <div className='login-inputs'>
        <p style={{ color: bgColor === "white" ? "#333" : "white" }}>Email</p>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className='email-input'
        />
          <p style={{ color: bgColor === "white" ? "#333" : "white" }}>Password</p>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='password-input'
        />
        <button className='login-button' type="submit">Sign In</button>
            
                </div>
      </form>
    </div>
    </div>
  )
}

export default Login