import React, { useEffect, useState } from "react";
import "../Styles/LoginPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Axios } from "../Data/Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notify = (message) => toast(message);

  useEffect(() => {
    localStorage.removeItem("signedJWT");
    navigate("/");
  },);

  const validateSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter a valid username"),
    password: Yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (data) => {
    try {
      const { userName, password } = data;
      const response = await Axios.post("/login", {
        userName,
        password,
      });
      console.log("response.data****", response.data);
      if (response.data.token) {
        let token = response.data.token;
        JSON.stringify(token);
        localStorage.setItem("signedJWT", token);
        notify("successfully loggedIn");
        navigate("/movies");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Some error in submitting form ", err);
      notify("something Error Invalid Credentials");
    }
  };
  return (
    <div className="loginpage">
      <div className="login-container">
        <div className="login-header">
          <h2>Log in to your account</h2>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <label for="uname">
            <b>Username</b>
          </label>
          <div className="row">
            <p>{formik.errors.userName ? formik.errors.userName : ""}</p>
            <input
              style={{ textIndent: "15px" }}
              type="text"
              placeholder="Enter Username"
              name="userName"
              required
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
          </div>
          <label for="psw">
            <b>Password</b>
          </label>

          <div className="row">
            <p>{formik.errors.password ? formik.errors.password : ""}</p>
            <input
              style={{ textIndent: "15px" }}
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          <div className="row">
            <button type="submit">
              <span>Login</span>
            </button>
          </div>
          <p className="signuplink">
            Don't have an Account?
            <a
              href="/registration"
              style={{ color: "blue", cursor: "pointer" }}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
