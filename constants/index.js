import {
    ClipboardList,
    FolderUp,
    SquareKanban,
    Clock3,
    PieChart,
    LayoutDashboard,
    SlidersHorizontal,
  } from "lucide-react";


export const sidebarItems = [
    { icon: SquareKanban, text: "Tasks", alert: 20, link: "/tasks"},
    { icon: FolderUp, text: "Drive Files", alert: 254, link: "/drive-files" },
    { icon: ClipboardList, text: "Boards", alert: 20, link: "/boards" },
    { icon: Clock3, text: "Updates", link: "/updates" },
    { icon: PieChart, text: "Analytics", alert: 2, link: "/analytics" },
    { icon: LayoutDashboard, text: "CRM Dashboard", alert: 2, link: "/crm-dashboard" },
    { icon: SlidersHorizontal, text: "Settings", alert: 2, link: "/settings" },
];