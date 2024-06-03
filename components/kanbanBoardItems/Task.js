"use client";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg shadow-md p-2 text-black mb-2 min-h-32 mx-2 cursor-pointer flex flex-col justify-between ${
            snapshot.isDragging
              ? "bg-green-200"
              : task.isBacklog
              ? "bg-red-200"
              : "bg-gray-200"
          }`}
        >
          <div className="flex justify-start p-1">
            <span>
              <small>#{task.id}</small>
            </span>
          </div>
          <div className="flex justify-center p-1">{task.title}</div>
          <div className="flex justify-end p-1"></div>
          {provided.placeholder}
        </div>
      )}
      
    </Draggable>
  );
};

export default Task;
