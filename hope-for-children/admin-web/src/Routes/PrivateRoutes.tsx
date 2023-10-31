import { lazy } from "react";
import Layout from "../components/common/Layout";
import CreateProjectForm from "../features/projects/CreateProjectForm";
import StaffsList from "../components/staffs/StaffList";
import CreateStaffForm from "../components/staffs/CreateStaffForm";
import UpdateStaffForm from "../components/staffs/UpdateStaffForm";
import AlumniList from "../components/alumnis/AlumniList";
import CreateAlumniForm from "../components/alumnis/CreateAlumniForm";
import UpdateAlumniForm from "../components/alumnis/UpdateAlumniForm";
import GalleryFormInput from "../components/gallery/CreateGalleryForm";
import GalleryList from "../components/gallery/GalleryList";
import GalleryDetail from "../components/gallery/GalleryDetail";
import UpdateGalleryForm from "../components/gallery/UpdateGalleryForm";
import ProjectDetail from "../features/projects/ProjectDetail";
import UpdateProjectForm from "../features/projects/UpdateProjectForm";
import Login from "../components/account/Login";
import NotFoundPage from "../components/common/NotFoundPage";
import Register from "../components/common/Register";
import ChangePasswordForm from "../components/account/ChangePassword";
import ResetPasswordForm from "../components/account/ResetPassword";
import ForgetPassword from "../components/account/ForgetPassword";
import EmailSentSuccess from "../components/account/EmailSendSuccess";
import UsersTable from "../components/users/UsersTable";
import UpdateUser from "../components/users/UpdateUser";

const ProjectsList = lazy(() => import("../features/projects/ProjectsList"));

export default function PrivateRoutes() {
  return [
    {
      element: <Layout />,
      children: [
        { path: "/", exact: true, element: <ProjectsList /> },
        { path: "/projects/create", element: <CreateProjectForm /> },
        { path: "/project/:id", element: <ProjectDetail /> },
        { path: "/project/update/:id", element: <UpdateProjectForm /> },

        { path: "/staff/:staffType?", element: <StaffsList /> },
        { path: "/staffs/create", element: <CreateStaffForm /> },
        { path: "/staffs/update/:id", element: <UpdateStaffForm /> },

        { path: "/galleries", element: <GalleryList /> },
        { path: "/galleries/:id", element: <GalleryDetail /> },
        { path: "/gallery/create", element: <GalleryFormInput /> },
        { path: "/gallery/update/:id", element: <UpdateGalleryForm /> },

        { path: "/alumnis", element: <AlumniList /> },
        { path: "/alumnis/create", element: <CreateAlumniForm /> },
        { path: "/alumnis/update/:id", element: <UpdateAlumniForm /> },

        { path: "/auth/changePassword", element: <ChangePasswordForm /> },

        { path: "/users", element: <UsersTable /> },
        { path: "/user/register", element: <Register /> },
        { path: "/user/update/:id", element: <UpdateUser /> },

      ],
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },

    { path: "/resetpassword", element: <ResetPasswordForm /> },

    { path: "/auth/forgetpassword", element: <ForgetPassword /> },

    { path: "/auth/emailsendsuccess", element: <EmailSentSuccess /> },
  ];
}
