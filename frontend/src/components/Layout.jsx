import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="flex-1 overflow-y-auto bg-base-100">{children}</main>
        </div>
      </div>
    </div>
  );
};
export default Layout;