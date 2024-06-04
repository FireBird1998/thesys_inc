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
import { useLayout } from "@/context/layoutContex";
import Image from "next/image";
import { p1, p2, p3 } from "@/public/assets";

const Task = ({ task, index, columnId }) => {
  const { deleteTask } = useKanban();
  const { showPeopleSidebarfn } = useLayout();
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
            <button className="flex -space-x-1 overflow-hidden" onClick={showPeopleSidebarfn}>
              <Image
                className="inline-block rounded-full ring-2 ring-white"
                src={p1}
                width={24}
                height={24}
                alt=""
              />
              <Image
                className="inline-block rounded-full ring-2 ring-white"
                src={p2}
                width={24}
                height={24}
                alt=""
              />
              <Image
                className="inline-block rounded-full ring-2 ring-white"
                src={p3}
                width={24}
                height={24}
                alt=""
              />
            </button>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
