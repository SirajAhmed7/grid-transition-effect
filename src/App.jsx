import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import ReactLenis from "lenis/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

function App() {
  const sectionRef = useRef(null);
  const gridTilesRef = useRef([]);
  const headingRef = useRef(null);
  const heroVerticalLinesRef = useRef([]);
  const heroHorizontalLinesRef = useRef([]);
  const loneTileRef = useRef(null);
  const section2Ref = useRef(null);
  const section2TileRef = useRef(null);

  useGSAP(() => {
    const headingText = SplitText.create(headingRef.current, {
      type: "chars,words",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        // pinSpacing: false,
      },
    });

    const [firstWord, secondWord] = headingText.words;

    // const headingEase = CustomEase.create(
    //   "custom",
    //   // "M0,0 C0.253,0 0.688,-0.003 0.752,0.127 0.858,0.345 0.714,0.892 1,1 "
    //   // "M0,0 C0.504,0 0.636,-0.028 0.647,0.338 0.662,0.887 0.827,0.931 1,1 "
    //   // "M0,0 C0.504,0 0.572,0.029 0.647,0.338 0.779,0.884 0.827,0.931 1,1 "
    //   "M0,0 C0.504,0 0.531,0.085 0.696,0.358 0.819,0.561 0.869,0.912 1,1 "
    // );

    tl.to(firstWord, {
      yPercent: -140,
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

    // Get all images from grid tiles for simultaneous animation
    // const gridImages = gridTilesRef.current
    //   .map((tile) => tile?.querySelector("img"))
    //   .filter(Boolean);

    const gridImages = gsap.utils.toArray(
      gridTilesRef.current.map((tile) => tile?.querySelector("img"))
    );

    tl.fromTo(
      gridTilesRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        stagger: {
          each: 0.025,
          grid: "auto",
          from: "end",
          axis: "x",
        },
        // duration: 0.625,
        ease: "power4.inOut",
        willChange: "clip-path",
      }
    );

    // Animate images alongside clipPath - match loneTile approach
    tl.fromTo(
      gridImages,
      {
        autoAlpha: 1,
        scale: 1,
      },
      {
        autoAlpha: 0.999,
        // onUpdate: () => {
        //   gridImages.forEach((img) => {
        //     // img.style.display = "none";
        //     // img.offsetHeight;
        //     // img.style.display = "block";
        //     img.style.transform = "translateY(1)";
        //     img.offsetHeight;
        //     img.style.transform = "translateY(0)";
        //   });
        // },
        willChange: "clip-path",
        scale: 1.001,
        force3D: true,
      },
      "<"
    );
    tl.set(sectionRef.current, {
      background: "transparent",
    });

    tl.to(
      heroHorizontalLinesRef.current,
      {
        scaleX: 0,
        ease: "power2.inOut",
        stagger: 0.1,
      },
      "<"
    );
    tl.to(
      heroVerticalLinesRef.current,
      {
        scaleY: 0,
        ease: "power2.inOut",
        stagger: 0.1,
      },
      "<"
    );
    tl.fromTo(
      loneTileRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "power4.inOut",
        // duration: 0.5,
        willChange: "clip-path",
      },
      "<0.2"
    );

    // Animate lone tile image alongside clipPath
    tl.fromTo(
      loneTileRef.current.querySelector("img"),
      {
        autoAlpha: 1,
      },
      {
        autoAlpha: 0.999,
        ease: "power4.inOut",
      },
      "<0.2"
    );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: section2Ref.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // tl.to(section2Ref.current, {
    //   duration: 1,
    //   x: 0,
    // });

    tl2.to(section2TileRef.current, {
      clipPath:
        "polygon(0% calc(0vh), 100% calc(0vh), 100% calc(100vh), 0% calc(100vh))",
      duration: 0.5,
      willChange: "clip-path",
      delay: 1,
    });
  });

  return (
    <>
      <ReactLenis
        root
        options={{
          duration: 1.25,
          // easing: (t) => 1 - Math.pow(1 - t, 3),
          // easing: (t) => 1 - Math.pow(1 - t, 5),
        }}
      />
      <main className="bg-white">
        <section ref={sectionRef} className="h-screen relative z-10 bg-white">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-0 flex flex-col justify-evenly">
              {new Array(2).fill(1).map((_, i) => (
                <div
                  ref={(curRef) => {
                    if (
                      curRef &&
                      !heroHorizontalLinesRef.current.includes(curRef)
                    ) {
                      heroHorizontalLinesRef.current.push(curRef);
                    }
                  }}
                  className="w-full h-px bg-gray-500/60 origin-right"
                  key={`grid-divider-v-${i}`}
                ></div>
              ))}
            </div>
            <div className="absolute inset-0 flex justify-evenly">
              {new Array(4).fill(1).map((_, i) => (
                <div
                  ref={(curRef) => {
                    if (
                      curRef &&
                      !heroVerticalLinesRef.current.includes(curRef)
                    ) {
                      heroVerticalLinesRef.current.push(curRef);
                    }
                  }}
                  className="w-px h-full bg-gray-500/60 origin-bottom"
                  key={`grid-divider-h-${i}`}
                ></div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 h-full grid grid-cols-5 grid-rows-3">
            <div
              ref={loneTileRef}
              className="overflow-hidden col-start-2 row-start-2"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                willChange: "clip-path",
              }}
            >
              <img
                src={"/furniture-bg-pro.webp"}
                alt={"Interior with furniture"}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="h-full grid grid-cols-5 grid-rows-3 relative overflow-hidden">
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
                  willChange: "clip-path",
                  gridColumn: (i + 1) % 5 === 0 ? 5 : (i + 1) % 5,
                  gridRow: Math.floor(i / 5) + 1,
                }}
                key={`grid-tile-${i}`}
              >
                <img
                  src={"/furniture-bg-pro.webp"}
                  alt={"Interior with furniture"}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  // style={{
                  //   willChange: "transform",
                  // }}
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

        <section
          ref={section2Ref}
          className="h-screen relative z-0 -mt-[200vh]"
        >
          <div className="h-full relative grid grid-cols-5 grid-rows-3">
            <div
              ref={section2TileRef}
              className="overflow-hidden col-start-2 row-start-1 row-span-3"
              style={{
                clipPath:
                  "polygon(0% calc(100vh / 3), 100% calc(100vh / 3), 100% calc(100vh * 2 / 3), 0% calc(100vh * 2 / 3))",
                willChange: "clip-path",
              }}
            >
              <img
                src={"/furniture-bg-2.jpg"}
                alt={"Interior with furniture"}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
