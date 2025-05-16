import * as Yup from "yup";

export const ContactFormSchema = Yup.object().shape({
  emailAddress: Yup.string()
    .email("Invalid email address.")
    .max(140, "Your email address is too long.")
    .required("Required."),
});
