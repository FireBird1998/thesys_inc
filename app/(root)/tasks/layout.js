"use client";
import { KanbanProvider } from "@/components/kanbanBoardItems/KanbanBoard";
import TaskBoardTopBar from "@/components/navigation/TaskBoardTopBar";
import React from "react";
import { useLayout } from "@/context/layoutContex";

const Layout = ({ children }) => {
  const { showSidebar } = useLayout();
  return (
    <div>
      <KanbanProvider>
        <TaskBoardTopBar />
        <div
          className={`${showSidebar ? "whenSidebarOpen" : " whenSidebarClose"}`}
        >
          {children}
        </div>
      </KanbanProvider>
    </div>
  );
};

export default Layout;
