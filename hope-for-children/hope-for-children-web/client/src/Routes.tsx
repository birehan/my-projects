import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import OurWorkPage from "./pages/OurWorkPage";
import Alumni from "./pages/AlumniPage";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import DontationPage from "./pages/DontationPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ProgramsPage from "./pages/ProgramsPage";
import StaffsPage from "./pages/StaffsPage";
import GalleryDetailPage from "./pages/GalleryDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";
import ServerErrorPage from "./pages/ServerErrorPage";

function RoutesPaths() {
  return [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/acheivements",
      element: <OurWorkPage />,
    },
    {
      path: "/alumni",
      element: <Alumni />,
    },
    {
      path: "/projects",
      element: <ProjectsPage />,
    },
    {
      path: "/project/:id",
      element: <ProjectDetailPage />,
    },
    {
      path: "/gallery",
      element: <GalleryPage />,
    },
    {
      path: "/gallery/:id",
      element: <GalleryDetailPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/donate",
      element: <DontationPage />,
    },
    {
      path: "/programs",
      element: <ProgramsPage />,
    },
    {
      path: "/staffs/:staffType",
      element: <StaffsPage />,
    },
    {
      path: "/error/500",
      element: <ServerErrorPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
}
const router = createBrowserRouter([...RoutesPaths()]);

export default router;
