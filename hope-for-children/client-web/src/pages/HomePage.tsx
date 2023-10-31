import React from "react";
import Landing from "../components/homepage_components/Landing";
import ProjectsComponent from "../components/homepage_components/ProjectsComponent";
import Statistics from "../components/homepage_components/Statistics";
import ThematicAreas from "../components/homepage_components/ThematicAreas";
import Values from "../components/homepage_components/Values";
import Partners from "../components/homepage_components/Partners";
import Layout from "../components/Layout";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-16">
        <Landing />
        <ProjectsComponent />
        <Statistics />
        <ThematicAreas />
        <Values />
        <Partners />
      </div>
    </Layout>
  );
};

export default HomePage;
