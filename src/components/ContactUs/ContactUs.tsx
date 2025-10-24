import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "https://68f6879e6b852b1d6f170246.mockapi.io/contact",
        formData
      );
      toast.success("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#f6f6f1",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2rem 3rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#3c2f2f",
            marginBottom: "1.5rem",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Contact Us
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your name"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={labelStyle}>Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              style={{ ...inputStyle, height: "120px", resize: "none" }}
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3c2f2f",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.8rem 1.5rem",
              cursor: "pointer",
              width: "100%",
              fontWeight: "500",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#2e2323")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#3c2f2f")
            }
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

// ====== Styles ======
const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "0.5rem",
  color: "#3c2f2f",
  fontWeight: "500",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "1rem",
  fontFamily: "inherit",
};

export default ContactUs;
