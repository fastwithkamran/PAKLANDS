import { Navbar } from "./components";
import { Footer } from "./components";
import { Outlet, useLocation } from "react-router";

function App() {
  const location = useLocation();
  const atHome = location.pathname === "/";

  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <nav>
          <Navbar />
        </nav>
        <main
          className={
            atHome
              ? "flex flex-col justify-center items-center bg-gray-200 p-4"
              : "flex flex-col grow justify-center items-center bg-gray-200 p-4"
          }
        >
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
