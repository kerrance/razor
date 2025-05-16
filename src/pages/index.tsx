import React, { useState } from "react";
import Head from "next/head";
import { ContactForm } from "../components/ContactForm";

export default function Home() {
  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Razor Sharp</title>
        <meta name="description" content="Digital handyman services to give your business the cutting edge" />
        <meta
          name="keywords"
          content="digital handyman, automation, AI solutions, business automation, workflow optimization, productivity tools, small business tech, process automation, business efficiency"
        />
      </Head>
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center px-4 transition-colors">
        <main className="w-full max-w-lg flex flex-col items-center">
          <h1 className="text-black dark:text-white text-4xl sm:text-5xl text-center font-bold mb-2 tracking-tight">
            <span className="text-purple-500">Razor</span> Sharp
          </h1>
          <h2 className="text-black dark:text-white text-2xl sm:text3xl text-center font-bold mb-6 max-w-md">
            Your digital handyman.
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-lg text-center mb-2 max-w-md">
            No fuss. No BS. Just you staying <span className="text-purple-500">Razor Sharp.</span>
          </p>
          <p className="text-gray-700 dark:text-gray-400 text-lg text-center mb-8 max-w-md">
            Want to be the first to find out more?
          </p>
          <div className="w-full bg-zinc-100 dark:bg-zinc-900/80 p-8 transition-colors">
            <ContactForm onFeedback={setFeedback} />
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
    </>
  );
}
