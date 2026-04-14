import type { Product } from '../schemas/product'

// Seed data mirroring backend issue #3 (6 products, 3 categories: dark / milk / white)
// id is an integer to match the backend model
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Dark Ecuador 72%',
    description: 'Intense cocoa notes with hints of blackberry and espresso.',
    price: 12.99,
    image_url: '',
    category: 'dark',
  },
  {
    id: 2,
    name: 'Dark Peru 85%',
    description: 'Bold and earthy with a long, smoky finish.',
    price: 13.99,
    image_url: '',
    category: 'dark',
  },
  {
    id: 3,
    name: 'Milk Madagascar 45%',
    description: 'Velvety smooth with bright red fruit acidity.',
    price: 12.99,
    image_url: '',
    category: 'milk',
  },
  {
    id: 4,
    name: 'Milk Colombia 38%',
    description: 'Caramel sweetness balanced with toasted nut undertones.',
    price: 11.99,
    image_url: '',
    category: 'milk',
  },
  {
    id: 5,
    name: 'White Vanilla Bean',
    description: 'Rich cocoa butter flecked with raw Tahitian vanilla.',
    price: 11.99,
    image_url: '',
    category: 'white',
  },
  {
    id: 6,
    name: 'White Raspberry',
    description: 'Creamy white chocolate with freeze-dried tart raspberries.',
    price: 12.49,
    image_url: '',
    category: 'white',
  },
]

export const FEATURED_PRODUCT_ID = 1
