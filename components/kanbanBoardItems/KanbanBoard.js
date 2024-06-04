"use client";
import React, { useState, createContext, useContext, useEffect, useMemo } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  
  const [backLog, setBackLog] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [search, setSearch] = useState("");

  // Loading and restoring the tasks from local storage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBackLog = localStorage.getItem("backLog");
      const storedTodo = localStorage.getItem("todo");
      const storedInProgress = localStorage.getItem("inProgress");
      const storedDone = localStorage.getItem("done");

      if (storedBackLog) setBackLog(JSON.parse(storedBackLog));
      if (storedTodo) setTodo(JSON.parse(storedTodo));
      if (storedInProgress) setInProgress(JSON.parse(storedInProgress));
      if (storedDone) setDone(JSON.parse(storedDone));
    }
  }, []);

  // Saving the tasks to local storage when the tasks change
  useEffect(() => {
    localStorage.setItem("backLog", JSON.stringify(backLog));
  }, [backLog]);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgress));
  }, [inProgress]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(done));
  }, [done]);

  //these are derived state values for the filtered tasks
  //the tasks are filtered based on the search query
  //the useMemo hook is used to memoize the filtered tasks and the search query for performance optimization
 const filteredBacklog = useMemo(
   () =>
     backLog.filter((item) => {
       return (
         item.title.toLowerCase().includes(search.toLowerCase()) ||
         item.description.toLowerCase().includes(search.toLowerCase())
       );
     }),
   [backLog, search]
 );

 const filteredTodo = useMemo(
   () =>
     todo.filter((item) => {
       return (
         item.title.toLowerCase().includes(search.toLowerCase()) ||
         item.description.toLowerCase().includes(search.toLowerCase())
       );
     }),
   [todo, search]
 );

 const filteredInProgress = useMemo(
   () =>
     inProgress.filter((item) => {
       return (
         item.title.toLowerCase().includes(search.toLowerCase()) ||
         item.description.toLowerCase().includes(search.toLowerCase())
       );
     }),
   [inProgress, search]
 );

 const filteredDone = useMemo(
   () =>
     done.filter((item) => {
       return (
         item.title.toLowerCase().includes(search.toLowerCase()) ||
         item.description.toLowerCase().includes(search.toLowerCase())
       );
     }),
   [done, search]
 );

  
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

//this hook is used to access the context value in the child components
export const useKanban = () => useContext(KanbanContext);

const KanbanBoard = () => {
  const {
    handleDragEnd,
    filteredBacklog,
    filteredTodo,
    filteredInProgress,
    filteredDone,
  } = useKanban();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row items-center justify-between w-full">
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
