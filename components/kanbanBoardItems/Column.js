import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { GripHorizontal, Plus } from "lucide-react";
import { useKanban } from "./KanbanBoard";
import { v4 as uuid } from "uuid";
import { tasksarr } from "@/constants";

const Column = ({ title, tasks, id }) => {
  const { addToColumn } = useKanban();

  const addTask = () => {
    if (tasksarr.length === 0) {
      // If there are no more tasks in tasksarr, do nothing
      return;
    }

    // Select a random index
    const randomIndex = Math.floor(Math.random() * tasksarr.length);

    // Get the task at the random index
    const randomTask = tasksarr[randomIndex];

    // Add a unique id to the task
    randomTask.id = uuid();

    // Add the task to the column
    addToColumn(id, randomTask);

    // Remove the task from tasksarr
    tasksarr.splice(randomIndex, 1);
  };

  return (
    <div className="rounded-md min-w-[25%] max-w-[25%] board-height overflow-y-scroll flex-grow column">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <h3 className="p-4 text-lg font-semibold">{title}</h3>
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
        <button
          className="flex mr-3 text-gray-500 rounded-md "
          onClick={() => console.log("column 3 dot click")}
        >
          <GripHorizontal size={20} />
        </button>
      </div>
      <div className="p-2">
        <button
          className="flex items-center justify-center w-full p-2 text-sm text-gray-500 rounded-md bg-slate-100"
          onClick={addTask}
        >
          <span className="p-1 bg-gray-200 rounded-full">
            <Plus size={20} className="text-grau-800" />
          </span>
        </button>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="p-1 transition-colors duration-200 ease-in-out flex-grow min-h-[100%]"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} columnId={id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
