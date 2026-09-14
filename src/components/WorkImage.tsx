import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image?: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = ({ image, alt, video, link }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const showVideo = isHovering && videoReady;

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link || "#"}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        data-cursor="disable"
        onClick={(e) => {
          if (!link) {
            e.preventDefault();
          }
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}

        {image && (
          <img
            className={`work-image-preview ${
              showVideo ? "video-active" : ""
            }`}
            src={image}
            alt={alt || ""}
          />
        )}

        {video && (
          <video
            className={`work-video ${
              showVideo ? "video-active" : ""
            }`}
            src={video}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onError={(e) => {
              console.error("Video failed to load:", video, e);
            }}
          />
        )}
      </a>
    </div>
  );
};

export default WorkImage;