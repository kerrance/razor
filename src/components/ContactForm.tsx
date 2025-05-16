import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { supabase } from "../lib/supabaseClient";
import { ContactFormSchema } from "../lib/contactFormSchema";

const defaultContact = { emailAddress: "" };

export function ContactForm({ onFeedback }: { onFeedback: (msg: string) => void }) {
  async function handleSubmit(
    values: { emailAddress: string },
    { resetForm }: FormikHelpers<{ emailAddress: string }>
  ) {
    const { emailAddress } = values;
    try {
      const { error } = await supabase.from("submissions").insert({ email_address: emailAddress });
      if (error) throw error;
      onFeedback("Submitted successfully");
      resetForm();
    } catch {
      onFeedback("An error occurred");
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={defaultContact}
      validationSchema={ContactFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="emailAddress">
            {({ field, meta }: import("formik").FieldProps) => (
              <div className="mb-2">
                <label
                  htmlFor="contact-email"
                  className="block mb-2 text-sm font-medium text-gray-800 dark:text-gray-300"
                >
                  Email Address<span className="text-purple-500">*</span>
                </label>
                <input
                  {...field}
                  placeholder="Enter your email address"
                  id="contact-email"
                  type="email"
                  className={`block w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    meta.error && meta.touched
                      ? "border-purple-600 dark:border-purple-500"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                  aria-invalid={!!meta.error && meta.touched}
                />
                <p className="mt-2 text-sm min-h-[20px] text-purple-600 dark:text-purple-400" aria-live="polite">
                  {meta.error && meta.touched ? meta.error : "\u00A0"}
                </p>
              </div>
            )}
          </Field>
          <button
            type="submit"
            className="w-full bg-purple-600 dark:bg-purple-500 text-white px-6 py-3 font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
