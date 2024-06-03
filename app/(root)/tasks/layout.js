"use client";
import { KanbanProvider } from "@/components/kanbanBoardItems/KanbanBoard";
import TaskBoardTopBar from "@/components/navigation/TaskBoardTopBar";
import React from "react";
import { useLayout } from "@/context/layoutContex";
import PeopleSideBar from "@/components/Others/PeopleSideBar";

const Layout = ({ children }) => {
  const { showSidebar } = useLayout();
  return (
    <KanbanProvider>
      <div
        className={`${showSidebar ? "whenSidebarOpen" : " whenSidebarClose"}`}
      >  
          <TaskBoardTopBar />
          {children}
          
      </div>
      <div>
        <PeopleSideBar />
      </div>
    </KanbanProvider>
  );
};

export default Layout;
