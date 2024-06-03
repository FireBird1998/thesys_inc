"use client";
import {
  PanelLeftClose,
  PanelLeftOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useContext } from "react";
import { Divider } from "@/components";
import { LayoutContext } from "@/context/layoutContex";

import { useRouter, usePathname } from "next/navigation";
import { sidebarItems } from "@/constants";

 function SideBarHolder({ children }) {
  const { showSidebar, toggleSidebar, showSidebarDropdown } =
    useContext(LayoutContext);
  const router = useRouter();

  return (
    <aside className={`h-screen ${showSidebar ? "w-72" : " w-[69px]"}`}>
      <nav className="flex flex-col h-full bg-white border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center justify-between w-full">
            {showSidebar && (
              <h1 className="text-lg font-semibold" onClick={() => {router.push('/')}}>Dashboard</h1>
            )}
            <button
              onClick={() => toggleSidebar()}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {showSidebar ? (
                <PanelLeftClose className="text-gray-600 " />
              ) : (
                <PanelLeftOpen className="text-gray-600 " />
              )}
            </button>
          </div>
        </div>
        <Divider />
        <DropdownButton />
        {showSidebarDropdown && <ul className="flex-1 px-3">{children}</ul>}
      </nav>
    </aside>
  );
}

 function SidebarItem({ icon, text, active, alert, route }) {
  const { showSidebar } = useContext(LayoutContext);
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <li
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-800"
            : "hover:bg-blue-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          showSidebar ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 rounded-full text-xs p-2 font-semibold text-blue-900 bg-blue-200 ${
            showSidebar ? "" : "hidden"
          }`}
        >
          {alert}
        </div>
      )}
    </li>
  );
}

const DropdownButton = () => {
  const { showSidebar, toggleSidebarDropdown, showSidebarDropdown } =
    useContext(LayoutContext);

  return (
    <button
      onClick={() => toggleSidebarDropdown()}
      className={`mx-4 py-2 px-1.5 rounded-md  hover:bg-indigo-50 flex items-center group 
      ${showSidebar ? " justify-between" : "justify-center"}`}
    >
      <span
        className={`text-gray-600 overflow-hidden transition-all uppercase font-semibold text-sm ${
          showSidebar ? "" : "hidden"
        }`}
      >
        Dashboards
      </span>
      {showSidebarDropdown ? (
        <ChevronUp size={20} className="text-blue-600 " />
      ) : (
        <ChevronDown size={20} className="text-blue-600 " />
      )}
    </button>
  );
};



export default function SideBar() {
  const pathname = usePathname(); 

  return (
    <SideBarHolder>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={<item.icon size={20} className="text-blue-900" />}
          text={item.text}
          alert={item.alert}
          route={item.link}
          active={item.link.toLowerCase() === pathname.toLowerCase()}
        />
      ))}
    </SideBarHolder>
  );
}

