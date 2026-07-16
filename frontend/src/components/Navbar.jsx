import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center mx-auto p-3 max-w-6xl">
          <h1 className="md:w-50 w-25">
            <img src="/logo.png" alt="Logo" />
          </h1>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
          <ul className="flex gap-4 items-center">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:underline">
                About
              </li>
            </Link>
            {!currentUser ? (
              <Link to="/auth/login">
                <li className="text-slate-700 hover:underline">Login</li>
              </Link>
            ) : (
              <Link to={"/user/settings"}>
                <img
                  src={currentUser.avator}
                  alt="profile"
                  className="rounded-full h-10 w-10 object-cover"
                ></img>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
