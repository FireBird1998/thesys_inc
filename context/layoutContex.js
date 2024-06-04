"use client";
import { createContext, useState, useContext } from "react";

export const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export default function LayoutContextProvider({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSidebarDropdown, setShowSidebarDropdown] = useState(true);
  const [showPeopleSidebar, setShowPeopleSidebar] = useState(true);

  const toggleSidebar = () => setShowSidebar((curr) => !curr);
  const toggleSidebarDropdown = () => setShowSidebarDropdown((curr) => !curr);
  const collapsePeopleSidebarfn = () => setShowPeopleSidebar(false);
  const showPeopleSidebarfn = () => setShowPeopleSidebar(true);

  return (
    <LayoutContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
        showSidebarDropdown,
        toggleSidebarDropdown,
        showPeopleSidebar,
        collapsePeopleSidebarfn,
        showPeopleSidebarfn,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
