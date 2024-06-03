import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { GripHorizontal } from 'lucide-react';

const Column = ({ title, tasks, id }) => {
  return (
    <div className="rounded-md w-[275px] board-height overflow-y-scroll column">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-lg font-semibold p-4">{title}</h3>
          <span
            className={`text-sm py-1 px-2 rounded-full font-semibold
            ${id === "backlog" && "bg-orange-200 text-orange-600"}
            ${id === "todo" && " bg-pink-200 text-pink-600"}
            ${id === "in-progress" && "bg-purple-200 text-purple-600"}
            ${id === "done" && "bg-green-200 text-green-600"}
              `}
          >
            {tasks.length}
          </span>
        </div>
        <button className=" rounded-md mr-3 flex text-gray-500" onClick={() => console.log("column 3 dot click")}>
            <GripHorizontal size={20} />
        </button>
      </div>
      <div className="p-2">
      <button className="rounded-md w-full p-2 text-sm bg-slate-100 text-gray-500" onClick={() => console.log("add task")}>
        Add Task
    </button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="p-1 transition-colors duration-200 ease-in-out flex-grow min-h-[300px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
