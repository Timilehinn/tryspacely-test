import React from "react";
import { SettingsIcon } from "../../assets/shared/Settings";
import { DashboardIcon } from "../../assets/shared/Dashboard";

export const SalesSidebar = [
  {
    id: "spaces",
    title: "Spaces",
    path: "/dashboard",
    icon: <DashboardIcon w={"w-5"} h={"h-5"} />,
  },
  {
    id: "settings",
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsIcon w={"w-5"} h={"h-5"} />,
  },
];
