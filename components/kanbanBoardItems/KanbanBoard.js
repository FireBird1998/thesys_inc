"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [backLog, setBackLog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   console.log("Search", search);
  // }, [search]);

  const filteredBacklog = backLog.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  const filteredTodo = todo.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  const filteredInProgress = inProgress.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  });
  const filteredDone = done.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    console.log("Backlog", backLog);
    console.log("Todo", todo);
    console.log("In Progress", inProgress);
    console.log("Done", done);
  }, [backLog, todo, inProgress, done]);

  // Function to add a task to a column
  const addToColumn = (columnId, task) => {
    switch (columnId) {
      case "backlog":
        setBackLog((prevTasks) => [...prevTasks, task]);
        break;
      case "todo":
        setTodo((prevTasks) => [...prevTasks, task]);
        break;
      case "in-progress":
        setInProgress((prevTasks) => [...prevTasks, task]);
        break;
      case "done":
        setDone((prevTasks) => [...prevTasks, task]);
        break;
    }
  };
  // Function to delete a task from a column
  const deleteTask = (columnId, taskId) => {
    switch (columnId) {
      case "backlog":
        //prevTasks is the previous state of the tasks in the backlog
        //We filter out the task with the taskId that we want to delete
        setBackLog((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        break;
      case "todo":
        setTodo((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        break;
      case "in-progress":
        setInProgress((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        break;
      case "done":
        setDone((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        break;
    }
  };

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
    <KanbanContext.Provider
      value={{
        backLog,
        todo,
        inProgress,
        done,
        handleDragEnd,
        getSourceItems,
        getDestinationItems,
        setSourceItems,
        addToColumn,
        setDestinationItems,
        deleteTask,
        search,
        setSearch,
        filteredBacklog,
        filteredTodo,
        filteredInProgress,
        filteredDone,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => useContext(KanbanContext);

const KanbanBoard = () => {
  const {
    backLog,
    todo,
    inProgress,
    done,
    handleDragEnd,
    filteredBacklog,
    filteredTodo,
    filteredInProgress,
    filteredDone,
  } = useKanban();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row items-center justify-between w-full ">
        <Column title="Backlog" tasks={filteredBacklog} id="backlog" />
        <Column title="Todo" tasks={filteredTodo} id="todo" />
        <Column
          title="In Progress"
          tasks={filteredInProgress}
          id="in-progress"
        />
        <Column title="Done" tasks={filteredDone} id="done" />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
