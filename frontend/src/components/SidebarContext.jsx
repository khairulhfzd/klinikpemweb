import { createContext } from "react";

const SidebarContext = createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
});

export default SidebarContext;
