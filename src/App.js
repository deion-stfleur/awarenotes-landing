import './App.css';
import logo from '../src/assets/Apple-Icon.svg'
import android from '../src/assets/Android-Icon.svg'
import React, {useState} from 'react';

function App() {
  const [expanded, setExpanded] = useState(null);

  const rectangles = [
    { id: 1, title: "Scan, Save, Simplify", text: "Transform handwritten notes or documents into organized, shareable PDFs in just a few taps. Whether it's meeting minutes, study material, or personal reminders, your notes are always ready when you need them." },
    { id: 2, title: "Speak It, Note It", text: "Turn your thoughts into text effortlessly with our audio-to-note feature. Record meetings, lectures, or casual conversations, and let us transcribe them into actionable notes or structured documents, tailored just for you.." },
  ];

  const toggleExpand = (index) => {
    setExpanded((prev) => (prev === index ? null : index));
  };


  return (
    <div className='background-img'>
    <div className="App">
      <p className='title'>Awarenotes</p>


      <div>
        <p className='headline'>One tool to manage your notes, ideas, and collaborate seamlessly</p>
        <p className='description'>Turn your handwritten and audio notes into beautifully organized, shareable documents with Awarenotes – your little helper for capturing ideas and keeping life on track!</p>

          <div className='plt-row'>

            <a target={"_blank"} href="https://apps.apple.com/us/app/awarenotes/id6563151353">
            <img src={logo} alt="Downdload Awarenotes on App Store" />
            </a>
            <div className='sep'></div>
            <a target={"_blank"} href="https://play.google.com/store/apps/details?id=com.msimeon.awarenotes03">
            <img src={android} alt="Downdload Awarenotes on Play Store" />
            </a>
          </div>


          <div className="container">
      {rectangles.map((rect, index) => (
        <div
          key={rect.id}
          className={`rectangle ${expanded === index ? "expanded" : ""}`}
        >
          <h3>{rect.title}</h3>

          {expanded === index && <p>{rect.text}</p>}
        
          <button className="plus-button" onClick={() => toggleExpand(index)}>
            +
          </button>
        </div>
      ))}
    </div>
      </div>
    </div>
    </div>
  );
}

export default App;
