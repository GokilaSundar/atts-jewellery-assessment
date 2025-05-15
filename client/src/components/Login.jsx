import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { useAuth } from "./ProtectedRoutes/AuthContext";

const loginSchema = Yup.object().shape({
  adminEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  adminPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setAdmin } = useAuth();

  return (
    <div>
      <h2 className="font-medium text-center text-2xl p-3">Login</h2>
      <Formik
        initialValues={{ adminEmail: "", adminPassword: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          axios
            .post("/api/login", values)
            .then((response) => {
              setAdmin(response.data);
              navigate("/dashboard");
            })
            .catch((error) => {
              alert("Failed to login");
              console.error("Failed to login", error);
            });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col items-center ">
            <div className="border border-white rounded-md p-5 bg-white flex flex-col gap-2 ">
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Email</label>
                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  type="email"
                  name="adminEmail"
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.adminEmail && touched.adminEmail ? (
                    <div>*{errors.adminEmail}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className="text-left font-medium">Password</label>

                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1"
                  type="password"
                  name="adminPassword"
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.adminPassword && touched.adminPassword ? (
                    <div>*{errors.adminPassword}</div>
                  ) : null}
                </div>
              </div>
              <button
                disabled={isSubmitting}
                className={`border bg-buttonColor text-white p-1 font-medium rounded-md ${
                  isSubmitting && touched
                    ? " bg-disableButton cursor-not-allowed "
                    : "bg-enableButton"
                }`}
                type="submit"
              >
                Login
              </button>
              <Link className="underline text-left text-sm" to="/register">
                Don't you have an account? Register here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
