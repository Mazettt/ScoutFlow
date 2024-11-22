import React from "react";
import DashboardLayout from "../Layouts/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Accueil from "../Pages/Dashboard/Accueil";
import Matos from "../Pages/Dashboard/Matos";
import Finance from "../Pages/Dashboard/Finance";
import Membres from "../Pages/Dashboard/Membres";
import Calendrier from "../Pages/Dashboard/Calendrier";
import Catalogue from "../Pages/Dashboard/Catalogue";
import Cles from "../Pages/Dashboard/Cles";
import Profil from "../Pages/Dashboard/Profil";
import Parametres from "../Pages/Dashboard/Parametres";
import Drive from "../Pages/Dashboard/Drive";
import Access from "../Pages/Dashboard/Access";



export default {
  path: "dashboard",
  element: <DashboardLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/dashboard",
      element: <Accueil />,
    },
    {
      path: "matos",
      element: <Matos />,
    },
    {
      path: "finance",
      element: <Finance />,
    },
    {
      path: "membres",
      element: <Membres />,
    },
    {
      path: "calendrier",
      element: <Calendrier />,
    },
    {
      path: "catalogue",
      element: <Catalogue />,
    },
    {
      path: "cles",
      element: <Cles />,
    },
    {
      path: "profil",
      element: <Profil />,
    },
    {
      path: "parametres",
      element: <Parametres />,
    },
    {
      path: "drive",
      element: <Drive />,
    },
    {
      path: "access",
      element: <Access />,
    },
  ],
};
