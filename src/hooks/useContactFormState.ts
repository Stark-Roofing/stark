
import { useState } from 'react';
import { toast } from 'sonner';

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  zip: string;
  service: string;
  referSource: string;
  comment: string;
  photoFile: File | null;
  videoFile: File | null; // Fixed: Changed from 'null' to 'File | null'
  isSubmitting: boolean;
}

export interface ContactFormActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setZip: (zip: string) => void;
  setService: (service: string) => void;
  setReferSource: (referSource: string) => void;
  setComment: (comment: string) => void;
  setPhotoFile: (file: File | null) => void;
  setVideoFile: (file: File | null) => void;
  resetForm: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export const useContactFormState = (): [ContactFormState, ContactFormActions] => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [service, setService] = useState('Roof Replacement');
  const [referSource, setReferSource] = useState('Google');
  const [comment, setComment] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setZip('');
    setService('Roof Replacement');
    setReferSource('Google');
    setComment('');
    setPhotoFile(null);
    setVideoFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !zip) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { submitLead } = await import('@/utils/submitLead');
      await submitLead({ name, email, phone, zip, service, message: comment, refer_source: referSource, source: window.location.pathname });
      toast.success("Thank you for your request!", {
        description: "We'll be in touch with you shortly."
      });

      // Reset form
      resetForm();
    } catch (error) {
      toast.error("There was a problem submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const state: ContactFormState = {
    name,
    email,
    phone,
    zip,
    service,
    referSource,
    comment,
    photoFile,
    videoFile,
    isSubmitting
  };

  const actions: ContactFormActions = {
    setName,
    setEmail,
    setPhone,
    setZip,
    setService,
    setReferSource,
    setComment,
    setPhotoFile,
    setVideoFile,
    resetForm,
    handleSubmit
  };

  return [state, actions];
};

export default useContactFormState;
