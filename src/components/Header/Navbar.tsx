import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUser, FaShoppingBag, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Authosclice";
import { RootState } from "../../Redux/Store";
import FavoritesModal from "../FavoriteModal/FavoriteModal";
import { clearCartState } from "../../Redux/CartSlice";
import { clearFavoritesState } from "../../Redux/FavSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showFav, setShowFav] = useState(false);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || []
  );

  const handleLogout = () => {
     dispatch(logout());
     dispatch(clearCartState());
     dispatch(clearFavoritesState());
     localStorage.removeItem("userToken");
     navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const navLinks = [
    { text: "Home", to: "/" },
    { text: "Shop", to: "/products" },
    { text: "About Us", to: "/about" },
    { text: "Blog", to: "/blog" },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 px-4 fixed-top">
        <div className="container-fluid">
          {/* Brand */}
          <Link
            className="navbar-brand fw-extrabold fs-3 text-theme-primary"
            to="/"
            style={{
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "0.08em",
              color: "#7c6f63",
            }}
          >
            GLOWUP.
          </Link>

          {/* Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
              {navLinks.map((item, idx) => (
                <li key={idx} className="nav-item">
                  <Link
                    to={item.to}
                    className="nav-link fw-semibold text-dark position-relative"
                    style={{ transition: "color 0.25s ease" }}
                  >
                    {item.text}
                    <span className="underline" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icons and Buttons */}
            <div className="d-flex align-items-center gap-4">
              {token ? (
                <button
                  className="btn btn-outline-theme px-3 py-1 fw-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-outline-theme px-3 py-1 fw-semibold"
                >
                  Login
                </Link>
              )}

              <Link
                to="/profile"
                className="text-theme-muted position-relative"
                aria-label="User Profile"
              >
                <FaUser size={20} className="cursor-pointer" />
              </Link>

              <div
                onClick={() => setShowFav(true)}
                className="position-relative d-flex align-items-center cursor-pointer text-theme-muted"
                aria-label="Favorites"
                role="button"
              >
                <span
                  className="badge bg-theme-badge position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: 11 }}
                >
                  {favorites.length}
                </span>
                <FaHeart size={20} className="ms-3" />
              </div>

              <div
                onClick={handleCartClick}
                className="position-relative d-flex align-items-center cursor-pointer text-theme-muted"
                aria-label="Cart"
                role="button"
              >
                <span
                  className="badge bg-theme-badge position-absolute top-0 start-100 translate-middle rounded-pill"
                  style={{ fontSize: 11 }}
                >
                  {cartItems.length}
                </span>
                <FaShoppingBag size={20} className="ms-3" />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          :root {
            --theme-primary: #7c6f63;
            --theme-muted: #b8afa6;
            --theme-outline: #9e927f;
            --theme-badge: #dad3ca;
          }

          .text-theme-primary {
            color: var(--theme-primary) !important;
          }

          .text-theme-muted {
            color: var(--theme-muted) !important;
          }

          .btn-outline-theme {
            border-color: var(--theme-outline);
            color: var(--theme-outline);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          .btn-outline-theme:hover {
            background-color: var(--theme-outline);
            color: #fff;
          }

          .badge.bg-theme-badge {
            background-color: var(--theme-badge);
            color: var(--theme-primary);
            font-weight: 600;
          }

          .nav-link {
            color: #444;
          }

          .nav-link:hover,
          .nav-link:focus {
            color: var(--theme-primary);
          }

          .nav-link .underline {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 0;
            height: 2.5px;
            background-color: var(--theme-primary);
            transition: width 0.3s ease, left 0.3s ease;
          }

          .nav-link:hover .underline,
          .nav-link:focus .underline {
            width: 80%;
            left: 10%;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          body {
            padding-top: 80px; /* prevent content from hiding behind navbar */
          }
        `}</style>
      </nav>

      <FavoritesModal show={showFav} onHide={() => setShowFav(false)} />
    </>
  );
};

export default Navbar;
