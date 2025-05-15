import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import AutoComplete from "../common/AutoComplete";

const suggestions = [
  "Gold",
  "Silver",
  "Mangalyam",
  "24k Gold",
  "22k Gold",
  "18k Gold",
  "14k Gold",
  "Earings",
  "Bicuits",
  "Men",
  "Women",
  "Kids",
  "Adult",
];

const jewellerySchema = Yup.object().shape({
  name: Yup.string().required("Jewellery name is required"),
  price: Yup.number().required("Price is required"),
  stock: Yup.number().required("Stock is required"),
  description: Yup.string()
    .required("Password is required")
    .min(10, "Description must be at least 10 characters"),
  category: Yup.string().required("Category is required"),
  manufacturingDate: Yup.date().required("Date is required"),
  jewelleryImage: Yup.mixed().required("Image is required"),
});

const JewelleryEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const existingData = useMemo(
    () => location.state?.existingData,
    [location.state]
  );

  const formRef = useRef();
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-medium text-2xl p-3 text-center">
        {existingData ? "Edit" : "Add"} Jewellery
      </h2>
      <Formik
        initialValues={{
          name: existingData?.name || "",
          price: existingData?.price || 0,
          stock: existingData?.stock || 0,
          description: existingData?.description || "",
          category: existingData?.category || "",
          manufacturingDate:
            existingData?.manufacturingDate?.split("T")?.[0] || "",
          jewelleryImage: existingData?.jewelleryImage || null,
        }}
        validationSchema={jewellerySchema}
        onSubmit={() => {
          const formData = new FormData(formRef.current);

          axios(
            existingData
              ? `/api/jewellery/${existingData._id}`
              : "/api/jewellery",
            { data: formData, method: existingData ? "put" : "post" }
          )
            .then(() => {
              existingData
                ? alert("Data Successfully updated")
                : alert("Data Successfully added");
              navigate("/");
            })
            .catch((error) => {
              alert("Faild to add the data");
              console.error("Faild to add the data", error);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <Form
            ref={formRef}
            className="flex flex-col items-center overflow-auto p-5"
            style={{ flex: "1 1 1px" }}
          >
            <div className="border border-white rounded-md p-5 bg-white flex flex-col gap-2 ">
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Jewellery Name</label>
                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.name && touched.name ? (
                    <div>*{errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className="text-left font-medium">price</label>

                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1"
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.price && touched.price ? (
                    <div>*{errors.price}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Stock</label>
                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  type="number"
                  name="stock"
                  value={values.stock}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.stock && touched.stock ? (
                    <div>*{errors.stock}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Description</label>
                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.description && touched.description ? (
                    <div>*{errors.description}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className=" text-left font-medium">Category</label>
                <AutoComplete
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  name="category"
                  suggestions={suggestions}
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.category && touched.category ? (
                    <div>*{errors.category}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className=" text-left font-medium">
                  Manufacturing Date
                </label>
                <Field
                  className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-md p-1 "
                  type="date"
                  name="manufacturingDate"
                  value={values.manufacturingDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.manufacturingDate && touched.manufacturingDate ? (
                    <div>*{errors.manufacturingDate}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col ">
                <label className=" text-left font-medium">
                  Jewellery Image
                </label>
                <div className="flex flex-col gap-2 ">
                  {values.jewelleryImage && (
                    <div className="flex  justify-center">
                      <img
                        className="object-contain"
                        style={{ width: "300px", height: "300px" }}
                        src={
                          values.jewelleryImage instanceof File
                            ? URL.createObjectURL(values.jewelleryImage)
                            : values.jewelleryImage.dataUrl
                        }
                      />
                    </div>
                  )}
                  <input
                    key={existingData?._id}
                    ref={fileInputRef}
                    className="hidden"
                    type="file"
                    name="jewelleryImage"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length) {
                        setFieldValue("jewelleryImage", e.target.files[0]);
                      }
                    }}
                  />
                  <Field
                    className="border-2 border-gray-300 bg-white lg:w-[500px] sm:w-96 rounded-lg p-1 "
                    value={values.jewelleryImage?.name}
                    readOnly
                  />
                  <button
                    className="border font-medium border-black text-white p-1 rounded-sm bg-black"
                    onClick={(e) => {
                      e.preventDefault();

                      if (fileInputRef.current) {
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    Browse
                  </button>
                </div>
                <div className="mb-5 text-left text-xs text-red-600">
                  {errors.jewelleryImage && touched.jewelleryImage ? (
                    <div>*{errors.jewelleryImage}</div>
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
                {existingData ? "EDIT" : "ADD"}
              </button>

              <button
                disabled={isSubmitting}
                className={`border bg-buttonColor text-white p-1 font-medium rounded-md ${
                  isSubmitting && touched
                    ? " bg-disableButton cursor-not-allowed "
                    : "bg-enableButton"
                }`}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                CANCEL
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JewelleryEditor;
