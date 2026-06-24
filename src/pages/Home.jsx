import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Home = () => {
  const Container = useRef(null);
  const MoreTextRef = useRef(null);
  const MenuTextRef = useRef(null);
  const TopBunRef = useRef(null);
  const VadaRef = useRef(null);
  const BottomBunRef = useRef(null);
  const VadaPavImageRef = useRef(null);

  // MORE
  const MoreAnimationRun = () => {
    gsap.to(MoreTextRef.current.querySelectorAll("span"), {
      y: -40,
      duration: 0.8,
      ease: "back.out(2)",
    });

    gsap.to(MoreTextRef.current, {
      scale: 1.1,
      duration: 0.8,
      ease: "back.out(2)",
    });
  };

  const MoreAnimationReverse = () => {
    gsap.to(MoreTextRef.current.querySelectorAll("span"), {
      y: 0,
      duration: 0.8,
      ease: "back.out(2)",
    });

    gsap.to(MoreTextRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "back.out(2)",
    });
  };

  // MENU
  const MenuAnimationRun = () => {
    gsap.to(MenuTextRef.current.querySelectorAll("span"), {
      y: -40,
      duration: 0.8,
      ease: "back.out(2)",
    });

    gsap.to(MenuTextRef.current, {
      scale: 1.1,
      duration: 0.8,
      ease: "back.out(2)",
    });
  };

  const MenuAnimationReverse = () => {
    gsap.to(MenuTextRef.current.querySelectorAll("span"), {
      y: 0,
      duration: 0.8,
      ease: "back.out(2)",
    });

    gsap.to(MenuTextRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "back.out(2)",
    });
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from([".logo", ".more", ".menu"], {
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
      });

      tl.from(TopBunRef.current, {
        scale: 0,
        rotate: -360,
        duration: 2,
        ease: "back.out",
      });

      tl.from(
        VadaRef.current,
        {
          scale: 0,

          duration: 2,
          ease: "back.out",
        },
        "<",
      );

      tl.from(
        BottomBunRef.current,
        {
          scale: 0,
          rotate: 360,
          duration: 2,
          ease: "back.out",
        },
        "<",
      )

        .to(
          VadaPavImageRef.current,
          {
            y: -4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "<",
        );

      tl.from(
        ".vada-text",
        {
          scale: 0,
          opacity: 0,
          rotation: -15,
          duration: 1,
          ease: "back.out(2)",
        },
        "<1",
      );

      tl.from(
        ".pav-text",
        {
          scale: 0,
          opacity: 0,
          rotation: 15,
          duration: 1,
          ease: "back.out(2)",
        },
        "<",
      );

      tl.from(".bottom-text", {
        y: 80,
        opacity: 0,
        skewY: 8,
        duration: 1,
        stagger: 0.25,
        ease: "power4.out",
      });
    },

    { scope: Container },
  );

  return (
    <section
      ref={Container}
      className="w-full h-screen bg-[#F5E3CD] overflow-hidden"
    >
      <div className="Container w-full h-screen">
        <div className="Text w-full h-screen">
          <div className="Nav w-full h-26 flex justify-between items-center px-8">
            <h1 className="logo lg:text-[3.5vw] md:text-[6vw] text-[10vw] font-[Modak-Regular] text-[#F91814] [-webkit-text-stroke:2px_white]">
              TAPRI
            </h1>

            <div className="w-fit flex lg:gap-8 gap-6 items-center font-[Oktabroom]">
              {/* MORE */}
              <h1
                ref={MoreTextRef}
                onMouseEnter={MoreAnimationRun}
                onMouseLeave={MoreAnimationReverse}
                className="more hidden lg:inline-flex cursor-pointer bg-[#F91814] lg:text-[1.2vw] text-[4vw] text-[#F5E3CD] rounded-full lg:py-3 lg:px-8 px-6 py-2 flex-col gap-2 overflow-hidden h-[3vw] aspect-square lg:aspect-auto"
              >
                <span>MORE</span>
                <span>MORE</span>
              </h1>

              {/* MENU */}
              <h1
                ref={MenuTextRef}
                onMouseEnter={MenuAnimationRun}
                onMouseLeave={MenuAnimationReverse}
                className="menu hidden lg:flex cursor-pointer border-2 border-zinc-500 lg:text-[1.2vw] text-[4vw] text-black rounded-full lg:py-3 lg:px-8 px-6 py-2 flex-col gap-2 overflow-hidden h-[3vw] aspect-square lg:aspect-auto"
              >
                <span>MENU</span>
                <span>MENU</span>
              </h1>
            </div>
          </div>

          <div className="CenterText w-full lg:h-fit md:h-80 h-60 flex justify-center items-center">
            <h1 className="text-[22vw] font-[Chadle] text-[#F91814] lg:[-webkit-text-stroke:8px_white] [-webkit-text-stroke:4px_white]">
              <span className="vada-text inline-block mr-[4vw]">VADA</span>
              <span className="pav-text inline-block">PAV</span>
            </h1>
          </div>

          <div className="absolute  overflow-hidden bottom-8 left-0 w-full lg:h-60 lg:flex lg:flex-row flex flex-col items-center lg:justify-between justify-end gap-3 px-6 lg:px-20 font-[Oktabroom] text-zinc-800">
            <div className="overflow-hidden flex justify-center">
              <h1 className="bottom-text text-sm md:text-[3vw] lg:text-2xl lg:w-80 w-[80%] text-center rounded-md p-1">
                Crispy potato filling wrapped in golden besan batter.
              </h1>
            </div>
             

            <div className="overflow-hidden flex justify-center">
              <h1 className="bottom-text text-sm md:text-[3vw] lg:text-2xl lg:w-80 w-[80%] text-center rounded-md p-1">
                Served hot with fiery thecha and sweet garlic chutney.
              </h1>
            </div>
          </div>
        </div>

        

        <div
          ref={VadaPavImageRef}
          className="VadaPavImages w-full h-screen absolute inset-0 pointer-events-none flex justify-center items-center"
        >
          <img
            ref={TopBunRef}
            className="absolute lg:w-[30vw] w-[60vw] object-cover z-20"
            src="Images/Home/topbun.png"
            alt=""
          />
          <img
            ref={VadaRef}
            className="absolute lg:w-[30vw] w-[60vw] object-cover z-10"
            src="Images/Home/Vada.png"
            alt=""
          />
          <img
            ref={BottomBunRef}
            className="absolute lg:w-[30vw] w-[60vw] object-cover z-10"
            src="Images/Home/bottombun.png"
            alt=""
          />
        </div>

        
      </div>
    </section>
  );
};

export default Home;
