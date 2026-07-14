const Backend_Url = import.meta.env.VITE_BACKEND_API || "http://localhost:8000";

const apiFetch = async (route, options = {}) => {
  const url = `${Backend_Url}${route}`;

  const response = await fetch(url, { credentials: "include", ...options });

  return response;
};

export default apiFetch;
