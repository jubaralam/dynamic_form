import React, { useState } from "react";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormReducer from "./FormReducer";
import { Box, Input, MenuItem, Select, TextField } from "@mui/material";

const DynamicForm = ({
  schema = { fields: [] },
  parentName = "",
  parentKey = "",
  formData,
  dispatch,
}) => {
  if (!schema || !schema.fields) {
    return <p>No form shcema provided.</p>;
  }

  const validationSchema = yup.object(
    schema.fields.reduce((acc, field) => {
      let validator = yup.string();
      if (field.validation === "email")
        validator = validator.email("Invalid Email");
      if (field.required) validator = validator.required("Required");
      acc[field.label] = validator;
      return acc;
    }, {})
  );

  //   const validationSchema = yup.object(
  //     schema.fields.reduce((acc, field) => {
  //       if (field.required) acc[field.label] = yup.string().required("Required");
  //       if (field.validation === "email")
  //         acc[field.label] = yup.string().email("Invalid Email");
  //       return acc;
  //     }, {})
  //   );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  //   const onSubmit = (data) => console.log("Form Data:", data);
  //   const handleChange = (fieldName, value) => {
  // dispatch({type:"UPDATE_FIELD",field: fieldName,value})
  // setFormData((prev) => ({
  //   ...prev,
  //   [fieldName]: value,
  // }));
  //   };

  const handleChange = (fieldName, value) => {
    const fullFieldName = parentName ? `${parentName}.${fieldName}` : fieldName;
    dispatch({ type: "UPDATE_FIELD", field: fullFieldName, value });
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", mt: 4 }}>
        <div>
          {schema.fields.map((field, index) => {
            const fieldName = parentName
              ? `${parentName}.${field.label}`
              : field.label;
            return (
              <div key={index}>
                <label>{field.label}</label>
                {field.type === "text" && (
                  <TextField
                    fullWidth
                    label={field.label}
                    variant="outlined"
                    size="medium"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#1976d2",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1565c0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0d47a1",
                        },
                      },
                    }}
                    aria-label="Demo input"
                    {...register(field.label)}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    type="text"
                  />
                )}

                {field.type === "select" && (
                  <Select
                    //           value={selectedValue}
                    //   onChange={handleChange}
                    label={field.label}
                    sx={{
                      margin: "10px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#1976d2",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1565c0",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0d47a1",
                        },
                      },
                    }}
                    {...register(field.label)}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                  >
                    {field.options.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                )}

                {field.type === "nestedSection" && (
                  <div>
                    <DynamicForm
                      schema={field}
                      // parentName={fieldName}
                      formData={formData?.[field.label] || {}}
                      dispatch={dispatch}
                      // formData={formData[field.label] || {}}
                      // setFormData={(updatedData) => {
                      //   setFormData((prevData) => ({
                      //     ...prevData,
                      //     [field.label]: updatedData,
                      //   }));
                      // }}
                      parentKey={field.label}
                    />
                  </div>
                )}

                {errors[field.label] && (
                  <span>{errors[field.label].message}</span>
                )}
              </div>
            );
          })}
        </div>
      </Box>
    </>
  );
};

export default DynamicForm;
