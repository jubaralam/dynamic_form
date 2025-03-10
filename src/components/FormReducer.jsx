const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  console.log("keys", keys);
  let current = obj;
  while (keys.length > 1) {
    const key = keys.shift();
    if (!current[key]) current[key] = {};
    current = current[key];
  }
  current[keys[0]] = value;
};

const FormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD": 
    
      //   setNestedValue(newState, action.field, action.value);
      return { ...state, [action.field]: action.value };
    
    case "RESET_FORM":
      return {};
    default:
      state;
  }
};

export default FormReducer;
