import axios from 'axios'
import type { ApiResponse } from '../types/api'
import type { Product } from '../schemas/product'
import { PRODUCTS } from '../constants/products'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Stub functions — replace with real API calls when backend is ready.
// All API calls must go through this module; no direct fetch() in components.

export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  // TODO: replace with apiClient.get<ApiResponse<Product[]>>('/products').then(r => r.data)
  return Promise.resolve({ data: PRODUCTS, message: 'ok', success: true })
}

export async function fetchProduct(id: string): Promise<ApiResponse<Product>> {
  const product = PRODUCTS.find((p) => p.id === id)
  if (!product) {
    return Promise.reject(new Error(`Product not found: ${id}`))
  }
  return Promise.resolve({ data: product, message: 'ok', success: true })
}
