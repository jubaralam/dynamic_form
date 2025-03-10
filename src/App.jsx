import React from "react";
import DynamicForm from "./components/DynamicForm";
import { formSchema } from "./utils/schema";

const App = () => {
  
  return (
    <div>
      <DynamicForm schema={formSchema} />
    </div>
  );
};

export default App;
