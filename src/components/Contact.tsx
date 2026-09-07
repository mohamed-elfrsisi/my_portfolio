import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { useConfig } from "../context/ConfigContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const config = useConfig();

  useEffect(() => {
    const contactTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // Animate title from bottom
    contactTimeline.fromTo(
      ".contact-section h3",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate the signal-line in alongside the title
    contactTimeline.fromTo(
      ".contact-divider",
      {
        opacity: 0,
        scaleX: 0,
      },
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.7,
        ease: "power3.out",
        transformOrigin: "left center",
      },
      "-=0.5"
    );

    // Animate contact boxes with stagger from bottom
    contactTimeline.fromTo(
      ".contact-box",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Clean up
    return () => {
      contactTimeline.kill();
    };
  }, []);

  // The site-wide floating GitHub/LinkedIn/X sidebar (.icons-section) is
  // position:fixed and gets re-positioned by its own scroll logic. On the
  // Contact section that positioning lands it on top of the Email/Location
  // text and the X row above — and it's redundant here anyway, since this
  // section already renders its own Social links. Simplest fix: hide the
  // floating sidebar while Contact is in view, restore it once the person
  // scrolls back up.
  useEffect(() => {
    const iconsSidebar = document.querySelector(".icons-section");
    if (!iconsSidebar) return;

    const hideTrigger = ScrollTrigger.create({
      trigger: ".contact-section",
      start: "top 85%",
      end: "bottom bottom",
      onEnter: () =>
        gsap.to(iconsSidebar, { opacity: 0, duration: 0.3, pointerEvents: "none" }),
      onLeaveBack: () =>
        gsap.to(iconsSidebar, { opacity: 1, duration: 0.3, pointerEvents: "auto" }),
    });

    return () => {
      hideTrigger.kill();
      gsap.set(iconsSidebar, { opacity: 1, pointerEvents: "auto" });
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-glow" aria-hidden="true"></div>

      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-divider"></div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>

          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span>Github</span>
              <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span>Linkedin</span>
              <MdArrowOutward />
            </a>
            <a
              href={config.contact.x}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span>X</span>
              <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box contact-box--credit">
            <h2>
              Designed and Developed <br /> by{" "}
              <span>{config.developer.fullName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
