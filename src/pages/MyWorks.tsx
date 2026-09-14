import { useState } from "react";
import { Link } from "react-router-dom";
import { useConfig } from "../context/ConfigContext";
import "./MyWorks.css";

const MyWorks = () => {
  const config = useConfig();

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="myworks-page">
      {/* Header */}
      <div className="myworks-header">
        <Link
          to="/"
          className="back-button"
          data-cursor="disable"
        >
          ← Back to Home
        </Link>

        <h1>
          All <span>Works</span>
        </h1>

        <p>
          A collection of all my projects and creations
        </p>
      </div>

      {/* Projects */}
      <div className="myworks-grid">
        {config.projects.map((project, index) => {
          const hasVideo = Boolean(project.video);
          const isHovered = hoveredProject === project.id;

          return (
            <div
              className={`myworks-card ${
                project.link ? "myworks-card-clickable" : ""
              }`}
              key={project.id}
              onClick={() => handleProjectClick(project.link)}
              style={{
                cursor: project.link ? "pointer" : "default",
              }}
              onMouseEnter={() => {
                if (hasVideo) {
                  setHoveredProject(project.id);
                }
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
              }}
            >
              {/* Number */}
              <div className="myworks-card-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Media */}
              <div className="myworks-card-image">
                {project.image && (
                  <img
                    className={`myworks-image ${
                      isHovered ? "myworks-image-hidden" : ""
                    }`}
                    src={project.image}
                    alt={project.title}
                  />
                )}

                {project.video && (
                  <video
                    className={`myworks-video ${
                      isHovered ? "myworks-video-visible" : ""
                    }`}
                    src={project.video}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />
                )}

                {/* Video indicator */}
                {hasVideo && (
                  <div className="video-indicator">
                    {isHovered ? "VIDEO" : "HOVER TO PLAY"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="myworks-card-info">
                <h3>{project.title}</h3>

                <p className="myworks-card-category">
                  {project.category}
                </p>

                <p className="myworks-card-description">
                  {project.description}
                </p>

                <p className="myworks-card-tech">
                  {project.technologies}
                </p>

                {project.link && (
                  <div className="project-link-indicator">
                    🔗 Click to view project
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;