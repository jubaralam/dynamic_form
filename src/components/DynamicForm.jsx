import React from "react";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const DynamicForm = ({ schema = { fields: [] }, parentName = "" }) => {
  console.log(schema.fields);
  if (!schema || !schema.fields) {
    return <p>No form shcema provided.</p>;
  }
  const validationSchema = yup.object(
    schema.fields.reduce((acc, field) => {
      const fieldName = parentName
        ? `${parentName}.${field.label}`
        : field.label;
      if (field.required) acc[field.label] = yup.string().required("Required");
      if (field.validation === "email")
        acc[field.label] = yup.string().email("Invalid Email");
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{schema.title}</h2>
      {schema.fields.map((field, index) => {
        const fieldName = parentName
          ? `${parentName}.${field.label}`
          : field.label;
        return (
          <div key={index}>
            <label>{field.label}</label>
            {field.type === "text" && (
              <input {...register(field.label)} type="text" />
            )}

            {field.type === "select" && (
              <select {...register(field.label)}>
                {field.options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            )}

            {field.type === "nestedSection" && (
              <div>
                <DynamicForm schema={field} parentName={fieldName} />
              </div>
            )}

            {errors[field.label] && <span>{errors[field.label].message}</span>}
          </div>
        );
      })}

      <button type="submit"> Submit</button>
    </form>
  );
};

export default DynamicForm;
