import type { Product } from '../schemas/product'

export const CATEGORY_LABEL: Record<Product['category'], string> = {
  dark: 'Dark Chocolate',
  milk: 'Milk Chocolate',
  white: 'White Chocolate',
}

export const CATEGORY_BG: Record<Product['category'], string> = {
  dark: 'from-[#3d1f11] to-[#1a0a00]',
  milk: 'from-[#8c6046] to-[#5a3a2a]',
  white: 'from-[#f0d8b6] to-[#d4b998]',
}
