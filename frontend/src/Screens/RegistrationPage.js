import React, { useState } from "react";
import "../Styles/RegisterPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Axios } from "../Data/Axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const notify = (message) => toast(message);

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter a valid username"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      ),
    confirmPassword: Yup.string().when("password", (password, field) => {
      if (password) {
        return field
          .required("The passwords do not match")
          .oneOf([Yup.ref("password")], "The passwords do not match");
      }
    }),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      submitForm(values);
    },
  });

  const submitForm = async (data) => {
    try {
      const { userName, password, confirmPassword } = data;
      const response = await Axios.post("/create", {
        userName,
        password,
        confirmPassword,
      });
      console.log("response.data****", response.data);
      if (response.data) {
        notify("successfully User Created");
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Some erro in submitting form ", err);
      notify("something Error Invalid Credentials");
    }
  };

  return (
    <div>
      <div className="regispage">
        <div className="regis-container">
          <div className="regis-header">
            <h2>Sign Up</h2>
            <p>Welcome! Please enter your details.</p>
          </div>
          <form className="regis-form" onSubmit={formik.handleSubmit}>
            <label for="fullname">
              <b>Username</b>
            </label>
            <div className="row">
              <p>{formik.errors.password ? formik.errors.password : ""}</p>
              <input
                onChange={formik.handleChange}
                value={formik.values.userName}
                style={{ textIndent: "15px" }}
                type="text"
                placeholder="Enter your FullName"
                name="userName"
                required
              />
            </div>
            <label for="pswd">
              <b>Password</b>
            </label>

            <div className="row">
              <p>{formik.errors.password ? formik.errors.password : ""}</p>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                style={{ textIndent: "15px" }}
                type="password"
                placeholder="Enter your password"
                name="password"
                required
              />
            </div>
            <label for="email">
              <b>Confirm Password</b>
            </label>

            <div className="row">
              <p>{formik.errors.password ? formik.errors.password : ""}</p>
              <input
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                style={{ textIndent: "15px" }}
                type="password"
                placeholder="Enter your confirm password"
                name="confirmPassword"
                required
              />
            </div>
            <div className="row">
              <button type="submit">
                <span>Sign Up</span>
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default RegistrationPage;
