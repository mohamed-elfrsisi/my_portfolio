import { useEffect, useRef } from "react";
import "./styles/CornerWeb.css";
import gsap from "gsap";

/**
 * A cobweb tucked in the top-left corner, with a small spider that
 * twitches when the cursor wanders close. Purely decorative, pointer-events: none.
 */
const CornerWeb = () => {
  const spiderRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spider = spiderRef.current!;
    const web = webRef.current!;
    let alert = false;

    const handleMove = (e: MouseEvent) => {
      const distance = Math.hypot(e.clientX - 40, e.clientY - 40);
      const near = distance < 260;

      if (near && !alert) {
        alert = true;
        gsap.to(spider, { y: 10, duration: 0.25, ease: "power2.out" });
        spider.classList.add("spider-alert");
      } else if (!near && alert) {
        alert = false;
        gsap.to(spider, { y: 0, duration: 0.6, ease: "power2.inOut" });
        spider.classList.remove("spider-alert");
      }
    };

    document.addEventListener("mousemove", handleMove);

    gsap.to(web, {
      rotation: 3,
      duration: 8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    gsap.to(spider, {
      scale: 1.05,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      gsap.killTweensOf(web);
      gsap.killTweensOf(spider);
    };
  }, []);

  return (
    <div className="corner-web" aria-hidden="true" ref={webRef}>
      <svg viewBox="0 0 180 180" width="180" height="180">
        <g stroke="rgba(202, 191, 174, 0.3)" strokeWidth="0.8" fill="none">
          {/* radial spokes */}
          <line x1="0" y1="0" x2="175" y2="0" />
          <line x1="0" y1="0" x2="171.6" y2="34.1" />
          <line x1="0" y1="0" x2="161.7" y2="67" />
          <line x1="0" y1="0" x2="145.5" y2="97.2" />
          <line x1="0" y1="0" x2="123.7" y2="123.7" />
          <line x1="0" y1="0" x2="97.2" y2="145.5" />
          <line x1="0" y1="0" x2="67" y2="161.7" />
          <line x1="0" y1="0" x2="34.1" y2="171.6" />
          <line x1="0" y1="0" x2="0" y2="175" />

          {/* spiral rings, hand-drawn irregularity so it doesn't look like perfect circles */}
          <path d="M 30 0 Q 33.1 5.2 32.3 6.4 Q 32.7 11.2 29.1 12.1 Q 28.2 15.8 23.2 15.5 Q 23.3 19.4 19.3 19.3 Q 20.2 24.4 17 25.5 Q 16.8 30 12.6 30.5 Q 11.3 32.4 6 30.4 Q 5 30.9 0 27.5" strokeWidth="0.6" />
          <path d="M 57.7 0 Q 57.6 7.3 53.5 10.6 Q 52.8 17.3 48.1 19.9 Q 48.4 26.9 44.8 29.9 Q 44.7 37.3 40.6 40.6 Q 38.2 46.1 31.9 47.7 Q 28.3 50.8 20.6 49.8 Q 17.4 52.4 10.1 51 Q 7.1 54.8 0 54.5" strokeWidth="0.65" />
          <path d="M 82.7 0 Q 83.8 10 80.9 16.1 Q 82.2 26.5 79.4 32.9 Q 78.3 42.9 73.2 48.9 Q 68.9 56.7 60.6 60.6 Q 55.2 66.5 45.8 68.5 Q 40.7 74.5 31.7 76.6 Q 26.3 82.7 16.9 84.9 Q 10.4 88.4 0 87.9" strokeWidth="0.7" />
          <path d="M 119.2 0 Q 121.7 14 120.2 23.9 Q 118.5 37.3 112.9 46.8 Q 107.8 58.3 98.6 65.9 Q 92.7 76.3 82.8 82.8 Q 76.7 93.2 66.6 99.6 Q 58.8 108.5 47 113.5 Q 37.4 118.4 23.7 119.4 Q 13.9 120.7 0 118.1" strokeWidth="0.75" />
          <path d="M 158 0 Q 157.2 17.2 152.4 30.3 Q 148.5 46.3 140.6 58.3 Q 136 73.7 127.3 85.1 Q 121.1 100 110.9 110.9 Q 101.3 123 87.7 131.2 Q 75.4 139.1 59.2 142.9 Q 46.4 148 29.7 149.1 Q 16.8 153.4 0 153.7" strokeWidth="0.8" />
        </g>

        {/* dew-drop catch lights — dim amber, like candlelight caught on old silk, not a bright highlight */}
        <g fill="rgba(217, 161, 92, 0.55)">
          <circle cx="44.8" cy="29.9" r="1.1" />
          <circle cx="98.6" cy="65.9" r="1.2" />
          <circle cx="20.6" cy="49.8" r="1" />
          <circle cx="140.6" cy="58.3" r="1.3" />
        </g>
      </svg>
      <div className="spider" ref={spiderRef}>
        <div className="spider-thread" />
        <div className="spider-body">
          <span className="spider-leg spider-leg--l1" />
          <span className="spider-leg spider-leg--l2" />
          <span className="spider-leg spider-leg--l3" />
          <span className="spider-leg spider-leg--l4" />
          <span className="spider-leg spider-leg--r1" />
          <span className="spider-leg spider-leg--r2" />
          <span className="spider-leg spider-leg--r3" />
          <span className="spider-leg spider-leg--r4" />
        </div>
      </div>
    </div>
  );
};

export default CornerWeb;