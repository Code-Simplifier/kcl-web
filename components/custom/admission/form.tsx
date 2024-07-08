"use client";

import { useState, useTransition } from "react";

import { z } from "zod";
import { admissionSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { admission } from "@/actions/admission";

export const AdmissionForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof admissionSchema>>({
    resolver: zodResolver(admissionSchema),
    defaultValues: admissionSchema.safeParse({}).data ?? {},
  });

  function onSubmit(values: z.infer<typeof admissionSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      admission(values)
        .then((res) => {
          if (res?.error) {
            setError(res.error);
          } else {
            setSuccess(res?.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[90%]"
      >
        {/* Personal Details */}
        <div>
          <h1 className="text-xl tracking-wide text-slate-400 font-semibold">
            Personal Details
          </h1>
          <p className="text-sm">Provide your basic personal information.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studentFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="studentLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 border-b pb-10 border-primary gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Select an option</SelectLabel>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="male"
                        >
                          Male
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="female"
                        >
                          Female
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="other"
                        >
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-2">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal mt-1 border-input w-full bg-background hover:bg-background",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Icon
                          icon="solar:calendar-outline"
                          className="ml-auto h-4 w-4 opacity-50"
                        />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) =>
                        date &&
                        (date > new Date() || date < new Date("1900-01-01"))
                      }
                      initialFocus
                      className="bg-background"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <br />

        {/* Guardian Details */}
        <div>
          <h1 className="text-xl tracking-wide text-slate-400 font-semibold">
            Guardian Details
          </h1>
          <p className="text-sm">Enter your parent's contact details.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fatherFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name (Father)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fatherLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name (Father)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="motherFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name (Mother)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="motherLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name (Mother)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 pb-10 border-b border-secondary gap-4">
          <FormField
            control={form.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address (Parent)</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Parent)</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <br />

        {/* Residence Details */}
        <div>
          <h1 className="text-xl tracking-wide text-slate-400 font-semibold">
            Residence Details
          </h1>
          <p className="text-sm">Fill in your current residential address.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full pb-10 border-b border-primary">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <br />

        {/* Miscellaneous Details */}
        <div>
          <h1 className="text-xl tracking-wide text-slate-400 font-semibold">
            Miscellaneous Details
          </h1>
          <p className="text-sm">Additional information for identification.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Select your blood group</SelectLabel>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="a+"
                        >
                          A+
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="a-"
                        >
                          A-
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="b+"
                        >
                          B+
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="b-"
                        >
                          B-
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="o+"
                        >
                          O+
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="o-"
                        >
                          O-
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="ab+"
                        >
                          AB+
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="ab-"
                        >
                          AB-
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Faith" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Select your Faith</SelectLabel>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="sikh"
                        >
                          Sikh
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="hindu"
                        >
                          Hindu
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="muslim"
                        >
                          Muslim
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="christian"
                        >
                          Christian
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="jain"
                        >
                          Jain
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="buddhist"
                        >
                          Buddhist
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="other"
                        >
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Select your category</SelectLabel>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="general"
                        >
                          General
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="obc"
                        >
                          OBC
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="sc"
                        >
                          SC
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="st"
                        >
                          ST
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="other"
                        >
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Person with Disability</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectGroup>
                        <SelectLabel>Select an option</SelectLabel>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="yes"
                        >
                          Yes
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-primary hover:text-slate-800 font-semibold"
                          value="no"
                        >
                          No
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <br />
        {error && (
          <div className="bg-rose-400/10 border border-rose-400 p-2 rounded-lg">
            <span className="text-rose-400 text-lg tracking-wide font-semibold">
              Error!
            </span>
            <p className="text-slate-400 font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-emerald-400/10 border border-emerald-400 p-2 rounded-lg">
            <span className="text-emerald-400 text-lg tracking-wide font-semibold">
              Success!
            </span>
            <p className="text-slate-400 font-medium">{success}</p>
          </div>
        )}
        <Button
          type="submit"
          className="w-full font-bold text-lg text-slate-800 uppercase"
        >
          {isPending ? <Icon icon="eos-icons:bubble-loading" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
