import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from "./layouts/Mainlayout";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./components/Aboutcomponent/Aboutcomponent";
import Categories from "./components/Categories/Categories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage/> },
      { path: "about", element: <About /> },
      { path: "home", element: <HomePage/> },
      { path: "shop", element: <Categories/> },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
 <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
  </QueryClientProvider>
 
);
