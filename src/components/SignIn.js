import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
    localStorage.setItem("formData", JSON.stringify(values));
    navigate("/home");
  };

  return (
    <div className="box-border w-fit mx-auto mt-36 text-white bg-gradient-to-r from-blue-900 to-purple-900 p-6 border rounded-2xl">
      <h1 className="box-border w-fit mx-auto mb-6 p-2 text-4xl font-medium ">
        Sign In
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="box-border flex flex-col gap-4 justify-start">
          <div className="box-border  box-border w-full mx-auto mt-6 flex justify-between items-start">
            <label className="box-border w-fit text-2xl" htmlFor="name">
              Name
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="box-border cursor-pointer bg-gray-500 text-xl ml-4 pl-4 py-1 rounded-xl"
            />
          </div>
          <ErrorMessage
            name="name"
            component="div"
            className="box-border text-red-200 text-xl w-1/2 mx-auto"
          />

          <div className="box-border box-border w-full mx-auto mt-6 flex justify-between items-start">
            <label className="box-border w-fit text-2xl" htmlFor="email">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="cursor-pointer bg-gray-500 text-xl ml-4 pl-4 py-1 rounded-xl"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="box-border text-red-200  text-xl w-1/2 mx-auto"
          />

          <div className="box-border w-full mx-auto mt-6 flex gap-12 justify-start items-start">
            <label className="box-border w-fit text-2xl" htmlFor="password">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="cursor-pointer bg-gray-500 text-xl pl-4 py-1 rounded-xl"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="box-border text-red-200 text-xl w-1/2 mx-auto"
          />

          <button
            type="submit"
            className="box-border w-1/2 mx-auto mt-12 mb-4 bg-yellow-900 text-white text-2xl rounded-2xl py-2 hover:ring hover:ring-offset-4 hover:ring-red-500 hover:bg-zinc-700"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default SignIn;
