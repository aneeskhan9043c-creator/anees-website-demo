import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadFormData, SubmissionState } from '../types';
import { Send, Clock, CheckCircle, X } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  booking_date: z.string().min(1, 'Preferred date is required'),
  booking_time: z.string().min(1, 'Time slot is required'),
  service: z.string().min(1, 'Service is required'),
  budget: z.string().min(1, 'Budget is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormErrors = z.inferFlattenedErrors<typeof formSchema>['fieldErrors'];

const INITIAL_FORM_STATE: LeadFormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  booking_date: '',
  booking_time: '',
  message: '',
};

const SERVICES = ['Custom Website', 'n8n Automation', 'Google Maps SEO', 'Full Package'];
const BUDGETS = ['$300 - $500', '$500 - $1k', '$1,000+', 'Custom Budget'];
const TIME_SLOTS = ['10:00 AM', '02:00 PM', '05:00 PM', '08:00 PM'];



export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [showCustomTime, setShowCustomTime] = useState(false);
  const [showCustomBudget, setShowCustomBudget] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBudgetClick = (budget: string) => {
    if (budget === 'Custom Budget') {
      setShowCustomBudget(true);
      if (['$300 - $500', '$500 - $1k', '$1,000+'].includes(formData.budget)) {
        updateField('budget', '');
      }
    } else {
      setShowCustomBudget(false);
      updateField('budget', budget);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      setErrors({});
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.flatten().fieldErrors);
      }
      return;
    }

    setStatus('submitting');

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferredDate: formData.booking_date,
      timeSlot: formData.booking_time,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const messageText = `*New Strategy Call Booking*

*Name:* ${payload.fullName}
*Email:* ${payload.email}
*Phone:* ${payload.phone}
*Service:* ${payload.service}
*Budget:* ${payload.budget}
*Preferred Date:* ${payload.preferredDate}
*Time Slot:* ${payload.timeSlot}

*Message:*
${payload.message}`;

      const whatsappUrl = `https://wa.me/923706980818?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');

      setStatus('success');
      setFormData(INITIAL_FORM_STATE);
      setShowCustomTime(false);
      setShowCustomBudget(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500" />

      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Secure Your Strategy Call
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Fill in your project details below to lock in an available slot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Full Name *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="John Doe"
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name[0]}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Email Address *</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@company.com"
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email[0]}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Phone / WhatsApp *</label>
            <input 
              type="text" 
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
            />
            {errors.phone && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.phone[0]}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Preferred Date *</label>
            <div className="relative">
              <input 
                type="date" 
                min={today}
                value={formData.booking_date}
                onChange={(e) => updateField('booking_date', e.target.value)}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 ${errors.booking_date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
              />
            </div>
            {errors.booking_date && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.booking_date[0]}</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">Available Time Slots</label>
            <button 
              type="button" 
              onClick={() => {
                setShowCustomTime(!showCustomTime);
                if (showCustomTime) updateField('booking_time', '');
              }}
              className="text-xs text-indigo-600 hover:underline font-semibold">
              {showCustomTime ? "Select preset slot" : "+ Custom Time"}
            </button>
          </div>

          {!showCustomTime ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => updateField('booking_time', slot)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                    formData.booking_time === slot
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <input 
              type="text"
              value={formData.booking_time}
              onChange={(e) => updateField('booking_time', e.target.value)}
              placeholder="Enter preferred time (e.g., 03:30 PM EST)"
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.booking_time ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
            />
          )}
          {errors.booking_time && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.booking_time[0]}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Service Required</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SERVICES.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => updateField('service', service)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  formData.service === service
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
          {errors.service && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.service[0]}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Estimated Budget</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BUDGETS.map((budget) => {
              const isSelected = budget === 'Custom Budget' ? showCustomBudget : (!showCustomBudget && formData.budget === budget);
              return (
                <button
                  key={budget}
                  type="button"
                  onClick={() => handleBudgetClick(budget)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}>
                  {budget}
                </button>
              )
            })}
          </div>
          {showCustomBudget && (
            <div className="mt-3">
              <input 
                type="text" 
                value={formData.budget}
                onChange={(e) => updateField('budget', e.target.value)}
                placeholder="Enter your specific budget (e.g. $750 or PKR 150,000)"
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${errors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
              />
            </div>
          )}
          {errors.budget && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.budget[0]}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Project Message *</label>
          <textarea 
            rows={4}
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            placeholder="Briefly describe your requirements, goals, or current setup..."
            className={`w-full bg-slate-50 border rounded-xl p-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400 resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200'}`}
          />
          {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message[0]}</p>}
        </div>

        <button 
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-700 hover:to-violet-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed">
          <span>{status === 'submitting' ? 'Processing...' : 'Confirm Booking & Send Request'}</span>
          <Send className="w-4 h-4" />
        </button>

      </form>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-center border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setStatus('idle')}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
              <p className="text-slate-500 mb-6">
                Thank you for your interest. We've received your booking and will be in touch shortly.
              </p>
              
              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

