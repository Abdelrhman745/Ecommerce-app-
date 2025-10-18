import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useDispatch } from "react-redux";
import store from "./Redux/Store";

import Layout from "./layouts/Mainlayout";
import HomePage from "./Pages/HomePage/HomePage";
import SignUp from "./Pages/Autho/Signup";
import Login from "./Pages/Autho/Login";
import ForgetPassword from "./Pages/Autho/Forget";
import ProductListPage from "./Pages/ProductPage/ProductListPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserProfileEdit from "./components/UserProfileEdit/UserProfileEdit";
import About from "./Pages/About/About";
import ProtectedRoute from "./components/Protectedroute/Protectedroute";
import { login } from "./Redux/Authosclice";
import { setCart } from "./Redux/CartSlice";
import { setFavorites } from "./Redux/FavSlice";
import { HelmetProvider } from "react-helmet-async";
import BlogPage from "./Pages/Blog/BlogPage";
import SkinCareChatbot from "./components/Chatbot/Chatbot";
import Users from "./Dashboard/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "home", element: <HomePage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forget", element: <ForgetPassword /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <UserProfileEdit />
          </ProtectedRoute>
        ),
      },
      { path: "blog", element: <BlogPage /> },
      {path:"user", element:<Users/>}
    ],
  },
]);

const queryClient = new QueryClient();

const RootApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const currentUser = users.find((u: any) => u.id === token);
      if (currentUser) {
        dispatch(login(token));
        dispatch(setCart(currentUser.cart || []));
        dispatch(setFavorites(currentUser.favorites || []));
      }
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RootApp />
          <SkinCareChatbot/>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
export default RootApp;
