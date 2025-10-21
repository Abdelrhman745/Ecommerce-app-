import React from "react";
import { Nav, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


export default function SideBar() {
  const location = useLocation();


   const menuItems = [
  { Label: "Dashboard", icon: "bi-speedometer2", path: "/dashboard" },
    { Label: "Products", icon: "bi-tags-fill", path: "/dashboard/products" },
      { Label: "Orders", icon: "bi-bag-fill", path: "/dashboard/orders" },
  { Label: "Users", icon: "bi-person-fill", path: "/dashboard/user" },
  { Label: "Messages", icon: "bi-chat-dots-fill", path: "/dashboard/contact" },   
  { Label: "Reports", icon: "bi-file-earmark-bar-graph-fill", path: "" }, 
  { Label: "Logout", icon: "bi-box-arrow-right", path: "/login" }
];


  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#483B32",
        padding: "20px 15px",
      }}
    >
  <h3
  className="text-white text-center mb-3"
  style={{
    padding: "10px 0",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "700",
    fontSize: "1.8rem",
    letterSpacing: "1px",
  }}
>
  GlowUp
</h3>


      <Card
        className="text-center mb-4"
        style={{
          backgroundColor: "#BBA591",
          color: "#fff",
        }}
      >
        <Card.Body>
          <Card.Title className="fs-5">👤 Admin</Card.Title>
          <Card.Text style={{ fontSize: "0.9rem" }}>admin@gmail.com</Card.Text>
        </Card.Body>
      </Card>

      <Nav className="flex-column gap-2 mb-3">
        {menuItems.map((item) => (
          <Nav.Link
            as={Link}
            to={item.path}
            key={item.path}
            className={`d-flex align-items-center fs-5 fw-normal py-3 px-3 rounded`} 
            style={{
              color:"#fff",
    backgroundColor:
      location.pathname === item.path ? "#726255" : "transparent",
    transition: "all 0.2s",
  }}
          >
            <span
              style={{
                marginRight: "15px",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
    <i className={`bi ${item.icon}`}></i>
            </span>
            {item.Label}
          </Nav.Link>
        ))}
      </Nav>
       
    </div>
  );
}
