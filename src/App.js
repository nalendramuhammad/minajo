import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Logo from "./assets/minajologo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoArrowDownRight } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { BsGeoAlt } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { createClient } from "contentful";
import contentfulConfig from "./contentfulConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";

const client = createClient({
  ...contentfulConfig,
  environment: "master",
  space: "mhm8o07k920r", // Your space ID
});

client
  .getEntry("3UTRXxCbuOseyjAf0m3GIv")
  .then((entry) => console.log(entry))
  .catch(console.error);

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [data, setData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const marqueeRef = useRef(null);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  // const [delayAfterComplete, setDelayAfterComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <></>, // This will hide the "slick-prev" arrow
    nextArrow: <></>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { t } = useTranslation();
  // ... (other state and useEffect code)

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries();
        setData(response.items);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // You can replace the console.log with your actual form submission code
  };

  useEffect(() => {
    const tl = gsap.timeline();

    const marqueeAnimation = gsap.fromTo(
      ".marquee__part",
      { x: 0 },
      {
        x: -1000,
        duration: 5,
        ease: "linear",
        repeat: -1,
      }
    );

    const minajoText = document.querySelector(".minajoText");
    const letters = minajoText.innerText.split("");
    minajoText.innerHTML = letters
      .map(
        (letter) =>
          `<span style="display: inline-block; opacity: 0">${letter}</span>`
      )
      .join("");

    tl.to(".preloader", { opacity: 1, duration: 3, ease: "power1.inOut" });

    tl.to(".preloader", {
      yPercent: -100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        const internetCondition = Math.random() > 0.2;
        if (internetCondition) {
          setLoadingPercentage((prevPercentage) =>
            Math.min(prevPercentage + 2, 100)
          );
        } else {
          // Handle poor internet condition (optional)
        }
      },
      onComplete: () => {
        gsap.to(".preloader", {
          xPercent: -100,
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.delayedCall(10, () => {
              gsap.to(".preloader", {
                yPercent: -200,
                xPercent: 0,
                duration: 10,
                ease: "power1.inOut",
              });
            });
          },
        });
      },
    });

    // Additional animations...

    gsap.to(".minajoText span", {
      opacity: 2,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.inOut",
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      marqueeAnimation.pause();
    };
  }, []);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("show");
  };
  // console.log(data);
  return (
    <div className="whole">
      <Helmet>
        <title>Minajo</title>
        <link rel="icon" type="image/png" href="./assets/minajologo.png" />
      </Helmet>
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
          <div
            className={`menu-icon ${isMobile ? "open" : ""}`}
            onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className="navbar">
            <div className="home">
              <a href="#App">
                <li>{t("translation.home")}</li>
              </a>
            </div>
            <div className="about-navbar">
              <a href="#about">
                <li>{t("translation.about")}</li>
              </a>
            </div>
            <div className="product-navbar">
              <a href="#product">
                <li>{t("translation.product")}</li>
              </a>
            </div>
            <div className="contact-navbar">
              <a href="#contact">
                <li>{t("translation.contact")}</li>
              </a>
            </div>
          </div>
        </div>
        <div className="content">
          <h1 className="minajoText ">Minajo</h1>
          <p className="indoText">Indo perkasa</p>
        </div>
        <div className="footer">
          <div className="rightfooter">
            <p>
              {t("translation.charcoalIndustries")} <br />
              {t("translation.dedicatedTo")}{" "}
              {t("translation.providingTheFinest")} <br />
              {t("translation.charcoalProducts")}{" "}
              {t("translation.riceHuskCharcoal")} <br />
              {t("translation.and")} {t("translation.coconutShellCharcoal")}
            </p>
            <p className="readMore">{t("translation.read more.")}</p>
          </div>
        </div>
      </div>
      {/* about */}
      <div className="about" id="about">
        <div className="about-content">
          <h1>{t("translation.about us")}</h1>
          <p>
            {t("translation.welcomeToMinajo")}
            {t("translation.trustedPartner")}
            {t("translation.providingWideRange")}
            {t("translation.includingAgricultural")}
            {t("translation.withDedication")}
            {t("translation.sustainabilityAndCustomerSatisfaction")}
            {t("translation.builtAReputation")}
            {t("translation.inNationalMarket")}
          </p>
        </div>
        <div className="button-about">
          <a href="#product">
            <div className="button-about-content">
              <p>product</p>
              <GoArrowDownRight style={{ height: "100px" }} />
            </div>
          </a>
        </div>
      </div>
      {/* product */}
      <div className="product" id="product">
        <div className="product-line">
          <div className="product-title">
            <p>{t("translation.product")}</p>
          </div>
          <div className="product-line-content-wrap">
            {data && (
              <Slider {...settings}>
                {data.map((item) => (
                  <div key={item.sys.id}>
                    <div className="product-line-content">
                      <h3>{item.fields.description}</h3>
                      <img
                        src={item.fields.productFoto.fields.file.url}
                        alt={item.fields.description}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
      {/* contact */}
      <div className="contact" id="contact">
        <div className="contact-content">
          <div className="contact-title">
            <h1>{t("translation.contactUsEffortlessly")}</h1>
          </div>
        </div>
        <div className="contact-form">
          <h1>{t("translation.contact")}</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-text">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
                required
              />

              <div className="emphone">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email"
                  required
                />

                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="phone"
                  required
                />
              </div>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                placeholder="message"
                onChange={handleChange}
                required></textarea>
            </div>

            <button type="submit">{t("translation.send")}</button>
          </form>
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
          <div className="foot-kiri">
            <div className="foot-bottom">
              <a href="#App">{t("translation.home")}</a>
              <a href="#about">{t("translation.about")}</a>
              <a href="#product">{t("translation.product")}</a>
              <a href="#contact">{t("translation.contact")}</a>
              <div className="line-bawah"></div>
            </div>
            <div className="bahasa">
              <button onClick={() => changeLanguage("en")}>
                EN
              </button>
              <div className="line-bahasa"></div>
              <button onClick={() => changeLanguage("id")}>
                IN
              </button>
            </div>
          </div>
          <div className="foot-contact">
            <h1>{t("translation.contact")}</h1>
            <div className="icons">
              <MdOutlineEmail />
              <p>minajoperkasa1@gmail.com</p>
            </div>
            <div className="icons">
              <LuPhone />
              <p>+62-822-8446-8608</p>
            </div>
            <div className="icons">
              <BsGeoAlt />
              <a
                href="https://maps.app.goo.gl/5pP25HtSFxf7UpC58"
                target="_blank"
                rel="noopener noreferrer">
                Puri Asih Sejahtera jl. Sumatra Blok B No.59 Jaka setia, bekasi
                selatan
              </a>
            </div>
          </div>
        </div>
        <div className="copy-right">
          <div className="foot-copyrights">
            <p>© 2023 Minajo. All rights reserved.</p>
          </div>
        </div>
        {/* <div className="foot-bottom">
            <p>© 2021 Minajo. All rights reserved.</p>
          </div> */}
      </div>
      {/* <div className="back-to-top" onClick={() => window.scrollTo(0, 0)}>
        <GoArrowUp />
      </div> */}
    </div>
  );
}

export default App;
