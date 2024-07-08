import { cn } from "@/lib/utils";
import React from "react";
import { primary } from "../fonts";
import { AdmissionForm } from "@/components/custom/admission/form";

const Admission = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <h1
        className={cn(
          primary.className,
          "text-4xl md:text-5xl pt-20 font-thin uppercase tracking-wide"
        )}
      >
        admission form
      </h1>
      <p className="text-center text-slate-400 font-semibold my-4 md:w-[60%] w-[90%]">
        To complete your registration, please fill out all fields
        with accurate and up-to-date information. This ensures we have the
        necessary details to support your academic journey effectively.
      </p>
      <br />
      <span className="text-rose-300 tracking-wide uppercase text-xl font-semibold">[ All fields are required ]</span>
      <div className="w-full flex items-center justify-center mt-10">
        <AdmissionForm />
      </div>
    </section>
  );
};

export default Admission;
