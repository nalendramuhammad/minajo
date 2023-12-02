import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Logo from "./assets/minajologo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowDownRight } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import minajoproduk from "./assets/fp2.jpeg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Parallax, Pagination, Navigation } from "swiper/modules";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const marqueeRef = useRef(null);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Part 1: Cover the screen
    tl.to(".preloader", { opacity: 1, duration: 3, ease: "power1.inOut" });

    // Part 2: Swipe to the left with loading percentage
    tl.to(".preloader", {
      xPercent: -100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        // Simulate checking internet condition
        const internetCondition = Math.random() > 0.2; // 80% chance of good internet
        if (internetCondition) {
          setLoadingPercentage((prevPercentage) =>
            Math.min(prevPercentage + 2, 100)
          );
        } else {
          // Handle poor internet condition (optional)
        }
      },
      onComplete: () => {
        // Animation completed, loading is 100%
        setLoadingPercentage(100);
      },
    });

    // Get the total duration of the preloader animation
    const preloaderDuration = tl.duration();
  }, []);

  useEffect(() => {
    const marqueeAnimation = gsap.fromTo(
      ".marquee__part",
      { x: 0 },
      {
        x: -1000, // Adjust this value based on your content length
        duration: 5, // Set a longer duration
        ease: "linear",
        repeat: -1,
      }
    );

    // gsap.set(".marquee__inner", { xPercent: -50 });

    return () => {
      marqueeAnimation.pause();
    };
  }, []);

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
      stagger: 0.3,
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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

  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.querySelector(".back-to-top");
      if (window.scrollY > 200) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="preloader">
        {/* Customize your preloader content/style here */}
        <div className="preloader-content">
          <p>{loadingPercentage}%</p>
        </div>
      </div>
      {/* home */}
      <div className={`App ${isMobile ? "mobile" : ""}`}>
        <div className="header">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          {/* contoh */}

          {/* contoh */}
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
            <div className="contact-navbar">
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
      {/* about */}
      <div className="about" id="about">
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
          <a href="#product">
            <div className="button-about-content">
              <p>product</p>
              <GoArrowDownRight />
            </div>
          </a>
        </div>
      </div>
      {/* product */}
      <div className="product" id="product">
        <div className="product-content">
          <p>product</p>
        </div>
        {/* <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          speed={600}
          parallax={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Parallax, Pagination, Navigation]}
          className="mySwiper">
          <div
            slot="container-start"
            className="parallax-bg"
            style={{
              "background-image": `url(${minajoproduk})`,
            }}
            data-swiper-parallax="-23%"></div>
          <SwiperSlide>
            <div className="title" data-swiper-parallax="-300">
              Slide 1
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              Subtitle
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                laoreet justo vitae porttitor porttitor. Suspendisse in sem
                justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh
                euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="title" data-swiper-parallax="-300">
              Slide 2
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              Subtitle
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                laoreet justo vitae porttitor porttitor. Suspendisse in sem
                justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh
                euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="title" data-swiper-parallax="-300">
              Slide 3
            </div>
            <div className="subtitle" data-swiper-parallax="-200">
              Subtitle
            </div>
            <div className="text" data-swiper-parallax="-100">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
                laoreet justo vitae porttitor porttitor. Suspendisse in sem
                justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh
                euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
                ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
                tincidunt ut libero. Aenean feugiat non eros quis feugiat.
              </p>
            </div>
          </SwiperSlide>
        </Swiper> */}
      </div>
      {/* contact */}
      <div className="contact" id="contact">
        <div className="contact-content">
          <p>contact</p>
        </div>
      </div>
      {/* tulisan minajo */}
      <div className="marquee" aria-hidden="true" ref={marqueeRef}>
        <div className="marquee__inner">
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
          <div className="marquee__part">
            <p>Minajo</p>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="foot">
        <div className="foot-content">
          <div className="foot-bottom">
            <a href="#App">Home</a>
            <a href="#about">About</a>
            <a href="#product">Product</a>
            <a href="#contact">Contact</a>
            <div className="line-bawah"></div>
          </div>
          <div className="bahasa">
            <a href="#">EN</a>
            <div className="line-bahasa"></div>
            <a href="#">IN</a>
          </div>
          <div className="foot-copyrights">
            <p>© 2023 Minajo. All rights reserved.</p>
          </div>
          {/* <div className="foot-bottom">
            <p>© 2021 Minajo. All rights reserved.</p>
          </div> */}
        </div>
        <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
          <GoArrowUp />
        </div>
      </div>
    </>
  );
}

export default App;
