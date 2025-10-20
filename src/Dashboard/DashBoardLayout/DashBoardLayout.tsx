import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import MainNavbar from "../components/NavBar";

export default function DashboardLayout() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9F6F2" }}>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <SideBar />

        <div
          className="d-flex flex-column flex-grow-1"
          style={{ minHeight: "100vh", backgroundColor: "#FDFBF6" }}
        >
          <MainNavbar />

          <div
            className="flex-grow-1 d-flex justify-content-center"
            style={{
              padding: "30px 25px",
              backgroundColor: "#FAF8F5",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.02)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              overflowY: "auto",
              minHeight: "calc(100vh - 80px)",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1200px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "14px",
                boxShadow: "0 4px 20px rgb(200 190 170 / 0.3)",
              }}
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
