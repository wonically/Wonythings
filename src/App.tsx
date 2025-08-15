import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import BlogPage from "@/pages/blog";
import AboutMePage from "@/pages/about-me";
import ProjectsPage from "@/pages/projects";
import JourneyPage from "@/pages/journey";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<AboutMePage />} path="/about-me" />
      <Route element={<ProjectsPage />} path="/projects" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<JourneyPage />} path="/journey" />
    </Routes>
  );
}

export default App;
