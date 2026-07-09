import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";

import {
  Signup,
  Login,
  Home,
  SellerHome,
  BuyerHome,
  CreateProperty,
  PropertyPage,
  SellerPosts,
} from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<PropertyPage />} />
      <Route path="/user/signup" element={<Signup />} />
      <Route path="/user/login" element={<Login />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
