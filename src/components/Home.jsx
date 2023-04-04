import React from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";
import TopRatedCourses from "./user/TopRatedCourses";
import TopRatedGuidedProjects from "./user/TopRatedGuidedProjects";
import TopRatedShortCourse from "./user/TopRatedShortCourse";
import Morethanfiftyhours from "./user/Morethanfiftyhours";
import HeroSlidShow from "./user/HeroSlidShow";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen pt-2">
      <Container className="px-2 xl:p-0">
        <NotVerified />
        <HeroSlidShow />
        <div className="space-y-3 py-8">
          <TopRatedCourses />
          <TopRatedShortCourse />
          <TopRatedGuidedProjects />
          <Morethanfiftyhours />
        </div>
      </Container>
    </div>
  );
}
