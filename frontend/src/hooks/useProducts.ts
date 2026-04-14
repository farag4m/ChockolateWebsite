import { useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { fetchProduct, fetchProducts } from '../api/client'
import type { ApiResponse } from '../types/api'
import type { Product } from '../schemas/product'

export function useProducts(): UseQueryResult<ApiResponse<Product[]>, Error> {
  return useQuery<ApiResponse<Product[]>, Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

export function useProduct(id: string): UseQueryResult<ApiResponse<Product>, Error> {
  return useQuery<ApiResponse<Product>, Error>({
    queryKey: ['products', id],
    queryFn: () => fetchProduct(id),
    enabled: Boolean(id),
  })
}
