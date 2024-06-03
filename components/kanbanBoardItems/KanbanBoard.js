"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const KanbanBoard = () => {
  const [backLog, setBackLog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        // Distribute tasks based on their properties
        setBackLog(json.filter((task) => task.status === "backlog"));
        setTodo(json.filter((task) => task.completed === false));
        setInProgress(json.filter((task) => task.status === "in-progress"));
        setDone(json.filter((task) => task.completed === true));
      });
  }, []);

  // This function is called when the drag operation ends
  const handleDragEnd = (result) => {
    // Destructuring the result object to get the destination, source and draggableId
    const { destination, source, draggableId } = result;

    // If there's no destination (i.e., the user dropped the item outside a droppable area), we return and no further action is taken
    if (!destination) return;

    // Get the items from the source droppable based on its id
    const sourceItems = getSourceItems(source.droppableId);
    // Get the items from the destination droppable based on its id
    const destItems = getDestinationItems(destination.droppableId);
    // Remove the dragged item from the source items
    const [removed] = sourceItems.splice(source.index, 1);

    // If the source and destination droppables are not the same
    if (source.droppableId !== destination.droppableId) {
      // Add the removed item to the destination items at the correct index
      destItems.splice(destination.index, 0, removed);
      // Update the source and destination items
      setSourceItems(source.droppableId, sourceItems);
      setDestinationItems(destination.droppableId, destItems);
    } else {
      // If the source and destination droppables are the same
      // Add the removed item back to the source items at the new index
      sourceItems.splice(destination.index, 0, removed);
      // Update the source items
      setSourceItems(source.droppableId, sourceItems);
    }
  };

  // Function to get the source items based on the droppable id
  function getSourceItems(sourceDroppableId) {
    switch (sourceDroppableId) {
      case "backlog":
        return [...backLog];
      case "todo":
        return [...todo];
      case "in-progress":
        return [...inProgress];
      case "done":
        return [...done];
      default:
        return [];
    }
  }

  // Function to get the destination items based on the droppable id
  function getDestinationItems(destinationDroppableId) {
    switch (destinationDroppableId) {
      case "backlog":
        return [...backLog];
      case "todo":
        return [...todo];
      case "in-progress":
        return [...inProgress];
      case "done":
        return [...done];
      default:
        return [];
    }
  }

  // Function to update the source items
  function setSourceItems(sourceDroppableId, items) {
    switch (sourceDroppableId) {
      case "backlog":
        setBackLog(items);
        break;
      case "todo":
        setTodo(items);
        break;
      case "in-progress":
        setInProgress(items);
        break;
      case "done":
        setDone(items);
        break;
    }
  }

  // Function to update the destination items
  function setDestinationItems(destinationDroppableId, items) {
    switch (destinationDroppableId) {
      case "backlog":
        setBackLog(items);
        break;
      case "todo":
        setTodo(items);
        break;
      case "in-progress":
        setInProgress(items);
        break;
      case "done":
        setDone(items);
        break;
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex justify-between items-center flex-row">
        <Column title="Backlog" tasks={backLog} id="backlog" />
        <Column title="Todo" tasks={todo} id="todo" />
        <Column title="In Progress" tasks={inProgress} id="in-progress" />
        <Column title="Done" tasks={done} id="done" />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
