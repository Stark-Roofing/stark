import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { roofingServices, exteriorServices } from '@/data/serviceData';
import { getLeadValue } from '@/utils/tracking';
import { getOrCreateExternalId, savePIIForReuse, updateAdvancedMatching } from '@/utils/metaTracking';

// Human labels for the <option> values below. Used on the dataLayer push and
// /thank-you state only. The Zapier/Leap payload still receives the slug.
const SERVICE_LABELS: Record<string, string> = {
  'roof-replacement': 'Roof Replacement',
  'roof-repair': 'Roof Repair',
  'roof-cleaning': 'Roof Cleaning',
  'roof-inspection': 'Roof Inspection',
  'commercial-roofing': 'Commercial Roofing',
  'metal-roofing': 'Metal Roofing',
  'flat-roofing': 'Flat Roofing',
  'tpo-roofing': 'TPO Roofing',
  'gutter-installation': 'Gutter Installation',
  'gutter-repair': 'Gutter Repair',
  'gutter-cleaning': 'Gutter Cleaning',
  'gutter-guards': 'Gutter Guards',
  'seamless-gutters': '5" Seamless Gutters',
  'skylight-installation': 'Skylight Installation',
  'siding-installation': 'Siding Installation',
  'window-replacement': 'Window Replacement',
  'storm-damage': 'Storm Damage Repair',
  'emergency-services': 'Emergency Services',
  'maintenance': 'Preventive Maintenance',
};

interface GetStartedFormProps {
  title?: string;
  buttonText?: string;
  formColor?: 'red' | 'blue' | 'navy';
  formPosition?: 'hero' | 'section' | 'contact';
  enhanced?: boolean;
}

const GetStartedForm: React.FC<GetStartedFormProps> = ({
  title = "Let's Get Started!",
  buttonText = "Get In Touch",
  formColor = 'red',
  formPosition = 'hero',
  enhanced = true
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // After Zapier accepts the lead, push lead_form_submit so GTM's TechSol
  // (tag 36) and GA4 generate_lead (tag 42) tags fire, then go to /thank-you
  // like the other quote forms. The Zapier payload is unchanged (service
  // stays the slug). A failed Zapier post throws and skips the conversion.
  const onSubmit = async (data: any) => {
    try {
      const serviceLabel = SERVICE_LABELS[data.service] || data.service;
      const leadValue = getLeadValue(serviceLabel);
      const eventId = (crypto as Crypto).randomUUID();
      const externalId = getOrCreateExternalId();
      const [firstName, ...rest] = String(data.name || '').trim().split(/\s+/);
      const lastName = rest.join(' ');

      const { submitLead } = await import('@/utils/submitLead');
      await submitLead({
        name: data.name,
        email: data.email,
        phone: data.phone,
        zip: data.zipCode,
        service: data.service,
        source: window.location.pathname,
      });

      savePIIForReuse({
        email: data.email,
        phone: data.phone,
        first_name: firstName,
        last_name: lastName,
        zip: data.zipCode,
      });
      updateAdvancedMatching({
        email: data.email,
        phone: data.phone,
        first_name: firstName,
        last_name: lastName,
        zip: data.zipCode,
      });

      (window as unknown as { dataLayer?: unknown[] }).dataLayer =
        (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
      (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
        event: 'lead_form_submit',
        event_id: eventId,
        lead_value: leadValue,
        currency: 'USD',
        service: serviceLabel,
        form_name: `get_started_${formPosition}`,
        am_em: String(data.email).trim().toLowerCase(),
        am_ph: String(data.phone).replace(/\D/g, ''),
        am_fn: firstName?.toLowerCase(),
        am_ln: lastName?.toLowerCase(),
        am_zp: data.zipCode,
        am_country: 'us',
        am_external_id: externalId,
      });

      navigate('/thank-you', {
        state: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: serviceLabel,
          zip: data.zipCode,
          event_id: eventId,
        },
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Something went wrong — please call (206) 739-8232 and we'll take your info by phone.");
    }
  };

  // Combine all services for the dropdown
  const allServices = [
    ...roofingServices.map(service => ({
      value: service.title.toLowerCase().replace(/\s+/g, '-'),
      label: service.title
    })),
    ...exteriorServices.map(service => ({
      value: service.title.toLowerCase().replace(/\s+/g, '-'),
      label: service.title
    }))
  ];

  const formPositionClass = `get-started-form ${formPosition === 'hero' ? 'hero-form' : formPosition === 'section' ? 'section-form' : 'contact-form'}`;

  return (
    <div className="relative z-30 mt-8">
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)} 
        className={formPositionClass}
      >
        <div className="form-flex">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            style={{
              color: formColor === 'red' ? '#CC0000' : formColor === 'blue' ? '#0066CC' : '#001F3F'
            }} 
            className="form-title animate-pulse-glow"
          >
            {title}
          </motion.div>
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="text" 
            placeholder="Full Name" 
            className="form-input hover-lift" 
            {...register('name', {
              required: 'Name is required'
            })} 
          />
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="email" 
            placeholder="Email Address" 
            className="form-input hover-lift" 
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} 
          />
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="tel" 
            placeholder="Phone Number" 
            className="form-input hover-lift" 
            {...register('phone', {
              required: 'Phone is required'
            })} 
          />
          
          <motion.input 
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="text" 
            placeholder="Zip Code" 
            className="form-input hover-lift" 
            {...register('zipCode', {
              required: 'Zip code is required'
            })} 
          />
          
          <motion.select 
            whileFocus={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="form-input form-select hover-lift" 
            defaultValue="" 
            {...register('service', {
              required: 'Please select a service'
            })}
          >
            <option value="" disabled>Select Service</option>
            <optgroup label="Roofing Services">
              <option value="roof-replacement">Roof Replacement</option>
              <option value="roof-repair">Roof Repair</option>
              <option value="roof-cleaning">Roof Cleaning</option>
              <option value="roof-inspection">Roof Inspection</option>
              <option value="commercial-roofing">Commercial Roofing</option>
              <option value="metal-roofing">Metal Roofing</option>
              <option value="flat-roofing">Flat Roofing</option>
              <option value="tpo-roofing">TPO Roofing</option>
            </optgroup>
            <optgroup label="Gutter Services">
              <option value="gutter-installation">Gutter Installation</option>
              <option value="gutter-repair">Gutter Repair</option>
              <option value="gutter-cleaning">Gutter Cleaning</option>
              <option value="gutter-guards">Gutter Guards</option>
              <option value="seamless-gutters">5" Seamless Gutters</option>
            </optgroup>
            <optgroup label="Other Services">
              <option value="skylight-installation">Skylight Installation</option>
              <option value="siding-installation">Siding Installation</option>
              <option value="window-replacement">Window Replacement</option>
              <option value="storm-damage">Storm Damage Repair</option>
              <option value="emergency-services">Emergency Services</option>
              <option value="maintenance">Preventive Maintenance</option>
            </optgroup>
          </motion.select>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit" 
            className="form-button w-full md:w-auto animate-shine" 
            style={{
              background: formColor === 'red' ? '#CC0000' : formColor === 'blue' ? '#0066CC' : '#001F3F'
            }}
          >
            {buttonText}
            <ArrowRight size={16} className="ml-2" />
          </motion.button>
        </div>
        
        {enhanced && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full mt-3 flex justify-center gap-4 text-sm text-gray-600"
          >
            <div className="flex items-center">
              <span className="text-red-600 mr-1">✓</span> 7-Second Form
            </div>
            <div className="flex items-center">
              <span className="text-red-600 mr-1">✓</span> Fast Response
            </div>
            <div className="flex items-center">
              <span className="text-red-600 mr-1">✓</span> 24/7 Service
            </div>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
};

export default GetStartedForm;
