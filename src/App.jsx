import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ReactLenis from "lenis/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

function App() {
  const gridTilesRef = useRef([]);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const headingText = SplitText.create(headingRef.current, {
      type: "chars,words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
      },
    });

    const [firstWord, secondWord] = headingText.words;

    const headingEase = CustomEase.create(
      "custom",
      // "M0,0 C0.253,0 0.688,-0.003 0.752,0.127 0.858,0.345 0.714,0.892 1,1 "
      // "M0,0 C0.504,0 0.636,-0.028 0.647,0.338 0.662,0.887 0.827,0.931 1,1 "
      // "M0,0 C0.504,0 0.572,0.029 0.647,0.338 0.779,0.884 0.827,0.931 1,1 "
      "M0,0 C0.504,0 0.531,0.085 0.696,0.358 0.819,0.561 0.869,0.912 1,1 "
    );

    tl.to(firstWord, {
      yPercent: -120,
      ease: "expo.in",
      duration: 0.5,
    });
    tl.to(
      secondWord,
      {
        xPercent: -225,
        ease: "expo.in",
        duration: 0.5,
      },
      "<"
    );

    tl.to(gridTilesRef.current, {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      stagger: {
        each: 0.025,
        grid: "auto",
        from: "end",
        axis: "x",
      },
      ease: "power4.inOut",
    });
  });

  return (
    <>
      <ReactLenis
        root
        options={
          {
            // duration: 1.5,
            // easing: (t) => 1 - Math.pow(1 - t, 3),
            // easing: (t) => 1 - Math.pow(1 - t, 5),
          }
        }
      />
      <main>
        <section ref={sectionRef} className="h-screen bg-white">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 flex flex-col justify-evenly">
              {new Array(2).fill(1).map((_, i) => (
                <div
                  className="w-full h-px bg-gray-400/50"
                  key={`grid-divider-v-${i}`}
                ></div>
              ))}
            </div>
            <div className="absolute inset-0 flex justify-evenly">
              {new Array(4).fill(1).map((_, i) => (
                <div
                  className="w-px h-full bg-gray-400/50"
                  key={`grid-divider-h-${i}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 h-full grid grid-cols-5 grid-rows-3">
            <div className="overflow-hidden col-start-2 row-start-2">
              <img
                src={"/furniture-bg-pro.jpg"}
                alt={"Interior with furniture"}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="h-full grid grid-cols-5 grid-rows-3 relative">
            {new Array(5 * 3).fill(1).map((_, i) => (
              <div
                ref={(curRef) => {
                  if (curRef && !gridTilesRef.current.includes(curRef)) {
                    gridTilesRef.current.push(curRef);
                  }
                }}
                className="bg-gray-900 overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  gridColumn: (i + 1) % 5 === 0 ? 5 : (i + 1) % 5,
                  gridRow: Math.floor(i / 5) + 1,
                }}
                key={`grid-tile-${i}`}
              >
                <img
                  src={"/furniture-bg-pro.jpg"}
                  alt={"Interior with furniture"}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            ))}
            {/* <div className="col-start-3 col-span-3 row-start-3 z-10 content-center"> */}
            <div
              className="z-10 content-center overflow-hidden"
              style={{
                gridColumn: "-4 / -1",
                gridRow: "-2 / -1",
              }}
            >
              <h2
                ref={headingRef}
                className="text-[7vw] text-white text-center"
              >
                Design Forward
              </h2>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
