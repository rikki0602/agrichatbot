import React from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";
import image from "../images/10.jpg";
import { useState, useEffect } from "react";
import img1 from "../images/chat.jpg";
import img2 from "../images/chatHistory.jpg";
import "../cssStyles/lpCSS.css";

function LandingPage() {
  const navigate = useNavigate();
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

  const handleGetStarted = () => {
    navigate("/chat"); // Directs user to chat page on Get Started click
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen w-screen bg-custom-background bg-cover bg-center">
      <LandingNavbar />
      <div className="flex-1 h-full w-full overflow-y-auto relative scrollable-content">
          <div className="h-[78vh] w-full flex flex-col items-center justify-center" id="section1">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="flex flex-row justify-content-center items-center mb-8 space-x-2">
                <hr className="w-[80px] h-[1.5px] bg-white border-none"/>
                <p className="text-white font-custom tracking-wide">
                  Your AI-powered Chatbot Solution
                </p>
              </div>
              <h1 className="text-4xl max-w-[65vw] font-extrabold text-white mb-12 font-custom font-medium tracking-wide">
                "EXPLORE ICAR-CRIDA INSIGHTS WITH OUR ADVANCED LLM-POWERED QUERY SYSTEM"
              </h1>
              
              <div className="">
                <button
                  onClick={handleGetStarted}
                  className="w-[200px] h-[50px] bg-transparent text-white font-semibold font-custom relative py-3 px-6 shadow-lg transition duration-300 group"
                >
                  <div className="w-[200px] h-[50px] border-2 border-slate-200 absolute top-[3px] left-[3px] transition-all duration-300 ease-in-out group-hover:top-[5px] group-hover:left-[5px] "></div>
                  <div className="w-[200px] h-[50px] border-2 border-white absolute bottom-[3px] right-[3px] transition-all duration-300 ease-in-out group-hover:bottom-[5px] group-hover:right-[5px]"></div>
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
          <div id="section2" className="w-full h-[78vh] flex flex-row items-center justify-center text-center p-4">
            <div className="flex flex-col justify-center items-end w-1/2 h-full p-4">
              <div className="w-3/4 mb-10">
                <h2 className="text-white font-custom text-2xl">Chat With DIFFERENT LLMs</h2>
              </div>
              
              <img src={img1} className="h-[35vh] rounded-3xl border-4 border-white" />
            </div>
            <div className="flex flex-col justify-center items-start w-1/2 h-full p-4">
              <div className="w-3/4 mb-10">
                <h2 className="text-white font-custom text-2xl">While SAVING Your Chat History</h2>
              </div>
              <img src={img2} className="h-[35vh] rounded-3xl  border-4 border-white"/>
            </div>
          </div>
          <div id="section3" className="w-full h-[78vh] flex flex-col items-center justify-center text-center p-4">
            <h2 className="font-semibold text-white text-3xl">contact us</h2>
          </div>
      </div>
      <div className="hidden absolute z-1000 h-full w-[20px] md:flex flex-col items-start justify-center left-0 p-16 space-y-12">
            <div>
              <p className="text-white font-normal mb-1">01</p>
              <hr className={`w-[20px] h-[1px] bg-white border-none transition-all duration-300 ${
            activeSection === "section1" ? "w-[35px]" : ""
          }`}/>
            </div>
            <div>
              <p className="text-white font-normal mb-1">02</p>
              <hr className={`w-[20px] h-[1px] bg-white border-none transition-w duration-300 ${
            activeSection === "section2" ? "w-[35px]" : ""
          }`} />
            </div>
            <div>
              <p className="text-white font-normal mb-1">03</p>
              <hr className={`w-[20px] h-[1px] bg-white border-none transition-w duration-300 ${
            activeSection === "section3" ? "w-[35px]" : ""
          }`} />
          </div>
          </div>
          {/* <div>
              <p className="hidden md:flex absolute z-500 tracking-wider font-semibold rotate-[270deg] text-white text-sm">SCROLL</p>
            </div> */}
      
      <Footer />
    </div>
  );
}

export default LandingPage;