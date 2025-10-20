import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationBell from "../Orders/components/notifcation";

export default function MainNavbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.body.setAttribute("data-bs-theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Navbar expand="lg" className="py-1">
      <Container>
        <h3 className="mb-0 ms-4">Overview</h3>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="fs-4">
            <i className="bi bi-house-door-fill"></i>
            </Nav.Link>
            <Nav.Link onClick={toggleDarkMode} className="fs-4">
              {darkMode ? (
                <i className="bi bi-brightness-high-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </Nav.Link>
            <Nav.Link>
              <NotificationBell />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
