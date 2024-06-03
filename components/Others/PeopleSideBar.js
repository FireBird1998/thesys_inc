
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

const PeopleSideBar = () => {
  return (
    <section
      className={`flex flex-col items-center justify-between w-16 border-l-2 border-gray-200 h-screen`}
    >
      <button className="flex items-center justify-center w-full h-20 p-2 text-sm text-gray-500 border-b-2 border-gray-200">
        <X />
      </button>
      <div className="flex flex-col items-center justify-center">
        {/* <Avatar
          name="John Doe"
          src="https://robohash.org/stefan-one"
        />
        <Avatar
          name="Jane Doe"
          src="https://robohash.org/stefan-one"
        />
        <Avatar
          name="John Doe"
          src="https://robohash.org/stefan-one"
        />
        <Avatar
          name="Jane Doe"
          src="https://robohash.org/stefan-one"
        />
        <Avatar
          name="John Doe"
          src="https://robohash.org/stefan-one"
        /> */}
        </div>
    </section>
  );
};

const Avatar = ({ name, src }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={src} alt={name} width={32} height={32} className="rounded-full " />
    </div>
  );
};

export default PeopleSideBar;
