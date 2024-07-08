import { cn } from "@/lib/utils";
import { primary } from "./fonts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import CustomLink from "@/components/custom/home/customLink";

export default async function Home() {
  const docRef = doc(db, "dashboard", "heroSettings");
  const docSnap = await getDoc(docRef);

  const heroData = docSnap.data();


  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <section className="flex h-screen flex-col items-center justify-center space-y-3 text-center">
        <h1
          className={cn(
            primary.className,
            "heading text-4xl font-thin uppercase md:text-7xl"
          )}
        >
          {heroData?.collegeTitle}
        </h1>
        <br />
        <span className="text-lg font-semibold tracking-wide text-slate-400 md:text-2xl">
          {heroData?.collegeDescription}
        </span>
        <p className="font-medium text-slate-600">
          ( {heroData?.collegeLocation} )
        </p>
        <br />
        <CustomLink
          title="Admissions"
          url="https://lawkcl.mycampusadmin.com/SelfRegisOpenForm"
        />
      </section>
    </main>
  );
}
