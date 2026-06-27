import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Journey from "./pages/Journey";
import Types from "./pages/Types";
import Incredieant from "./pages/Incredieant";
import Loader from "./components/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      window.scrollTo(0, 0);
      setIsLoading(false);
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      }, 100);
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
      return () => window.removeEventListener("load", handlePageLoad);
    }
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <div 
        className={`w-full min-h-screen bg-[#F5E3CD] transition-opacity duration-500 ${
          isLoading ? "opacity-0 pointer-events-none max-h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        {/* Pass isLoading down to prevent the intro from running prematurely */}
        <Home isLoading={isLoading} />
        <Types />
        <Journey />
        <Incredieant />
      </div>
    </>
  );
};

export default App;