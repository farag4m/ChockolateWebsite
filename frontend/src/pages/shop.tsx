import type { JSX } from 'react'
import { ProductCard } from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export default function ShopPage(): JSX.Element {
  const { data, isLoading, isError } = useProducts()

  if (isLoading) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <p className="text-caramel font-serif text-xl">Loading collection…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <p className="text-red-600 font-serif text-xl">Unable to load products. Please try again.</p>
      </main>
    )
  }

  return (
    <main className="pt-20 bg-cream min-h-screen">
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-cocoa mb-3">Our Collection</h2>
              <p className="text-caramel text-base md:text-lg max-w-md font-light">
                Discover our core lineup of ethically sourced, meticulously refined bars.
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
            {data.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
