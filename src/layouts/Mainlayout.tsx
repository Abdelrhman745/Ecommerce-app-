import { Outlet } from "react-router-dom";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";


export default function Layout() {
  return (
    <div
      className="d-flex flex-column min-vh-100" 
      style={{ fontFamily: "Tajawal" }}
    >
    <Navbar />
      <main className="flex-fill py-4">
        <Outlet />
      </main>

    <Footer />
    </div>
  );
}
