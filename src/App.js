import React, { useEffect } from "react";
import "./App.css";
import Logo from "./assets/minajologo.png";
import { gsap } from "gsap";

function App() {
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

  return (
    <>
      <div className="App">
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="navbar">
            <div className="home">
              <li>home</li>
            </div>
            <div className="about">
              <li>about</li>
            </div>
            <div className="product">
              <li>product</li>
            </div>
            <div className="contact">
              <li>contact</li>
            </div>
          </div>
        </div>
        <div className="content">
          <h1 className="minajoText">Minajo</h1>
          <p className="indoText">Indo perkasa</p>
        </div>
        <div className="footer">
          <div className="leftfooter">
            <button>in</button>
            <p>|</p>
            <button>en</button>
          </div>
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
