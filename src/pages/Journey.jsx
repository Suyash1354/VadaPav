import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import React, { useRef, useState, useEffect } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

/**
 * Journey
 *
 * Desktop (>= 1024px): original diagonal/curvy path, train rides it,
 * city cards scattered left/right with mouse-tilt hover.
 *
 * Mobile & Tablet (< 1024px): a separate, dedicated layout —
 *  - straight vertical SVG path running top to bottom
 *  - train follows it top->bottom as the user scrolls
 *  - heading + all 4 city cards stacked vertically, one under another
 *  - no mouse-tilt hover (no pointer device), tap-friendly sizing
 *
 * The two layouts are built and animated completely separately so the
 * path geometry, scroll distances, and DOM structure can each be tuned
 * independently instead of forcing one timeline to cover both shapes.
 */

const CITIES = [
  { key: "mumbai", label: "MUMBAI", img: "Images/Journey/India.webp", alt: "India" },
  { key: "london", label: "LONDON", img: "Images/Journey/London.webp", alt: "London" },
  { key: "newyork", label: "NEW YORK", img: "Images/Journey/York.webp", alt: "York" },
  { key: "tokyo", label: "TOKYO", img: "Images/Journey/Tokyo.webp", alt: "Tokyo" },
];

// Matches the lg breakpoint (1024px) — below this we render the
// stacked, vertical-path mobile/tablet experience.
const MOBILE_BREAKPOINT = 1024;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

const Journey = () => {
  const isMobile = useIsMobile();

  return isMobile ? <JourneyMobile /> : <JourneyDesktop />;
};

/* ------------------------------------------------------------------ */
/*  DESKTOP LAYOUT (>= 1024px) — original diagonal path, unchanged    */
/*  aside from removing the debug `markers: true`                     */
/* ------------------------------------------------------------------ */

const JourneyDesktop = () => {
  const SectionRef = useRef(null);
  const ContainerRef = useRef(null);
  const TrainRef = useRef(null);
  const pathRef = useRef(null);

  const MumbaiRef = useRef(null);
  const LondonRef = useRef(null);
  const NewYorkRef = useRef(null);
  const TokyoRef = useRef(null);

  const handleMouseMove = (e, ref) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;

    gsap.to(ref.current, {
      x,
      y,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (ref) => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: SectionRef.current,
        start: "top top",
        end: "+=3200",
        scrub: 6,
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

    gsap.to(ContainerRef.current, {
      clipPath: "ellipse(150% 100% at 50% 100%)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <section
      ref={SectionRef}
      className="w-full h-full bg-[#F5E3CD] overflow-hidden"
    >
      <div
        ref={ContainerRef}
        className="w-full min-h-screen bg-[#FFD750] relative"
        style={{ clipPath: "ellipse(140% 98% at 40% 100%)" }}
      >
        <div className="Train-SVG">
          <img
            ref={TrainRef}
            className="w-60 h-40 object-cover absolute -top-10 left-0 drop-shadow-[0_10px_2px_rgba(0,0,0,0.2)]"
            src="Images/Journey/Train.webp"
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
              strokeWidth="8"
              strokeDasharray="22 40"
              strokeLinecap="round"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="CONTENT w-full h-screen absolute z-50 top-0 left-0">
          <div className="MAIN-CONTENT absolute p-8 top-80">
            <h1 className="font-[Chadle] text-white flex flex-col leading-none">
              <span className="text-[6vw] [-webkit-text-stroke:6px_#FCC939]">
                SPREADING
              </span>
              <span className="text-[12vw] [-webkit-text-stroke:8px_#FCC939]">
                THE SPICE
              </span>
            </h1>

            <h1 className="font-[Oktabroom] text-[1.5vw] w-120">
              No matter where life takes you, the taste of Mumbai is never far
              away. Our signature Vada Pav brings the city's bold flavors to
              every corner of the world.
            </h1>
          </div>

          <div className="Images w-full absolute">
            <div
              ref={MumbaiRef}
              className="absolute top-150 right-40"
              onMouseMove={(e) => handleMouseMove(e, MumbaiRef)}
              onMouseLeave={() => handleMouseLeave(MumbaiRef)}
            >
              <h2 className="font-[Modak-Regular] text-5xl text-[#F91814] text-center mb-4 [-webkit-text-stroke:3px_white]">
                MUMBAI
              </h2>
              <img
                className="w-70 h-90 object-cover rounded-4xl"
                src="Images/Journey/India.webp"
                alt="India"
              />
            </div>

            <div
              ref={LondonRef}
              className="absolute top-500 right-100"
              onMouseMove={(e) => handleMouseMove(e, LondonRef)}
              onMouseLeave={() => handleMouseLeave(LondonRef)}
            >
              <h2 className="font-[Modak-Regular] text-5xl text-[#F91814] text-center mb-4 [-webkit-text-stroke:3px_white]">
                LONDON
              </h2>
              <img
                className="w-70 h-90 object-cover rounded-4xl"
                src="Images/Journey/London.webp"
                alt="London"
              />
            </div>

            <div
              ref={NewYorkRef}
              className="absolute top-340 left-0"
              onMouseMove={(e) => handleMouseMove(e, NewYorkRef)}
              onMouseLeave={() => handleMouseLeave(NewYorkRef)}
            >
              <h2 className="font-[Modak-Regular] text-5xl text-[#F91814] text-center mb-4 [-webkit-text-stroke:3px_white]">
                NEW YORK
              </h2>
              <img
                className="w-70 h-90 object-cover rounded-4xl"
                src="Images/Journey/York.webp"
                alt="York"
              />
            </div>

            <div
              ref={TokyoRef}
              className="absolute top-640 left-40"
              onMouseMove={(e) => handleMouseMove(e, TokyoRef)}
              onMouseLeave={() => handleMouseLeave(TokyoRef)}
            >
              <h2 className="font-[Modak-Regular] text-5xl text-[#F91814] text-center mb-4 [-webkit-text-stroke:3px_white]">
                TOKYO
              </h2>
              <img
                className="w-70 h-90 object-cover rounded-4xl"
                src="Images/Journey/Tokyo.webp"
                alt="Tokyo"
              />
            </div>
          </div>
        </div>

        <img
          className="w-full absolute -bottom-20 left-0 z-0"
          src="/Images/wave.svg"
          alt=""
        />
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MOBILE / TABLET LAYOUT (< 1024px)                                  */
/*  Straight vertical path, train travels top -> bottom on scroll,    */
/*  all content stacked in a single column.                           */
/* ------------------------------------------------------------------ */

// One "row height" per stop along the path, in px. The SVG and the
// scroll distance are both derived from this so they always agree.
const ROW_HEIGHT = 600;
const ROW_COUNT = CITIES.length + 1; // +1 for the hero/heading row
const SVG_HEIGHT = ROW_HEIGHT * ROW_COUNT;
const SVG_WIDTH = 400;
const PATH_X = SVG_WIDTH / 2; // dead-center vertical line

// How far up from the bottom of each row the train should ride, so it
// visually trails just beneath each city's image instead of floating
// at the row's vertical center. Tune this against your image height.
const TRAIN_BOTTOM_OFFSET = 70;

const JourneyMobile = () => {
  const SectionRef = useRef(null);
  const ContainerRef = useRef(null);
  const TrainRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: SectionRef.current,
        start: "top top",
        end: `+=${SVG_HEIGHT}`,
        scrub: 1.2,
      },
    });

    // Drive the train by an explicit Y tween rather than strict
    // motionPath alignment. This guarantees it always sits near the
    // BOTTOM of each row (just under that row's image) as the user
    // scrolls from row to row, top to bottom.
    tl.fromTo(
      TrainRef.current,
      { y: ROW_HEIGHT - TRAIN_BOTTOM_OFFSET },
      {
        y: SVG_HEIGHT - TRAIN_BOTTOM_OFFSET,
        ease: "none",
      }
    );

    gsap.to(ContainerRef.current, {
      clipPath: "ellipse(150% 100% at 50% 100%)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section
      ref={SectionRef}
      className="w-full bg-[#F5E3CD] overflow-hidden relative"
    >
      <div
        ref={ContainerRef}
        className="w-full bg-[#FFD750] relative"
        style={{ clipPath: "ellipse(140% 98% at 50% 100%)" }}
      >
        {/* Straight vertical track, spans the full scroll length */}
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d={`M ${PATH_X},0 L ${PATH_X},${SVG_HEIGHT}`}
            fill="none"
            stroke="#F9BF2A"
            strokeWidth="8"
            strokeDasharray="22 40"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        {/* Train rides down the track, explicitly pinned near the
            bottom of each row by the GSAP y-tween above */}
        <img
          ref={TrainRef}
          className="w-28 sm:w-36 h-auto object-contain absolute top-0 left-1/2 -translate-x-1/2 z-0 drop-shadow-[0_10px_2px_rgba(0,0,0,0.2)] rotate-90"
          src="Images/Journey/Train.webp"
          alt=""
        />

        {/* Hero heading row — pt clears the domed clip-path cap so text
            never overlaps the curve, it sits fully below it */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6 pt-40 sm:pt-48"
          style={{ height: ROW_HEIGHT }}
        >
          <h1 className="font-[Chadle] text-white flex flex-col leading-none">
            <span className="text-[9vw] sm:text-[6vw] [-webkit-text-stroke:2px_#FCC939]">
              SPREADING
            </span>
            <span className="text-[16vw] sm:text-[11vw] [-webkit-text-stroke:4px_#FCC939]">
              THE SPICE
            </span>
          </h1>

          <p className="font-[Oktabroom] text-base sm:text-lg max-w-md mt-4">
            No matter where life takes you, the taste of Mumbai is never far
            away. Our signature Vada Pav brings the city's bold flavors to
            every corner of the world.
          </p>
        </div>

        {/* City stops, stacked one under another in scroll order */}
        {CITIES.map((city) => (
          <div
            key={city.key}
            className="relative z-10 flex flex-col items-center justify-center px-6"
            style={{ height: ROW_HEIGHT }}
          >
            <h2 className="font-[Modak-Regular] text-4xl sm:text-5xl text-[#F91814] text-center mb-4 [-webkit-text-stroke:3px_white]">
              {city.label}
            </h2>
            <img
              className="w-56 sm:w-72 h-72 sm:h-96 object-cover rounded-4xl shadow-lg"
              src={city.img}
              alt={city.alt}
            />
          </div>
        ))}

        
      </div>
    </section>
  );
};

export default Journey;