import { KanbanProvider } from "@/components/kanbanBoardItems/KanbanBoard";
import TaskBoardTopBar from "@/components/navigation/TaskBoardTopBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <KanbanProvider>
        <TaskBoardTopBar />
        {children}
      </KanbanProvider>
    </div>
  );
};

export default layout;
