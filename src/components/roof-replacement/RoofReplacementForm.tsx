
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RoofReplacementForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [roofType, setRoofType] = useState('asphalt');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber || !email || !zipCode) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the form data to be sent
      const formData = {
        name,
        phoneNumber,
        email,
        zipCode,
        roofType,
        timestamp: new Date().toISOString(),
        source: 'Roof Replacement Form'
      };

      const { submitLead } = await import('@/utils/submitLead');
      await submitLead({
        name,
        phone: phoneNumber,
        email,
        zip: zipCode,
        service: roofType,
        source: 'Roof Replacement Form',
      });

      // Show success message
      toast.success("Request submitted successfully!", {
        description: "We'll contact you shortly about your roof replacement project"
      });

      // Reset form fields
      setName('');
      setPhoneNumber('');
      setEmail('');
      setZipCode('');
      setRoofType('asphalt');

      // Redirect to the contact page
      navigate('/contact');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("There was a problem submitting your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="custom-form-container">
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-left">
          <h2>Find Out Your Roof Cost Today</h2>
        </div>
        
        <div className="form-fields">
          <input 
            type="text" 
            className="form-input" 
            placeholder="Full Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          
          <input 
            type="tel" 
            className="form-input" 
            placeholder="Phone Number" 
            value={phoneNumber} 
            onChange={e => setPhoneNumber(e.target.value)} 
            required 
          />
          
          <input 
            type="email" 
            className="form-input" 
            placeholder="Email Address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          
          <input 
            type="text" 
            className="form-input" 
            placeholder="Zip Code" 
            value={zipCode} 
            onChange={e => setZipCode(e.target.value)} 
            required 
          />
          
          <select 
            className="form-input form-select" 
            value={roofType} 
            onChange={e => setRoofType(e.target.value)}
          >
            <option value="asphalt">Asphalt Shingles</option>
            <option value="metal">Metal Roof</option>
            <option value="flat">Flat Roof</option>
          </select>
          
          <button type="submit" className="form-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Get Free Estimate'} <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoofReplacementForm;
