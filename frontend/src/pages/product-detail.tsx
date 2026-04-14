import type { JSX } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ProductDetail } from '../components/ProductDetail'
import { useProduct } from '../hooks/useProducts'

export default function ProductDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useProduct(id ?? '')

  if (!id) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="text-cocoa font-serif text-2xl">Product not found.</p>
        <Link to="/shop" className="text-caramel underline text-sm">Back to shop</Link>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <p className="text-caramel font-serif text-xl">Loading…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 font-serif text-2xl">Unable to load product.</p>
        <Link to="/shop" className="text-caramel underline text-sm">Back to shop</Link>
      </main>
    )
  }

  return (
    <main className="pt-20">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <Link to="/shop" className="text-caramel text-sm hover:text-cocoa transition-colors">
          ← Back to collection
        </Link>
      </div>
      <ProductDetail product={data.data} />
    </main>
  )
}
