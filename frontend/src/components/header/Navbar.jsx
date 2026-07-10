import { useLocation, useNavigate } from "react-router";

function Navbar() {
  const location = useLocation();
  const atHome = location.pathname === "/";
  const navigate = useNavigate();

  const handleCreateAd = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_AUTH_VERIFICATION_API, {
        credentials: "include",
        method: "GET",
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/user/create-property");
      } else {
        alert(`Error: ${result.msg}`);
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("Error", error);
      alert("Error while Fetching API from Frontend");
    }
  };

  return (
    <>
      <nav className="bg-blue-900 flex flex-row justify-between">
        <img src="/logo.png" alt="Logo" className="lg:w-1/6 w-1/4" />

        {atHome && (
          <button
            className="border-2 border-amber-50 rounded-lg p-2 m-3 flex items-center bg-red-500 text-amber-50 cursor-pointer hover:bg-gray-500"
            onClick={handleCreateAd}
          >
            Create
          </button>
        )}
      </nav>
    </>
  );
}

export default Navbar;
