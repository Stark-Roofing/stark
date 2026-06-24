import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatPhoneInput } from '@/lib/phone';

// Define the base schema that all contact forms will share
const baseSchema = {
  name: z.string().min(2, {
    message: "Name must be at least 2 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number"
  })
};

// Helper to create extended schemas
export const createContactFormSchema = (additionalFields = {}) => {
  return z.object({
    ...baseSchema,
    ...additionalFields
  });
};

// Default schema with common fields
export const defaultContactFormSchema = createContactFormSchema({
  address: z.string().min(5, {
    message: "Please enter your street address"
  }),
  zip: z.string().min(5, {
    message: "Please enter a valid zip code"
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters"
  }).optional()
});
export type BaseContactFormProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showAddress?: boolean;
  showZipCode?: boolean;
  showMessage?: boolean;
  showBestTimeToContact?: boolean;
  showServiceSelection?: boolean;
  additionalFields?: React.ReactNode;
  onSubmitSuccess?: () => void;
  schema?: z.ZodObject<any>;
  className?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "stark-red";
  successMessage?: string;
};

const BaseContactForm: React.FC<BaseContactFormProps> = ({
  title,
  subtitle,
  buttonText = "Submit",
  showAddress = true,
  showZipCode = true,
  showMessage = true,
  showBestTimeToContact = false,
  showServiceSelection = false,
  additionalFields,
  onSubmitSuccess,
  schema = defaultContactFormSchema,
  className = "",
  buttonVariant = "stark-red",
  successMessage = "Got it! Brenda or someone from her team will reach out within 2 business hours."
}) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      ...(showAddress ? {
        address: ""
      } : {}),
      ...(showZipCode ? {
        zip: ""
      } : {}),
      ...(showMessage ? {
        message: ""
      } : {}),
      ...(showBestTimeToContact ? {
        bestTime: ""
      } : {}),
      ...(showServiceSelection ? {
        service: ""
      } : {})
    }
  });
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const { submitLead } = await import('@/utils/submitLead');
      await submitLead(values as Record<string, unknown>);
      toast.success(successMessage, { duration: 6000 });
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong — please call (206) 739-8232 and we'll take your info by phone.");
    }
  };
  return <>
      {title && <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">{title}</h2>}
      {subtitle && <p className="text-charcoal/80 mb-6">{subtitle}</p>}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-5 ${className}`}>
          <FormField control={form.control} name="name" render={({
          field
        }) => <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Homeowner" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="email" render={({
            field
          }) => <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="phone" render={({
            field
          }) => <FormItem>
                  <FormLabel>Phone <span className="text-xs font-normal text-gray-500">(we text faster than email)</span></FormLabel>
                  <FormControl>
                    <Input type="tel" inputMode="tel" autoComplete="tel" placeholder="(206) 000-0000" {...field} onChange={(e) => field.onChange(formatPhoneInput(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          {showAddress && <FormField control={form.control} name="address" render={({
          field
        }) => (
            <FormItem>
              <FormLabel>Street Address</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="street-address" placeholder="123 Alder St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />}

          {showZipCode && <FormField control={form.control} name="zip" render={({
          field
        }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="98101" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />}
          
          {showServiceSelection && <FormField control={form.control} name="service" render={({
          field
        }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="roof-repair">Roof Repair</SelectItem>
                  <SelectItem value="roof-replacement">Roof Replacement</SelectItem>
                  <SelectItem value="gutter-repair">Gutter Repair</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />}
          
          {showBestTimeToContact && <FormField control={form.control} name="bestTime" render={({
          field
        }) => <FormItem>
                  <FormLabel>Best Time to Contact</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    
                    <SelectContent>
                      <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                      <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />}
          
          {additionalFields}
          
          {showMessage && <FormField control={form.control} name="message" render={({
          field
        }) => <FormItem>
                  <FormLabel>What&apos;s going on with your roof? <span className="text-xs font-normal text-gray-500">(optional)</span></FormLabel>
                  <FormControl>
                    <Textarea placeholder="Example: noticed stains on my bedroom ceiling after last weekend's windstorm" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />}

          <Button type="submit" variant={buttonVariant} size="full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Sending…" : buttonText}
          </Button>

          <p className="text-xs text-gray-600 mt-2 text-center leading-relaxed">
            ✓ Free, no obligation &nbsp; ✓ Response within 2 business hours &nbsp; ✓ We never share your info
          </p>
        </form>
      </Form>
    </>;
};

export default BaseContactForm;
