import { admissionSchema } from "@/lib/schema";
import { db } from "@/lib/firebase";
import { z } from "zod";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function admission(values: z.infer<typeof admissionSchema>) {
  const validatedFields = admissionSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  let studentData = validatedFields.data;

  try {
    if (studentData.studentEmail == studentData.parentEmail) {
      return { error: "Student email cannot be the same as parent email!" };
    }
    const docRef = doc(db, "temp_students", studentData.studentEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { error: "Email already in use!" };
    } else {
      await setDoc(docRef, studentData, { merge: true });
    }

    return { success: "Self Registration form was submitted submitted!" };
  } catch (err) {
    return { error: "Invalid credentials!" };
  }
}
