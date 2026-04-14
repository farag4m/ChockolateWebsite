import { z } from 'zod'

export const CheckoutFormSchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Valid email address is required'),
  address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'ZIP / postal code is required'),
})

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>
