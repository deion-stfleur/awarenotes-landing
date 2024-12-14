import React, { useState, useEffect } from 'react'
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { IoSunnyOutline } from 'react-icons/io5';
import { LuSunMoon } from 'react-icons/lu';
import './App.css';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FaApple } from "react-icons/fa6";
import { IoLogoAndroid } from "react-icons/io";
import { useTheme } from './ThemeContext';
import { Link } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(null);

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [bgColor, setBgColor] = useState("white");
    // const [title, setTitle] = useState("Awarenotes");
    const { bgColor, title, toggleBackgroundAndTitle } = useTheme(); // Access global state

  
    useEffect(() => {
      const fetchUserDocuments = async () => {
        try {
          // Get the current authenticated user
          const auth = getAuth();
          const currentUser = auth.currentUser;
          
          if (currentUser) {
            // Get a reference to the Firestore database
            const db = getFirestore();
            
            // Create a query to fetch documents belonging to the current user
            const q = query(
              collection(db, 'documents'),
              where('userId', '==', currentUser.uid)
            );
            
            // Execute the query and get the documents
            const querySnapshot = await getDocs(q);
            
            // Map the documents to an array
            const userDocuments = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            
            setDocuments(userDocuments);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error fetching user documents:', err);
          setError(err);
          setLoading(false);
        }
      };
  
      fetchUserDocuments();
    }, []);
  
    // Render loading state
    if (loading) {
      return <div>Loading user documents...</div>;
    }
  
    // Render error state
    if (error) {
      return <div>Error loading user documents: {error.message}</div>;
    }


    const rectangles = [
      { id: 1, title: "Scan, Save, Simplify", text: "Transform handwritten notes or documents into organized, shareable PDFs in just a few taps. Whether it's meeting minutes, study material, or personal reminders, your notes are always ready when you need them." },
      { id: 2, title: "Speak It, Note It", text: "Turn your thoughts into text effortlessly with our audio-to-note feature. Record meetings, lectures, or casual conversations, and let us transcribe them into actionable notes or structured documents, tailored just for you.." },
    ];
  
   
  
    const toggleExpand = (index) => {
      setExpanded((prev) => (prev === index ? null : index));
    };
    // const toggleBackgroundAndTitle = () => {
    //   setBgColor((prevColor) => (prevColor === "white" ? "#1b1b1b" : "white"));
    //   setTitle((prevTitle) =>
    //     prevTitle === "Awarenotes" ? "Awarenotes" : "Awarenotes"
    //   );
    // };


    const handleSignOut = async () => {
      try {
        await signOut(auth);
        
        navigate('/landing-page'); 
      } catch (error) {
        console.error('Sign out error', error);
      }
    };
  
  return (
    <div className='background-img' style={{ backgroundColor: bgColor, minHeight: "100vh", padding: "20px" }}>

        <div className='hp-row'>
              <div className='header-row'>
          <h1 className='title' style={{ color: bgColor === "white" ? "#333" : "white" }}>{title}</h1>


    <div className='login-row'>

    <div className='logout' onClick={handleSignOut}>
        <p>Sign out</p>
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


        <p style={{ color: bgColor === "white" ? "#333" : "white", fontSize: "30px", fontWeight: "bold"}} className='welcome'>Welcome!</p>

        <div className='hp-comp'>
            <div className='profile'>
                <p style={{ color: bgColor === "white" ? "#333" : "white", fontSize: "30px", fontWeight: "bold"}} className='prof'>Profile</p>
                <p className='prof-text'>Manage your profile and settings</p>
       
       <div style={{ display: 'flex', alignItems: 'center'}}>

       <div className='prof-icon'>
        <p className='prof-text-i'>{auth.currentUser.email.slice(0, 1)}</p>
       </div>
        <p style={{ color: bgColor === "white" ? "#333" : "white", fontSize: "20px", fontWeight: "bold"}}>{auth.currentUser.email}</p>
       </div>

            </div>

            <div className='notes'>
                <p style={{ color: bgColor === "white" ? "#333" : "white", fontSize: "30px", fontWeight: "bold"}} className='prof'>Notes</p>
                <p className='prof-text'>View and manage your notes</p>
                {documents.length === 0 ? (
                    <>
                    <div className='open-row'>

                    <a style={{textDecoration: "none"}} target={"_blank"} href="https://apps.apple.com/us/app/awarenotes/id6563151353">
                        <div className='open-btn'>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <p>Open App!</p>
                            <FaApple /> 
                            </div>
                        </div>
                        </a>

                        <div className='sep-hp'></div>
                        <a style={{textDecoration: "none"}} target={"_blank"} href="https://play.google.com/store/apps/details?id=com.msimeon.awarenotes03">
                        <div className='open-btn'>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                            <p>Open App!</p>
                            <IoLogoAndroid /> 
                            </div>
                        </div>

                        </a>
                    </div>
                    </>

      ) : (
        <ul>
          {documents.map((doc) => (
            <li
              key={doc.id}
            >
              {/* Display document data */}
              <p><strong>Text:</strong> {doc.text}</p>
              <p><strong>Timestamp:</strong> {new Date(doc.timestamp.seconds * 1000).toLocaleString()}</p>
              <p><strong>User ID:</strong> {doc.userId}</p>
            </li>
          ))}
        </ul>
      )}

            </div>
        </div>


      
    </div>
  )
}

export default HomePage