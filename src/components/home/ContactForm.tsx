
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { formatPhoneInput } from "@/lib/phone";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().optional(),
  address: z.string().min(5, { message: "Please enter your street address" }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code" }),
});

const ContactForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      address: "",
      zipCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { submitLead } = await import('@/utils/submitLead');
      await submitLead(values as Record<string, unknown>);
      toast.success("Got it! Brenda or someone from her team will reach out within 2 business hours.", {
        duration: 6000,
      });
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong — please call (206) 739-8232 and we'll take your info by phone.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-medium">Full Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jane Homeowner"
                  autoComplete="name"
                  className="bg-white border-gray-300 focus:border-navy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy font-medium">Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="bg-white border-gray-300 focus:border-navy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy font-medium">
                  Phone* <span className="text-xs font-normal text-gray-500">(we text faster than we email)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(206) 000-0000"
                    className="bg-white border-gray-300 focus:border-navy"
                    {...field}
                    onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy font-medium">Property Address*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123 Alder St"
                    autoComplete="street-address"
                    className="bg-white border-gray-300 focus:border-navy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-navy font-medium">Zip*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    placeholder="98101"
                    className="bg-white border-gray-300 focus:border-navy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-navy font-medium">
                What&apos;s going on with your roof? <span className="text-xs font-normal text-gray-500">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Example: noticed stains on my bedroom ceiling after last weekend's windstorm"
                  className="bg-white border-gray-300 focus:border-navy"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2">
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Sending…
              </>
            ) : (
              "Schedule My Free Inspection"
            )}
          </button>
          <p className="text-xs text-gray-600 mt-3 text-center leading-relaxed">
            ✓ Free, no obligation &nbsp; ✓ Response within 2 business hours &nbsp; ✓ We never share your info
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
