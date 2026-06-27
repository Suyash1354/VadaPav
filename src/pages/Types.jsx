import React, { useRef } from "react";
import gsap from "gsap";

const Types = () => {
  const Type1 = useRef(null);
  const Type2 = useRef(null);
  const Type3 = useRef(null);

  const handleMouseMove = (e, ref) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) - 0.5;
    const yPercent = (y / rect.height) - 0.5;

    gsap.to(ref.current, {
      x: xPercent * 100, 
      y: yPercent * 100,
      rotation: xPercent * 10, 
      duration: 0.9,          
      ease: "power4.out",     
      overwrite: "auto"       
    });
  };

  const handleMouseLeave = (ref) => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.75)", 
      overwrite: "auto"
    });
  };

  return (
    <section className="w-full min-h-screen bg-[#F5E3CD] py-12 md:py-20 flex flex-col justify-center items-center overflow-hidden">
      
      {/* TEXT LAYER */}
      <div className="TEXT w-full px-6 flex flex-col items-center font-[Oktabroom] justify-center text-center mb-12 md:mb-20">
        <h1 className="text-[14vw] sm:text-[10vw] lg:text-[12vw] font-[Oktabroom] text-[#F91814] lg:[-webkit-text-stroke:6px_white] md:[-webkit-text-stroke:5px_white] [-webkit-text-stroke:3px_white] flex flex-col leading-none">
          <span>MEET THE</span>
          <span>VADA GANG</span>
        </h1>
        <h1 className="text-sm sm:text-base md:text-[1.8vw] lg:text-[1.5vw] mt-4 max-w-md md:max-w-3xl leading-relaxed">
          Every Vada Pav packs a punch of crunch, <br className="hidden md:inline" />
          fiery spice, and unforgettable flavor, <br className="hidden md:inline" /> 
          bringing the true spirit of Mumbai to every bite.
        </h1>
      </div>

      {/* CARDS CONTAINER */}
      <div className="Images w-full flex flex-col md:block items-center gap-8 md:gap-0 md:h-[60vh] relative px-6 md:px-0"> 
        
        {/* Card 1 (Center Base Card) */}
        <div 
          onMouseMove={(e) => handleMouseMove(e, Type1)}
          onMouseLeave={() => handleMouseLeave(Type1)}  
          className="relative left-auto translate-x-0 w-[75vw] h-[95vw] sm:w-[50vw] sm:h-[65vw] md:absolute md:w-[30vw] md:h-[40vw] lg:w-[20vw] lg:h-[26vw] md:left-1/2 md:-translate-x-1/2 cursor-pointer flex items-center justify-center z-20"
        >
          <img 
            ref={Type1} 
            className="w-full h-full object-cover rounded-3xl md:rounded-4xl shadow-xl md:shadow-none will-change-transform" 
            src="Images/Types/Type1.webp" 
            alt="Vada Type 1" 
          />
        </div>

        {/* Card 2 (Left Overlapping Card) */}
        <div 
          onMouseMove={(e) => handleMouseMove(e, Type2)}
          onMouseLeave={() => handleMouseLeave(Type2)}  
          className="relative left-auto translate-x-0 w-[75vw] h-[95vw] sm:w-[50vw] sm:h-[65vw] md:absolute md:w-[30vw] md:h-[40vw] lg:w-[20vw] lg:h-[26vw] md:left-1/2 cursor-pointer flex items-center justify-center z-30 md:-translate-x-[125%] lg:-translate-x-[140%] md:-rotate-6"
        >
          <img 
            ref={Type2} 
            className="w-full h-full object-cover rounded-3xl md:rounded-4xl shadow-xl md:shadow-none will-change-transform" 
            src="Images/Types/Type2.webp" 
            alt="Vada Type 2" 
          />
        </div>

        {/* Card 3 (Right Overlapping Card) */}
        <div 
          onMouseMove={(e) => handleMouseMove(e, Type3)}
          onMouseLeave={() => handleMouseLeave(Type3)}  
          className="relative left-auto translate-x-0 w-[75vw] h-[95vw] sm:w-[50vw] sm:h-[65vw] md:absolute md:w-[30vw] md:h-[40vw] lg:w-[20vw] lg:h-[26vw] md:left-1/2 cursor-pointer flex items-center justify-center z-40 md:translate-x-[25%] lg:translate-x-[40%] md:rotate-6"
        >
          <img 
            ref={Type3} 
            className="w-full h-full object-cover rounded-3xl md:rounded-4xl shadow-xl md:shadow-none will-change-transform" 
            src="Images/Types/Type3.webp" 
            alt="Vada Type 3" 
          />
        </div>

      </div>
    </section>
  );
};

export default Types;