// src/components/sections/QuoteRequestForm.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, Package, Truck, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormState {
  name: string;
  email: string;
  companyName: string;
  serviceType: string;
  shipmentVolume: string;
  startDate: string;
  requirements: string;
}

interface SubmissionStatus {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  companyName: '',
  serviceType: 'warehousing',
  shipmentVolume: '',
  startDate: '',
  requirements: '',
};

const serviceOptions = [
  { value: 'warehousing', label: 'Warehousing' },
  { value: 'distribution', label: 'Distribution' },
  { value: 'supply-chain', label: 'Supply Chain Management' },
  { value: 'transportation', label: 'Transportation' },
];

export default function QuoteRequestForm() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({ 
    status: 'idle' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmissionStatus({ status: 'loading' });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();

      if (data.success) {
        setSubmissionStatus({ 
          status: 'success',
          message: 'Your quote request has been sent successfully! We\'ll get back to you soon.'
        });
        setFormState(initialFormState);
      } else {
        setSubmissionStatus({
          status: 'error',
          message: data.error || 'Failed to send message. Please try again later.'
        });
      }
      
    } catch (_) {
      setSubmissionStatus({ 
        status: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const renderFormField = (
    id: keyof FormState,
    label: string,
    type: string = 'text',
    icon: React.ReactNode,
    placeholder: string,
    options?: Array<{ value: string; label: string }>
  ) => (
    <motion.div variants={inputVariants} whileFocus="focus">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-black mb-2 flex items-center gap-2"
      >
        {icon}
        {label}
      </label>
      {type === 'select' && options ? (
        <select
          id={id}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black"
          value={formState[id]}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, [id]: e.target.value }))
          }
          required
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          rows={4}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
          value={formState[id]}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, [id]: e.target.value }))
          }
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          id={id}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/50 text-black placeholder-black/60"
          value={formState[id]}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, [id]: e.target.value }))
          }
          placeholder={placeholder}
          required
        />
      )}
    </motion.div>
  );

  return (
    <>
      {submissionStatus.status !== 'idle' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert variant={submissionStatus.status === 'success' ? 'default' : 'destructive'}>
            {submissionStatus.status === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {submissionStatus.status === 'success' ? 'Success!' : 'Error'}
            </AlertTitle>
            <AlertDescription>
              {submissionStatus.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {renderFormField(
            'name',
            'Your Name',
            'text',
            <User className="w-4 h-4 text-primary-500" />,
            'Enter your full name'
          )}
          {renderFormField(
            'email',
            'Email Address',
            'email',
            <Mail className="w-4 h-4 text-primary-500" />,
            'Enter your email address'
          )}
        </div>

        {renderFormField(
          'companyName',
          'Company Name',
          'text',
          <Package className="w-4 h-4 text-primary-500" />,
          'Enter your company name'
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {renderFormField(
            'serviceType',
            'Service Type',
            'select',
            <Truck className="w-4 h-4 text-primary-500" />,
            '',
            serviceOptions
          )}
          {renderFormField(
            'startDate',
            'Desired Start Date',
            'date',
            <Calendar className="w-4 h-4 text-primary-500" />,
            ''
          )}
        </div>

        {renderFormField(
          'requirements',
          'Service Requirements',
          'textarea',
          <MessageSquare className="w-4 h-4 text-primary-500" />,
          'Describe your logistics requirements, including volume, frequency, and any specific needs...'
        )}

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 text-lg font-semibold"
            disabled={submissionStatus.status === 'loading'}
          >
            {submissionStatus.status === 'loading' ? (
              <>
                Sending...
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </>
            ) : (
              <>
                Request Quote
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </>
  );
}