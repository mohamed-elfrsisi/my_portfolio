import { Link } from "react-router-dom";
import { useConfig } from "../context/ConfigContext";
import "./MyWorks.css";

const MyWorks = () => {
  const config = useConfig();
  // Handle project click
  const handleProjectClick = (link: string) => {
    if (link) {
      window.open(link, "_blank"); // Opens in new tab
    }
  };

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all my projects and creations</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div
            className="myworks-card myworks-card-clickable"
            key={project.id}
            onClick={() => handleProjectClick(project.link)}
            style={{ cursor: project.link ? "pointer" : "default" }}
          >
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              {project.link && (
                <div className="project-link-indicator">
                  🔗 Click to view project
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;