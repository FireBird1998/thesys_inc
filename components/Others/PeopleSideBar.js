import React from "react";
import { X, ArrowRightFromLine } from "lucide-react";
import Image from "next/image";
import { p1, p2, p3, p4, p5 } from "@/public/assets";

const PeopleSideBar = () => {
  return (
    <section
      className={`flex flex-col items-center justify-between w-16 border-l-2 border-gray-200 h-screen`}
    >
      <button className="flex items-center justify-center w-full h-20 p-2 text-sm text-gray-500 border-b-2 border-gray-200">
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
      <button className="flex items-center justify-center w-full h-20 p-2 text-sm text-gray-500 border-t-2 border-gray-200">
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
