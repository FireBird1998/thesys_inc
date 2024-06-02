"use client";
import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const TaskBoardTopBar = () => {
  const [title, setTitle] = useState(
    localStorage.getItem("title")
      ? localStorage.getItem("title")
      : "Task Boards"
  );
  const [edit, setEdit] = useState(false);

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
    <section className="w-full h-20 flex items-center p-4 gap-5">
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
    </section>
  );
};

export default TaskBoardTopBar;
