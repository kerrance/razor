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
      setFeedback("Submitted successfully");
      resetForm();
    } catch (error) {
      console.log("Error occurred", { error });
      setFeedback("An error occurred");
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-4 transition-colors">
      <main className="w-full max-w-lg flex flex-col items-center">
        <h1 className="text-black dark:text-white text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
          Cut through the <span className="text-purple-500">crap.</span>
        </h1>
        <h2 className="text-black dark:text-white text-2xl sm:text3xl font-bold mb-6 max-w-md">
          Your digital handyman.
        </h2>
        <p className="text-gray-700 dark:text-gray-400 text-lg mb-2 max-w-md">
          No fuss. No BS. Just you staying <span className="text-purple-500">Razor Sharp.</span>
        </p>
        <p className="text-gray-700 dark:text-gray-400 text-lg mb-8 max-w-md">Want to be first in?</p>
        <div className="w-full bg-zinc-100 dark:bg-zinc-900/80 p-8 transition-colors">
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
        </div>
        {feedback && (
          <div className="w-full text-center text-sm text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/40 px-4 py-2">
            {feedback}
          </div>
        )}
        <footer className="w-full mt-10 text-gray-500 dark:text-gray-400 text-xs text-center opacity-60">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 p-2">
            <span>Copyright &copy; {new Date().getFullYear()}.</span>
            <span>
              Forged by{" "}
              <a href="//kerrisharp.com/" target="_blank" className="underline hover:text-purple-600">
                Kerri Sharp
              </a>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
