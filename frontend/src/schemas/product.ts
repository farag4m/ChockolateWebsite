import { z } from 'zod'

// Matches backend product model fields from issue #3:
// id, name, description, price, image_url, category
// Categories: dark, milk, white (2–3 categories per backend seed spec)
export const ProductSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  image_url: z.string(),
  category: z.enum(['dark', 'milk', 'white']),
})

export type Product = z.infer<typeof ProductSchema>

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
})

export type CartItem = z.infer<typeof CartItemSchema>
