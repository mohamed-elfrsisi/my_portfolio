import {
  FaGithub,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { useConfig } from "../context/ConfigContext";

const SocialIcons = () => {
  const config = useConfig();
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={config.contact.github} target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href={config.contact.x} target="_blank" rel="noopener noreferrer">
            <FaXTwitter />
          </a>
        </span>
      </div>
      <a className="resume-button" href="https://docs.google.com/document/d/1zU-hd53siupHFKcka7ICcH4D8amzFynv/edit?usp=sharing&ouid=100147765823374646200&rtpof=true&sd=true" target = "_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;