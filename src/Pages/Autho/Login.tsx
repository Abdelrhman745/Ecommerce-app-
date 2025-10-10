import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css";
import signupimage from "../../assets/images/signuppage.png";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Authosclice";


interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is invalid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase and minlength is 6"
      )
      .required("Password is required"),
  });

  async function handleLogin(formValues: FormValues) {
    console.log("Sent values:", formValues);

    try {
      setLoading(true);
      setErrorMessage("");

      const { data } = await axios.post(
        `https://notes-mrp9.onrender.com/signin`,
        formValues
      );
      console.log("Response from server:", data);

      if (data.message === "welocme") {
        localStorage.setItem("userToken", data.token);
        dispatch(login(data.token));
        navigate("/home");
      }
    } catch (error: any) {
        console.log("Server error:", error.response?.data);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid email or password!");
      } else if (error.response?.status === 422) {
        setErrorMessage("Please fill all fields correctly!");
      } else {
        setErrorMessage("An unexpected error occurred, please try again!");
      }
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="signup-container">
      <div className="signup-image d-none d-md-block">
        <img src={signupimage} alt="Login visual" />
      </div>

      <div className="signup-form">
        <div className="form-content">
          <h3 className="mb-3 fw-light">Log in to your account</h3>

          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                className="form-control"
                id="email"
                placeholder="example@email.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.email}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                className="form-control"
                id="password"
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="alert alert-danger" role="alert">
                {formik.errors.password}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-dark w-100 mt-2"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">"Loading..."</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Forgot your password?{" "}
              <Link to={"/forget"} className="text-decoration-none">
                Reset it here
              </Link>
            </p>
            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              didn't have an account?{" "}
              <Link to={"/signup"} className="text-decoration-none">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
