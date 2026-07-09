import { Navbar } from "./components";
import { Footer } from "./components";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <nav>
          <Navbar />
        </nav>
        <main className="flex flex-col grow justify-center items-center bg-gray-200 p-4">
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
