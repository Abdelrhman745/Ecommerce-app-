import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainNavbar from "../components/NavBar";

export default function DashboardLayout() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: '#D9BEA8' }}>
      <div className="d-flex">
        <SideBar />

        <div
          className="d-flex flex-column flex-grow-1"
          style={{ minHeight: "100vh" }}
        >
          <MainNavbar />

          <div
            className="d-flex justify-content-center align-items-center flex-grow-1"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
