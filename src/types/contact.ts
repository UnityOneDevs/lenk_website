import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number must be at least 7 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  timeline: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface ContactSubmission extends ContactFormData {
  _id?: string
  createdAt: Date
  status: 'new' | 'contacted' | 'in-progress' | 'completed'
}

export const services = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'DevOps & Infrastructure',
  'Consulting',
  'Other',
] as const

export const timelineOptions = [
  'ASAP',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Flexible',
] as const
