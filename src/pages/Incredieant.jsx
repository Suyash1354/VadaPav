import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Incredieant = () => {
  const containerRef = useRef(null);
  const lastIndexRef = useRef(-1);

  const ingredients = [
    "/Images/Last/Chutney.webp",
    "/Images/Last/Mirchi.webp",
    "/Images/Last/Pav.webp",
    "/Images/Last/Vada.webp",
  ];

  useEffect(() => {
    let intervalId;

    const spawnIngredient = () => {
      if (!containerRef.current) return;

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * ingredients.length);
      } while (randomIndex === lastIndexRef.current);

      lastIndexRef.current = randomIndex;
      const randomSrc = ingredients[randomIndex];

      const img = document.createElement("img");
      img.src = randomSrc;
      img.alt = "ingredient";
      
      // Fine-tuned image sizing scale across devices
      img.className = "absolute w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-56 lg:h-56 object-contain pointer-events-none z-10";
      
      const randomX = Math.random() * 70 + 5; 
      img.style.left = `${randomX}%`;
      img.style.bottom = "-240px"; 

      containerRef.current.appendChild(img);

      const throwHeight = -(Math.random() * 45 + 45); 
      const duration = 2.5; 
      const totalSpin = Math.random() * 720 - 360; 

      const tl = gsap.timeline({
        onComplete: () => {
          img.remove(); 
        }
      });

      tl.to(img, {
        y: `${throwHeight}vh`,
        rotation: totalSpin / 2,
        duration: duration / 2,
        ease: "power1.out", 
      })
      .to(img, {
        y: "240px", 
        rotation: totalSpin,
        duration: duration / 2,
        ease: "power1.in", 
      });
    };

    for (let i = 0; i < 3; i++) {
      setTimeout(spawnIngredient, i * 450);
    }

    intervalId = setInterval(spawnIngredient, 1200);

    return () => {
      clearInterval(intervalId);
      if (containerRef.current) {
        containerRef.current.querySelectorAll("img[alt='ingredient']").forEach(img => img.remove());
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-[#F5E3CD] mt-40 lg:mt-80 overflow-hidden px-6 md:px-16 flex flex-col justify-between lg:block"
    >
      {/* DESKTOP VIEW LAYOUT (Only visible on wide screens: 1024px and up) */}
      <div className="hidden lg:block w-full pt-8 z-20 relative">
        <div className="w-full flex justify-between items-end pb-4 border-b border-black/20 font-[Oktabroom] uppercase tracking-wider text-lg lg:text-xl text-black/80">
          <div>SMASHED VADAPAV • TOASTED PAV • EST. 2026</div>
          <div>© 2026 TAPARI — ALL RIGHTS RESERVED</div>
        </div>
      </div>

      <div className="hidden lg:flex TEXT w-full h-[calc(100vh-120px)] items-end font-[Oktabroom] justify-center z-0 pb-10">
        <h1 className="text-[28vw] font-[Chadle] text-[#F91814] lg:[-webkit-text-stroke:10px_white] leading-none select-none">
          TAPARI
        </h1>
      </div>


      {/* MOBILE & TABLET VIEW LAYOUT (Active on everything below 1024px, including iPads) */}
      <div className="flex lg:hidden flex-col w-full h-full justify-center items-center pt-10 z-0">
        {/* Big Text on Top */}
        <h1 className="text-[26vw] md:text-[24vw] font-[Chadle] text-[#F91814] [-webkit-text-stroke:6px_white] md:[-webkit-text-stroke:8px_white] leading-none select-none mb-6">
          TAPARI
        </h1>

        {/* Divider Line */}
        <div className="w-full border-b border-black/20 mb-6 z-20"></div>

        {/* Subtext info blocks on bottom */}
        <div className="w-full flex flex-col items-center gap-2 font-[Oktabroom] uppercase tracking-wider text-sm md:text-xl text-black/80 text-center z-20">
          <div>SMASHED VADAPAV • TOASTED PAV • EST. 2026</div>
          <div className="opacity-70 text-xs md:text-base">
            © 2026 TAPARI — ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  );
};

export default Incredieant;