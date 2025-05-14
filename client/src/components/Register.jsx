import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const registerSchema = Yup.object().shape({
    adminName: Yup.string()
      .min(3, "Name atleast more than 3 letters")
      .required("Name is required"),
    adminEmail: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    adminPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  return (
    <div>
      <h2 className="font-medium text-2xl p-3">Register</h2>
      <Formik
        initialValues={{ adminName: "", adminEmail: "", adminPassword: "" }}
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          axios
            .post("/api/register", {
              adminName: values.adminName,
              adminEmail: values.adminEmail,
              adminPassword: values.adminPassword,
            })
            .then(() => {
              alert("Successfully registered");
              navigate("/login");
            })
            .catch((error) => {
              alert("Failed to register");
              console.log("Failed to register", error);
            });
          console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col items-center ">
            <div className="border border-white rounded-md p-5 bg-white flex flex-col gap-2 ">
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Name</label>
                <Field
                  className="border-2 border-gray-300 bg-white w-80 rounded-md p-1 "
                  type="text"
                  name="adminName"
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.adminName && touched.adminName ? (
                    <div>*{errors.adminName}</div>
                  ) : null}
                </div>
              </div>
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
                disabled={isSubmitting}
                className={`border bg-buttonColor text-white p-1 font-medium rounded-md ${
                  isSubmitting && touched
                    ? " bg-disableButton cursor-not-allowed "
                    : "bg-enableButton"
                }`}
                type="submit"
              >
                Register
              </button>
              <Link className="underline text-left text-sm" to="/login">
                Already have an account? Login here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
