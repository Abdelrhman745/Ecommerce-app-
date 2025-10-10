import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from "./layouts/Mainlayout";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./components/Aboutcomponent/Aboutcomponent";
import Categories from "./components/Categories/Categories";
import SignUp from "./Pages/Autho/Signup";
import Login from "./Pages/Autho/Login";
import { Provider, useSelector } from "react-redux";
import store from "./Redux/Store";
import ForgetPassword from "./Pages/Autho/Forget";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage/> },
      { path: "about", element: <About /> },
      { path: "home", element: <HomePage/> },
      { path: "shop", element: <Categories/> },
      { path: "signup", element: <SignUp/> }, 
      { path: "login", element: <Login/>},
      {path:"forget", element: <ForgetPassword/>} 
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>
  </Provider>
  
);
