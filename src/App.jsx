import React, { useEffect, useState, useRef } from "react";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Types from "./pages/Types";
import Incredieant from "./pages/Incredieant";
import Loader from "./components/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.06, 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9, 
      infinite: false,
    });

    lenisRef.current = lenis;


    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

   
    lenis.on("scroll", ScrollTrigger.update);

   
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    
    const handlePageLoad = () => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      setIsLoading(false);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      }, 100);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("load", handlePageLoad);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isLoading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />

      <div 
        className={`w-full min-h-screen bg-[#F5E3CD] transition-opacity duration-500 ${
          isLoading ? "opacity-0 pointer-events-none max-h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        <Home isLoading={isLoading} />
        <Types />
        <Journey />
        <Incredieant />
      </div>
    </>
  );
};

export default App;