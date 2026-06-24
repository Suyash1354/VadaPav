import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);
import React from "react";
import { useRef } from "react";

const Journey = () => {
  const SectionRef = useRef(null);
  const ContainerRef = useRef(null);
  const TrainRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: SectionRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        markers: true,
      },
    });

    tl.to(TrainRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: 0,
        end: 1,
      },
    });
  });

  return (
    <section
      ref={SectionRef}
      className="w-full min-h-screen bg-[#F5E3CD] overflow-hidden"
    >
      <div
        ref={ContainerRef}
        className="w-full min-h-screen bg-[#FFD750] relative"
        style={{
          clipPath: "ellipse(140% 98% at 40% 100%)",
        }}
      >
        <div className="Train-SVG">
          <img
            ref={TrainRef}
            className="w-60 h-40 object-cover absolute top-0 left-0 drop-shadow-[0_10px_1px_rgba(0,0,0,0.2)]"
            src="Images/Journey/Train.png"
            alt=""
          />
          <svg
            width="1920"
            height="3240"
            viewBox="0 0 1920 3240"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={pathRef}
              d="M 870,0
       C 1050,170 1300,330 1480,520
       C 1620,670 1700,800 1660,920
       C 1610,1070 1350,1100 1080,1140
       C 760,1190 320,1220 110,1370
       C -40,1480 -30,1620 140,1720
       C 380,1860 880,1810 1180,1930
       C 1430,2030 1520,2170 1380,2290
       C 1200,2440 760,2410 470,2490
       C 230,2555 110,2660 210,2780
       C 330,2920 720,2900 1020,2980
       C 1270,3045 1460,3120 1500,3240"
              fill="none"
              stroke="#F9BF2A"
              stroke-width="8"
              stroke-dasharray="22 40"
              stroke-linecap="round"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="CONTENT w-full h-screen  absolute z-50 top-0 left-0">
          <div className="MAIN-CONTENT  absolute p-8 top-80">
            <h1 className=" font-[Chadle] text-white [-webkit-text-stroke:4px_#FCC939]  flex flex-col leading-none ">
              <span className="text-[6vw]">SPREADING </span>
              <span className="text-[12vw]">THE SPICE</span>
            </h1>
            <h1 className="font-[Oktabroom] text-[1.5vw] w-120">No matter where life takes you, the taste of Mumbai is never far away. Our signature Vada Pav brings the city's bold flavors to every corner of the world.</h1>
          </div>

          <div className="Images w-full absolute top-0">

            <img className="" src="Images/Journey/Pataka.png" alt="" />

          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;

{
  /*
       
    tl.to(ContainerRef.current, {
      clipPath: "ellipse(150% 100% at 50% 100%)",
      duration: 1,

      repeat: -1,
      yoyo: true,
    });
    */
}
