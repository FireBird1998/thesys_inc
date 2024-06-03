import SideBar from "@/components/navigation/SideBar";
import LayoutContextProvider from "@/context/layoutContex";

const layout = ({ children }) => {
  return (
    <section className={`flex`}>
      <LayoutContextProvider>
        <SideBar />
        {children}
      </LayoutContextProvider>
    </section>
  );
};

export default layout;
