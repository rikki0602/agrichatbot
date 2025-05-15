import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../cssStyles/Button.css';

const Button = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const handleSignUp = () => {
    navigate("/SignUp"); // Directs user to chat page on Get Started click
  };

  const handleHover = () => {
    setHovered(!hovered);
  };

  useEffect(() => {
    // Add transition effects here if needed
  }, [hovered]);

  return (
    <button
      className="custom-button font-custom"
      style={{
        '--primary-color': '#ffffff',
        '--secondary-color': '#141F0E',
        '--hover-color': '#ffffff',
        '--arrow-width': '10px',
        '--arrow-stroke': '2px'
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleSignUp}
    >
      <span className="tracking-tight">SIGN UP</span>
      <span className="arrow-wrapper">
        <span className="arrow"></span>
      </span>
    </button>
  );
};

function LandingNavbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll("[id^='section']");
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.5, // 50% of the section should be in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);


  return (
    <nav className="bg-transparent">
      <div className="px-6 lg:px-16 py-8 flex flex-row justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-white font-custom tracking-wide">
          <Link to="/">AgriLLM</Link>
        </div>
        <div className="flex flex-row justify-between items-center space-x-4 md:space-x-16">
          <button
            className={`text-sm font-custom md:text-base tracking-tight transition-all duration-300 text-white ${
              activeSection === "section1" ? "font-bold tracking-normal" : " hover:mb-2"
            } ${
              activeSection === "section4" || activeSection === "section5" ? "hidden" :""
            }`}
            onClick={() => scrollToSection("section1")}
          >
            WHO WE ARE
          </button>
          
          <button
            className={`text-sm font-custom md:text-base tracking-tight transition-all duration-300 text-white ${
              activeSection === "section2" ? "font-bold tracking-normal" : " hover:mb-2"
            } ${
              activeSection === "section4" || activeSection === "section5" ? "hidden" :""
            }`}
            onClick={() => scrollToSection("section2")}
          >
            WHAT WE DO
          </button>
          
          <button
            to="/login"
            className={`text-sm font-custom md:text-base tracking-tight transition-all duration-300 text-white ${
              activeSection === "section3" ? "font-bold tracking-normal" : " hover:mb-2"
            } ${
              activeSection === "section4" || activeSection === "section5" ? "hidden" :""
            }
            `}
            onClick={() => scrollToSection("section3")}
          >
            CONTACT US
          </button>
          
          <Link
            to="/login"
            className={`text-sm font-custom md:text-base tracking-tight transition-all duration-300 text-white ${
              activeSection === "section4" ? "font-bold tracking-normal" :" hover:mb-2"
            }`}
          >
            LOGIN
          </Link>
          <Button />
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
