import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const defaultContact = {
    emailAddress: "",
  };

  const ContactSchema = Yup.object().shape({
    emailAddress: Yup.string().email("Invalid email address.").max(140, "Too long!").required("Required."),
  });

  async function handleSubmit(
    values: { emailAddress: string },
    { resetForm }: FormikHelpers<{ emailAddress: string }>
  ) {
    const { emailAddress } = values;
    try {
      const { error } = await supabase.from("submissions").insert({ email_address: emailAddress });
      if (error) {
        throw error;
      }
      setFeedback("Form submitted successfully");
      resetForm();
    } catch (error) {
      console.log("Error occurred", { error });
      setFeedback("An error occurred");
    }
  }

  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {feedback && (
          <div className="mb-4 text-center text-sm text-blue-700 bg-blue-100 px-4 py-2 rounded">{feedback}</div>
        )}
        <Formik
          enableReinitialize
          initialValues={defaultContact}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="emailAddress">
                {({ field, meta }: import("formik").FieldProps) => (
                  <div className="mb-6">
                    <label htmlFor="contact-email" className="block mb-2 text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      {...field}
                      placeholder="Enter email"
                      id="contact-email"
                      type="email"
                      className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        meta.error && meta.touched ? "border-red-500" : "border-gray-300"
                      }`}
                      aria-invalid={!!meta.error && meta.touched}
                    />
                    {meta.error && meta.touched && <p className="mt-2 text-sm text-red-600">{meta.error}</p>}
                  </div>
                )}
              </Field>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}
