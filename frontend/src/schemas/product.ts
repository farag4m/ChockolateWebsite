import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  origin: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageGradient: z.string(),
  category: z.enum(['single-origin', 'blend', 'botanical']),
  percentage: z.string().optional(),
  tasteNotes: z.array(z.string()),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
})

export type Product = z.infer<typeof ProductSchema>

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
})

export type CartItem = z.infer<typeof CartItemSchema>
