import { z } from "zod";

export const admissionSchema = z.object({
  studentFirstName: z.string().min(1, { message: "First name is required" }),
  studentLastName: z.string().min(1, { message: "Last name is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  studentEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(10, { message: "Phone number is invalid" })
    .max(10, { message: "Phone number is invalid" }),

  fatherFirstName: z
    .string()
    .min(1, { message: "Father's first name is required" }),
  fatherLastName: z
    .string()
    .min(1, { message: "Father's last name is required" }),
  motherFirstName: z
    .string()
    .min(1, { message: "Mother's first name is required" }),
  motherLastName: z
    .string()
    .min(1, { message: "Mother's last name is required" }),
  parentEmail: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  parentPhoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(10, { message: "Phone number is invalid" })
    .max(10, { message: "Phone number is invalid" }),

  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  pincode: z.string().min(1, { message: "Pincode is required" }),
  address: z.string().min(1, { message: "Address is required" }),

  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  pwd: z.string().min(1, { message: "This field is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});
