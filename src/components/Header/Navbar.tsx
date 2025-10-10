import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaUser, FaShoppingBag, FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Authosclice";
import { RootState } from "../../Redux/Store";
import FavoritesModal from "../FavoriteModal/FavoriteModal";


const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const cartItems = useSelector((state: RootState) => state.cart.items);
    const [showFav, setShowFav] = useState(false);
 const favorites = useSelector((state: RootState) => state.favorites?.items || []);


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            CEIN.
          </Link>

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
  onClick={() => setShowFav(true)}
  style={{
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  }}
>
  {favorites.length}
  
  <FaHeart
    size={18}
    style={{marginLeft:"7px"}}
  />

</div>

              {/* 🔹 Cart Icon */}
              <div
                onClick={handleCartClick}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                  {cartItems.length}

                <FaShoppingBag size={18} style={{marginLeft:"7px"}} />
        
              </div>
            </div>
          </div>
        </div>
      </nav>
          <FavoritesModal show={showFav} onHide={() => setShowFav(false)} />

    </>
  );
};

export default Navbar;
