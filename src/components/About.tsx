import "./styles/About.css";
import { useConfig } from "../context/ConfigContext";

const About = () => {
  const config = useConfig();

  return (
    <section className="about-section" id="about">
      <div className="about-me">
        <h3>{config.about.title}</h3>

        <p className="about-description">
          {config.about.description}
        </p>
      </div>
    </section>
  );
};

export default About;