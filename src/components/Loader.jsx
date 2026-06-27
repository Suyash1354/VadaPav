import React, { useEffect, useState } from "react";

const Loader = ({ isLoading = true }) => {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadingOut(true);

      const timeout = setTimeout(() => {
        setVisible(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5E3CD] transition-opacity duration-500 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Wrapper */}
      <div className="relative flex flex-col items-center">
        {/* Route */}
        <div className="relative w-[85vw] max-w-[650px] h-[120px] md:h-[140px] scale-100 md:scale-[1.15] lg:scale-[1.35]">
          {/* Dashed Track */}
          <div
            className="absolute top-[18px] left-4 right-4 h-1 rounded-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #F9BF2A 0px, #F9BF2A 14px, transparent 14px, transparent 26px)",
            }}
          />

          {/* CSMT */}
          <div className="absolute top-[18px] left-4 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] lg:w-[15px] lg:h-[15px] rounded-full bg-[#F91814] border-2 md:border-[3px] border-[#FFFDF8] box-content -translate-y-1/2" />

            <span className="font-[Oktabroom] text-sm md:text-lg lg:text-xl text-[#F91814] whitespace-nowrap">
              CSMT
            </span>
          </div>

          {/* DADAR */}
          <div className="absolute top-[18px] left-[calc(100%-1rem)] -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="w-[10px] h-[10px] md:w-[13px] md:h-[13px] lg:w-[15px] lg:h-[15px] rounded-full bg-[#F91814] border-2 md:border-[3px] border-[#FFFDF8] box-content -translate-y-1/2" />

            <span className="font-[Oktabroom] text-sm md:text-lg lg:text-xl text-[#F91814] whitespace-nowrap">
              DADAR
            </span>
          </div>

          {/* Train */}
          <div className="absolute top-[18px] left-4 train-wrap">
            <span className="puff" />
            <span className="puff p2" />
            <span className="puff p3" />

            <div className="w-10 h-6 md:w-12 md:h-7 lg:w-14 lg:h-8 relative drop-shadow-[0_4px_4px_rgba(0,0,0,0.18)]">
              <svg
                viewBox="0 0 40 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <rect
                  x="1"
                  y="4"
                  width="32"
                  height="14"
                  rx="3"
                  fill="#F91814"
                />

                <rect
                  x="1"
                  y="4"
                  width="32"
                  height="4"
                  rx="2"
                  fill="#FFD750"
                />

                <rect
                  x="4"
                  y="18"
                  width="5"
                  height="3.5"
                  rx="1"
                  fill="#3C2A1E"
                />

                <rect
                  x="24"
                  y="18"
                  width="5"
                  height="3.5"
                  rx="1"
                  fill="#3C2A1E"
                />

                <rect
                  x="6"
                  y="8.5"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#FFFDF8"
                />

                <rect
                  x="14"
                  y="8.5"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#FFFDF8"
                />

                <rect
                  x="22"
                  y="8.5"
                  width="5"
                  height="5"
                  rx="1"
                  fill="#FFFDF8"
                />

                <rect
                  x="33"
                  y="3"
                  width="4"
                  height="7"
                  rx="1.5"
                  fill="#B5470F"
                />

                <rect
                  x="36.5"
                  y="1"
                  width="2.5"
                  height="4"
                  rx="1"
                  fill="#3C2A1E"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="font-[Oktabroom] text-lg md:text-xl lg:text-2xl text-[#B5470F] tracking-[0.15em] -mt-4 md:-mt-2 whitespace-nowrap">
          Loading...
        </p>
      </div>

      <style>{`
        .train-wrap {
          transform: translate(0, -65%);
          animation: tapri-ride 2.6s cubic-bezier(0.45, 0, 0.2, 1) infinite;
        }

        @keyframes tapri-ride {
          0% {
            transform: translate(0, -65%);
          }

          8% {
            transform: translate(0, -65%);
          }

          50% {
            transform: translate(calc(85vw - 90px), -65%);
          }

          58% {
            transform: translate(calc(85vw - 90px), -65%);
          }

          100% {
            transform: translate(0, -65%);
          }
        }

        @media (min-width: 768px) {
          @keyframes tapri-ride {
            0% {
              transform: translate(0, -65%);
            }

            8% {
              transform: translate(0, -65%);
            }

            50% {
              transform: translate(calc(min(650px, 85vw) - 90px), -65%);
            }

            58% {
              transform: translate(calc(min(650px, 85vw) - 90px), -65%);
            }

            100% {
              transform: translate(0, -65%);
            }
          }
        }

        .puff {
          position: absolute;
          top: -4px;
          left: 34px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fffdf8;
          opacity: 0;
          animation: tapri-puff 2.6s cubic-bezier(0.45, 0, 0.2, 1)
            infinite;
        }

        .puff.p2 {
          left: 36px;
          top: -2px;
          animation-delay: 0.15s;
        }

        .puff.p3 {
          left: 38px;
          top: 0px;
          animation-delay: 0.3s;
        }

        @keyframes tapri-puff {
          0%,
          8% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }

          12% {
            opacity: 0.85;
          }

          24% {
            opacity: 0;
            transform: translateY(-18px) scale(1.4);
          }

          50%,
          58% {
            opacity: 0;
          }

          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .train-wrap,
          .puff {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;