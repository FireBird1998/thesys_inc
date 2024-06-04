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
          <div className="flex items-start justify-between p-1 ">
            <span className="font-medium ">{task.title}</span>
            {columnId === "done" ? (
              <button
                className="flex items-center justify-center p-1 text-green-600 rounded-md"
                onClick={() => {
                  console.log("task done");
                }}
              >
                <BookCheck size={20} />
              </button>
            ) : (
              <button
                className="flex items-center justify-center p-1 text-gray-500 rounded-md"
                onClick={() => deleteTask(columnId, task.id)}
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>
          <div className="flex justify-start p-1">
            <span className="text-gray-800 ">{task.description}</span>
          </div>
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center gap-2 text-gray-500">
              <MessageSquareText size={20} />
              <span className="text-xs font-semibold">2</span>
              <ClipboardList size={20} />
              <span className="text-xs font-semibold">3</span>
            </div>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
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
