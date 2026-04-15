import type { JSX } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './context/CartContext'
import { Navbar } from './components/Navbar'
import { lazy, Suspense } from 'react'

const HomePage = lazy(() => import('./pages/home'))
const ShopPage = lazy(() => import('./pages/shop'))
const ProductDetailPage = lazy(() => import('./pages/product-detail'))
const CartPage = lazy(() => import('./pages/cart'))
const CheckoutPage = lazy(() => import('./pages/checkout'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function PageSpinner(): JSX.Element {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <span className="font-serif text-caramel text-xl">Loading…</span>
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<PageSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}
