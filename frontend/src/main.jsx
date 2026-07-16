import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
  CreateProperty,
  PropertyPage,
  Settings,
  AllPosts,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/user/create-property" element={<CreateProperty />} />
      <Route path="/user/property-page/:id" element={<PropertyPage />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/user/settings/:userId" element={<Settings />} />
      <Route path="/user/allposts/:userId" element={<AllPosts />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);
