import React, { useEffect, useState } from "react";
import "./App.css";
import Logo from "./assets/minajologo.png";
import arrow from "./assets/arrow.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const minajoText = document.querySelector(".minajoText");

    const letters = minajoText.innerText.split("");
    minajoText.innerHTML = letters
      .map(
        (letter) =>
          `<span style="display: inline-block; opacity: 0">${letter}</span>`
      )
      .join("");

    gsap.to(".minajoText span", {
      opacity: 2,
      y: 0,
      duration: 1,
      stagger: 0.3, // Adjust the stagger value for the desired delay between letters
      ease: "power2.inOut",
    });
    // gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    // let targets = gsap.utils.toArray(".ball");
    // window.addEventListener("mousemove", (e) => {
    //   gsap.to(targets, {
    //     duration: 0.5,
    //     x: e.clientX,
    //     y: e.clientY,
    //     ease: "power1.out",
    //     overwrite: "auto",
    //     stagger: 0.02,
    //   });
    // });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("show");
  };

  return (
    <>
      <div className={`App ${isMobile ? "mobile" : ""}`}>
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="navbar">
            <div className="home">
              <a href="#App">
                <li>home</li>
              </a>
            </div>
            <div className="about-navbar">
              <a href="#about">
                <li>about</li>
              </a>
            </div>
            <div className="product-navbar">
              <a href="#product">
                <li>product</li>
              </a>
            </div>
            <div className="contact">
              <a href="#contact">
                <li>contact</li>
              </a>
            </div>
          </div>
        </div>
        <div className="content">
          <h1 className="minajoText">Minajo</h1>
          <p className="indoText">Indo perkasa</p>
        </div>
        <div className="footer">
          <div className="rightfooter">
            <p>
              At Perkasa Charcoal Industries, we are <br /> dedicated to
              providing the finest quality <br /> charcoal products, including,
              rice husk <br /> charcoal and coconut shell charcoal
            </p>
            <p className="readMore">read more.</p>
          </div>
        </div>
      </div>
      <div className="about">
        <div className="about-content">
          <h1>about us</h1>
          <p>
            Welcome to Minajo, a professional provider in the commodities
            industry. We are a trusted partner for our customers, providing a
            wide range of high-quality commodities, including agricultural and
            fishery products. With our dedication to quality, sustainability and
            customer satisfaction, we have built a reputation as a reliable
            supplier in the national market.
          </p>
        </div>
        <div className="button-about">
          <div className="button-about-content">
            <a href="#product">
              <p>product</p>
            </a>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
      </div>
      {/* product */}
      <div className="product" id="product">
        <div className="product-content">
          <p>product</p>
        </div>
      </div>
      {/* <div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div> */}
    </>
  );
}

export default App;
