"use client";
import { useState, useEffect } from "react";
import { Pencil, Search } from "lucide-react";
import { useKanban } from "../kanbanBoardItems/KanbanBoard";

const TaskBoardTopBar = () => {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const {search, setSearch} = useKanban();

 

  useEffect(() => {
    // Check if window object exists
    if (typeof window !== "undefined") {
      // Get title from local storage
      const storedTitle = localStorage.getItem("title");
      if (storedTitle) {
        setTitle(storedTitle);
      } else {
        setTitle("Task Boards");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("title", title);
  }, [title]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleEdit();
    }
  };

  return (
    <section className="flex items-center justify-between w-full h-20 gap-5 p-4">
      <div className="flex items-center justify-center gap-5">
        {edit ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className="p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        ) : (
          <h1 className="text-2xl font-bold text-black">{title}</h1>
        )}
        <button onClick={handleEdit} className="ml-auto">
          <Pencil className="text-gray-600" />
        </button>
      </div>
      <div className="flex items-center justify-center px-2 border border-gray-300 rounded-md">
        <Search size={20} className="text-gray-600 " />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Tasks"
          className="p-2 border-transparent border-none w-60 focus:outline-none"
        />
      </div>
    </section>
  );
};

export default TaskBoardTopBar;
