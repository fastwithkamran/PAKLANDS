import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice.js";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromURL = urlParams.get("searchTerm");

    if (searchTermfromURL) {
      setSearchTerm(searchTermfromURL);
    }
  }, [location.search]);

  const handleLogOut = async () => {
    try {
      dispatch(deleteUserStart());

      const response = await fetch("api/user/logout", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/");
        toast.success("Logout Success");
        dispatch(deleteUserSuccess(result));
      } else {
        dispatch(deleteUserFailure(result.msg));
      }
    } catch (error) {
      if (import.meta.env.VITE_ERROR === "development") console.error(error);
      dispatch(deleteUserFailure("Error failed to fetch API request"));
    }
  };
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSubmit}>
              <FaSearch className="text-slate-600" />
            </button>
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
            {currentUser ? (
              <div className="relative">
                <button type="button" onClick={() => setOpen(!open)}>
                  <img
                    src={currentUser.avator}
                    alt="profile"
                    className="rounded-full h-10 w-10 object-cover"
                  ></img>
                </button>
                {open && (
                  <ul className="absolute bg-slate-600 text-white font-medium text-sm text-center rounded-md py-2 px-6 cursor-pointer opacity-80 mt-1 top-full right-0 w-44">
                    <li>
                      <Link
                        className="hover:bg-red-800 hover:font-bold hover:px-1 rounded-md"
                        to="/profile"
                      >
                        Profile
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        className="hover:bg-red-800 hover:font-bold rounded-md"
                        to="/create-listing"
                      >
                        Create Listing
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <Link
                        className="hover:bg-red-800 hover:font-bold hover:px-1 rounded-md"
                        to="/userListings"
                      >
                        Your Listings
                      </Link>
                    </li>
                    <hr />
                    <li>
                      <button
                        className="hover:bg-red-800 hover:font-bold hover:px-1 rounded-md"
                        type="button"
                        onClick={handleLogOut}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login">
                <li className="text-slate-700 hover:underline">Login</li>
              </Link>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
