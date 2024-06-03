"use client";
import { useState, useEffect } from "react";
import { Pencil, Search } from "lucide-react";

const TaskBoardTopBar = () => {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

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
    <section className="w-full h-20 flex items-center p-4 gap-5 justify-between">
      <div className="flex items-center justify-center gap-5">
        {edit ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            className=" p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <h1 className="text-2xl font-bold text-black">{title}</h1>
        )}
        <button onClick={handleEdit} className="ml-auto">
          <Pencil className="text-gray-600" />
        </button>
      </div>
      <div className="flex items-center px-2 justify-center border border-gray-300 rounded-md">
        <Search size={20} className="text-gray-600 " />
        <input
          type="text"
          placeholder="Search Tasks"
          className="w-60 p-2 border-none border-transparent focus:outline-none"
        />
      </div>
    </section>
  );
};

export default TaskBoardTopBar;
