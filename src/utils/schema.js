export const formSchema = {
  title: "User Form",
  fields: [
    { label: "Name", type: "text", required: true },
    { label: "Email", type: "text", validation: "email" },
    { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    {
      label: "Education",
      type: "nestedSection",

      fields: [
        { label: "Degree", type: "text" },
        { label: "Year", type: "text" },
      ],
    },
  ],
};
