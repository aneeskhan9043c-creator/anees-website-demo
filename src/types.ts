export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  booking_date: string;
  booking_time: string;
  message: string;
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
