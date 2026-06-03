
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { formatPhoneInput } from '@/lib/phone';

// Schema for the horizontal form
const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  zipCode: z.string().min(5, "Please enter a valid zip code"),
  service: z.string().min(1, "Please select a service")
});

type HorizontalFormProps = {
  title?: string;
  buttonText?: string;
  formColor?: 'red' | 'blue' | 'navy';
  onSuccessMessage?: string;
  enhanced?: boolean;
  formPosition?: 'hero' | 'section' | 'contact';
};

const HorizontalContactForm: React.FC<HorizontalFormProps> = ({
  title = "Let's Get Started!",
  buttonText = "Get In Touch",
  formColor = 'red',
  onSuccessMessage = "Thank you! We'll be in touch soon.",
  enhanced = false,
  formPosition = 'section'
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      service: ''
    }
  });
  
  const formColorStyles = {
    red: {
      title: '#CC0000',
      button: '#CC0000',
      buttonHover: '#990000'
    },
    blue: {
      title: '#0066CC',
      button: '#0066CC',
      buttonHover: '#004C99'
    },
    navy: {
      title: '#001F3F',
      button: '#001F3F',
      buttonHover: '#00132A'
    }
  };
  
  const colorStyle = formColorStyles[formColor];
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const { sendLeadEmail } = await import('@/utils/emailjs');
      await sendLeadEmail(data as Record<string, string>);
      toast.success(onSuccessMessage);
      reset();
    } catch (error) {
      toast.error("Failed to submit your request. Please try again.");
    }
  };
  
  return <form onSubmit={handleSubmit(onSubmit)} className="form-flex">
      <div style={{
      color: colorStyle.title
    }} className="form-title mx-0">
        {title}
      </div>
      
      <input type="text" placeholder="Your Name" className="form-input" {...register("name")} />
      {errors.name && <span className="text-red-500 text-xs absolute">{errors.name.message}</span>}
      
      <input type="email" placeholder="Email Address" className="form-input" {...register("email")} />
      {errors.email && <span className="text-red-500 text-xs absolute">{errors.email.message}</span>}
      
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="Phone Number"
        className="form-input"
        {...register("phone", {
          onChange: (e) => {
            setValue("phone", formatPhoneInput(e.target.value), { shouldValidate: true });
          },
        })}
      />
      {errors.phone && <span className="text-red-500 text-xs absolute">{errors.phone.message}</span>}
      
      <input type="text" placeholder="Zip Code" className="form-input" {...register("zipCode")} />
      {errors.zipCode && <span className="text-red-500 text-xs absolute">{errors.zipCode.message}</span>}
      
      <select className="form-input form-select" defaultValue="" {...register("service")}>
        <option value="" disabled>Select Service</option>
        <option value="emergency">Emergency Storm Service</option>
        <option value="repair">Storm Damage Repair</option>
        <option value="assessment">Free Inspection</option>
        <option value="insurance">Insurance Claim Help</option>
        <option value="restoration">Full Restoration</option>
      </select>
      {errors.service && <span className="text-red-500 text-xs absolute">{errors.service.message}</span>}
      
      <button type="submit" className="form-button" style={{
      background: colorStyle.button,
      boxShadow: enhanced ? `0 8px 15px rgba(0, 0, 0, 0.15)` : undefined
    }} disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : buttonText}
        <ArrowRight size={16} className="ml-1" />
      </button>
      
      {enhanced && (
        <div className="w-full mt-3 flex justify-center gap-4">
          <div className="flex items-center text-sm">
            <CheckCircle size={14} className="mr-1 text-stark-red" />
            <span>7-Second Form</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock size={14} className="mr-1 text-stark-red" />
            <span>Fast Response</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle size={14} className="mr-1 text-stark-red" />
            <span>24/7 Service</span>
          </div>
        </div>
      )}
    </form>;
};

export default HorizontalContactForm;
