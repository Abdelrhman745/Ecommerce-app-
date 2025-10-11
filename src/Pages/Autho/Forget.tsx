import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css"; 
import signupimage from "../../assets/images/signuppage.png";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  newPassword: string;
}

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase and minlength is 6"
      )
      .required("New password is required"),
  });


  async function handleResetPassword(formValues: FormValues) {
    try {
      setLoading(true);
      setMessage("");


      const { data } = await axios.put(
        "https://notes-mrp9.onrender.com/resetPassword",
        {
          email: formValues.email,
          password: formValues.newPassword, 
        }
      );

      console.log("Response from API:", data);

      if (data.message === "Done" || data.message === "Password updated successfully") {
        setMessage("✅ Password reset successful! You can login now.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("⚠️ Could not reset password. Try again.");
      }
    } catch (error: any) {
      console.error("Reset password error:", error.response || error);

      if (error.response?.status === 404) {
        setMessage("❌ Email not found!");
      } else if (error.response?.status === 422) {
        setMessage("❌ Please fill all fields correctly!");
      } else {
        setMessage("❌ Something went wrong, please try again!");
      }
    } finally {
      setLoading(false);
    }
  }


  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="signup-container">
      <div className="signup-image d-none d-md-block">
        <img src={signupimage} alt="Reset Password Visual" />
      </div>

      <div className="signup-form">
        <div className="form-content">
          <h3 className="mb-3 fw-light">Reset your password</h3>

          {message && (
            <div
              className={`alert ${
                message.startsWith("✅")
                  ? "alert-success"
                  : message.startsWith("❌")
                  ? "alert-danger"
                  : "alert-warning"
              } text-center`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.email}
              </div>
            )}


            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.newPassword}
              </div>
            )}


            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Resetting...</span>
                </div>
              ) : (
                "Reset Password"
              )}
            </button>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Remembered your password?{" "}
              <Link to={"/login"} className="text-decoration-none">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
