import React, { useReducer, useState } from "react";
import DynamicForm from "./components/DynamicForm";
import { formSchema } from "./utils/schema";
import FormReducer from "./components/FormReducer";
import { Box, Button } from "@mui/material";

const App = () => {
  // const [formData, setFormData] = useState({});
  const [formData, dispatch] = useReducer(FormReducer, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data submitted", formData);
  };
  
  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <h2>{formSchema.title}</h2>
        <DynamicForm
          schema={formSchema}
          parentName="User Form"
          formData={formData}
          dispatch={dispatch}
        />

        
        <Button
        type="submit"
        variant="contained"
        sx={{
          margin:"10px auto",
          backgroundColor: "#4CAF50", // Green color
          color: "#fff",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#45a049",
          },
          "&:active": {
            backgroundColor: "#388e3c",
          },
        }}
      >
        Submit
      </Button>
      </form>
    </Box>
  );
};

export default App;
