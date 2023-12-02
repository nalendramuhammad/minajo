import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Part 1: Cover the screen
    tl.to(".preloader", { opacity: 1, duration: 3, ease: "power1.inOut" });

    // Part 2: Swipe to the left with loading percentage
    tl.to(".preloader", {
      xPercent: -100,
      duration: 3,
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

  return (
    <div className="preloader">
      {/* Customize your preloader content/style here */}
      <div className="preloader-content">
        <p>{loadingPercentage}%</p>
      </div>
    </div>
  );
};

export default Preloader;
