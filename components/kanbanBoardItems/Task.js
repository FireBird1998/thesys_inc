"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Trash2,
  MessageSquareText,
  ClipboardList,
  BookCheck,
} from "lucide-react";
import { useKanban } from "./KanbanBoard";

const Task = ({ task, index, columnId }) => {
  const { deleteTask } = useKanban();
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg shadow-md p-2 text-black mb-2 min-h-32 mx-2 cursor-pointer flex flex-col justify-between ${
            snapshot.isDragging ? "bg-green-200" : "bg-gray-100"
          }`}
        >
          <div className="flex justify-between items-start p-1 ">
            <span className=" font-medium">{task.title}</span>
            {columnId === "done" ? (
              <button
                className="p-1 rounded-md flex text-green-600 items-center justify-center"
                onClick={() => {
                  console.log("task done");
                }}
              >
                <BookCheck size={20} />
              </button>
            ) : (
              <button
                className="p-1 rounded-md flex text-gray-500 items-center justify-center"
                onClick={() => deleteTask(columnId, task.id)}
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <div className="flex justify-start p-1">
            <span className=" text-gray-800">{task.description}</span>
          </div>
          <div className="flex justify-between p-1 items-center">
            <div className="flex text-gray-500 items-center gap-2">
              <MessageSquareText size={20} />
              <span className="text-xs font-semibold">2</span>
              <ClipboardList size={20} />
              <span className="text-xs font-semibold">3</span>
            </div>
            <div class="flex -space-x-1 overflow-hidden">
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
