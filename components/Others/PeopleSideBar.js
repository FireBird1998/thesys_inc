"use client";
import React from "react";
import { X, ArrowRightFromLine } from "lucide-react";
import Image from "next/image";
import { p1, p2, p3, p4, p5 } from "@/public/assets";
import { useLayout } from "@/context/layoutContex";

const PeopleSideBar = () => {
  const { showPeopleSidebar, collapsePeopleSidebarfn } = useLayout();
  return (
    <section
      className={`flex flex-col items-center justify-between   ${showPeopleSidebar ? "w-16 opacity-100" : "w-0 opacity-0 hidden"} border-l-2 border-gray-200 h-screen`}
    >
      <button className="flex items-center justify-center w-full h-20 p-2 text-sm text-gray-500 border-b-2 border-gray-200" onClick={collapsePeopleSidebarfn}>
        <X />
      </button>
      <div className="flex flex-col items-center justify-center gap-2">
        <Avatar
          name="John Doe"
          src={p1}
        />
        <Avatar
          name="Jane Doe"
          src={p2}
        />
        <Avatar
          name="John Doe"
          src={p3}
        />
        <Avatar
          name="Jane Doe"
          src={p4}
        />
        <Avatar
          name="John Doe"
          src={p5}
        />
      </div>
      <button className="flex items-center justify-center w-full h-20 p-2 text-sm text-gray-500 border-t-2 border-gray-200" 
        onClick={collapsePeopleSidebarfn}
      >
        <ArrowRightFromLine />
      </button>
    </section>
  );
};

const Avatar = ({ name, src }) => {
  return (
    <div className="flex items-center gap-2 border-2 border-gray-200 rounded-full">
      <Image
        src={src}
        alt={name}
        width={42}
        height={42}
        className="rounded-full "
      />
    </div>
  );
};

export default PeopleSideBar;
