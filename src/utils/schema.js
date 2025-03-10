export const formSchema = {
  title: "Personal",
  fields: [
    { label: "Name", type: "text", required: true },
    { label: "Email", type: "text", validation: "email" },
    { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    {
      label: "Education",
      type: "nestedSection",

      fields: [
        { label: "Degree", type: "text" },
        { label: "Passing_Year", type: "text" },
      ],
    },
    {
      label: "Experience",
      type: "nestedSection",

      fields: [
        { label: "Company", type: "text" },
        { label: "Year", type: "text" },
      ],
    },
  ],
};
