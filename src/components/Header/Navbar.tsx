import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaSearch, FaHeart, FaUser, FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Authosclice";
import { RootState } from "../../Redux/Store";
import CartSection from "../CartSection/CartSection";

const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(7);
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            CEIN.
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-2">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Shop
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-dark"
                  style={{ padding: "5px 12px" }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-dark"
                  style={{ padding: "5px 12px" }}
                >
                  Login
                </Link>
              )}

              <FaUser size={18} />

              <div
                onClick={() => setShowCart(!showCart)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <FaShoppingBag size={18} />
                {cartCount > 0 && (
                  <span
                    style={{
                      marginLeft: "6px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      userSelect: "none",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showCart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "400px",
            height: "100vh",
            backgroundColor: "#fff",
            boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
            zIndex: 1050,
            padding: "20px",
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <button
            onClick={() => setShowCart(false)}
            className="btn btn-sm btn-outline-dark mb-3"
          >
            Close
          </button>
          <CartSection />
        </div>
      )}
    </>
  );
};

export default Navbar;
