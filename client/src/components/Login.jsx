import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
  adminEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  adminPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  return (
    <div>
      <h2 className="font-medium text-2xl p-3">Login</h2>
      <Formik
        initialValues={{ adminEmail: "", adminPassword: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col items-center ">
            <div className="border border-white rounded-md p-5 bg-white flex flex-col gap-2 ">
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Email</label>
                <Field
                  className="border-2 border-gray-300 bg-white w-80 rounded-md p-1 "
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
                  className="border-2 border-gray-300 bg-white w-80 rounded-md p-1"
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
                className="border bg-buttonColor text-white p-1 font-medium rounded-md border-buttonColor"
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
