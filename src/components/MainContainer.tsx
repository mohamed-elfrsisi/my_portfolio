import { PropsWithChildren, useEffect, useState } from "react";

import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import CornerWeb from "./CornerWeb";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import CallToAction from "./CallToAction";

import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState(
    window.innerWidth > 1024
  );

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopView(window.innerWidth > 1024);
      setSplitText();
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />

      <CornerWeb />

      <Navbar />

      <SocialIcons />

      {/* 3D Character - Desktop only */}
      {isDesktopView && !isMobile && children}

      {/* Main Portfolio Content */}
      <Landing />

      <About />

      <WhatIDo />

      <Career />

      <Work />

      <TechStackNew />

      <CallToAction />

      <Contact />
    </div>
  );
};

export default MainContainer;