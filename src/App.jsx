import React, { useState, useEffect, useRef } from "react";
import DraggableWindow from "./components/DraggableWindow";
import DangerButton from "./components/DangerButton";
import FidgetToy from "./components/FidgetToy";
import BSOD from "./components/BSOD";
import FloatingIDCard from "./components/FloatingIDCard";

function App() {
  const [bsodVisible, setBsodVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const bsodRef = useRef(null);

  useEffect(() => {
    // Check local storage and show BSOD if needed (matching original logic)
    const shouldShow = localStorage.getItem("bsodShown") === "false";
    if (shouldShow) {
      setBsodVisible(true);
      // Note: Fullscreen might fail here due to lack of user interaction
      setTimeout(() => {
        bsodRef.current?.playAudio();
        bsodRef.current?.enterFullscreen();
      }, 100);
    }
  }, []);

  const handleDangerClick = () => {
    setBsodVisible(true);
    localStorage.setItem("bsodShown", "true");
    // Trigger fullscreen and audio immediately within user interaction
    bsodRef.current?.playAudio();
    bsodRef.current?.enterFullscreen();
  };

  return (
    <>
      <FloatingIDCard />
      <div className="container mt-5">
        <DraggableWindow
          title="INTRO.txt"
          className="introTXT"
          headerClassName="introHeader"
          contentClassName="contentIntro"
          minButtonClass="minButton"
        >
          <p>Greetings, I'm Franz! A BSIT student at PUP - Manila</p>
        </DraggableWindow>
      </div>

      <BSOD ref={bsodRef} isVisible={bsodVisible} />

      <div className="container mt-5">
        <DraggableWindow
          title="About_me.txt"
          className="abtTXT"
          headerClassName="abtHdr"
          contentClassName="contentAbt"
          minButtonClass="minButton2"
        >
          I enjoy reading and doing{" "}
          <span
            className="marker-highlight"
            onClick={() => setProjectsVisible(true)}
          >
            projects
          </span>{" "}
          on my free time.
        </DraggableWindow>
      </div>

      {projectsVisible && (
        <div className="container mt-5">
          <DraggableWindow
            title="Projects.txt"
            className="projectsTXT"
            headerClassName="projectsHeader"
            contentClassName="contentProjects"
            minButtonClass="minButton3"
          >
            <div className="project-list">
              <a
                href="https://github.com/znrfrnz/CheckMate"
                target="_blank"
                rel="noopener noreferrer"
                className="project-item"
              >
                <div className="project-thumb thumb-1"></div>
                <div className="project-info">
                  <span className="project-title">CheckMate.git</span>
                  <span className="project-desc">GitHub Repository</span>
                </div>
              </a>
              <a
                href="https://github.com/znrfrnz/oakmont"
                target="_blank"
                rel="noopener noreferrer"
                className="project-item"
              >
                <div className="project-thumb thumb-2"></div>
                <div className="project-info">
                  <span className="project-title">Oakmont.git</span>
                  <span className="project-desc">GitHub Repository</span>
                </div>
              </a>
              <a
                href="https://plm-hackathon.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="project-item"
              >
                <div className="project-thumb thumb-3"></div>
                <div className="project-info">
                  <span className="project-title">simpLAWcity.web</span>
                  <span className="project-desc">Web Application</span>
                </div>
              </a>
            </div>
          </DraggableWindow>
        </div>
      )}
      <div className="widgets-container">
        <DangerButton className="danger" onClick={handleDangerClick}>
          Do not click me!
        </DangerButton>

        <FidgetToy className="fidget">Click me!</FidgetToy>
      </div>
    </>
  );
}

export default App;
