import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const token = localStorage.getItem("userToken");

  if (token !== "admin") {
    return <Navigate to="/home" replace />; 
  }

  return <>{children}</>; 
}
