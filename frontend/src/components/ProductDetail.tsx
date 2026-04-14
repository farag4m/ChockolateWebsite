import { useState } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { useCart } from '../hooks/useCart'
import type { Product } from '../schemas/product'

interface ProductDetailProps {
  product: Product
}

function StarRating({ rating }: { rating: number }): JSX.Element {
  const full = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const empty = 5 - full - (hasHalf ? 1 : 0)

  return (
    <div className="flex items-center gap-0.5 text-gold" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`full-${i}`}>★</span>
      ))}
      {hasHalf && <span>⯨</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`empty-${i}`} className="text-cocoa/20">★</span>
      ))}
    </div>
  )
}

export function ProductDetail({ product }: ProductDetailProps): JSX.Element {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleDecrement = (): void => {
    setQuantity((q) => Math.max(1, q - 1))
  }

  const handleIncrement = (): void => {
    setQuantity((q) => q + 1)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val) && val >= 1) setQuantity(val)
  }

  const handleAddToCart = (): void => {
    addItem(product, quantity)
  }

  return (
    <section className="relative bg-white border-t border-cream-muted overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row min-h-screen">

        {/* Image pane */}
        <div
          className={clsx(
            'w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen overflow-hidden',
            `bg-gradient-to-br ${product.imageGradient}`,
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-cream/10 border border-gold/30 p-8 flex flex-col items-center text-center backdrop-blur-sm w-56">
              <span className="text-xs uppercase tracking-[0.2em] text-gold mb-4">{product.origin}</span>
              <span className="font-serif text-5xl text-cream font-medium">
                {product.percentage ?? ''}
              </span>
              <span className="text-cream/60 text-sm mt-4 uppercase tracking-wider">{product.name}</span>
            </div>
          </div>
          {/* Origin badge */}
          <div className="absolute top-8 left-8 bg-cream text-cocoa px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold">{product.origin}</span>
          </div>
        </div>

        {/* Content pane */}
        <div className="w-full lg:w-1/2 flex items-center bg-cream px-6 py-16 lg:px-16">
          <div className="max-w-xl w-full">

            {/* Meta */}
            <div className="flex items-center justify-between mb-6 border-b border-caramel/20 pb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-caramel bg-caramel/10 px-3 py-1 rounded-sm">
                {product.category === 'single-origin' ? `Single Origin · ${product.origin}` : product.origin}
              </span>
              <div className="flex items-center gap-2">
                <StarRating rating={product.rating} />
                <span className="text-cocoa text-xs font-medium border-l border-cocoa/20 pl-2">
                  {product.rating} ({product.reviewCount} Reviews)
                </span>
              </div>
            </div>

            {/* Title & price */}
            <h1 className="font-serif text-5xl text-cocoa mb-3 leading-tight">
              {product.name}
            </h1>
            <div className="text-3xl text-gold font-serif mb-6">${product.price.toFixed(2)}</div>

            {/* Description */}
            <p className="text-cocoa/80 text-lg font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Taste notes */}
            {product.tasteNotes.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                {product.tasteNotes.map((note) => (
                  <div
                    key={note}
                    className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-cream-muted text-center"
                  >
                    <span className="text-xs uppercase tracking-wider font-medium text-cocoa">{note}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-caramel/30 rounded-full bg-white h-14 w-full sm:w-36 justify-between px-4">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="text-cocoa hover:text-gold text-xl px-1 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={handleQuantityChange}
                  className="w-10 text-center text-lg font-medium text-cocoa bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="text-cocoa hover:text-gold text-xl px-1 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={clsx(
                  'flex-grow bg-cocoa text-cream h-14 rounded-full uppercase text-sm font-bold tracking-widest',
                  'hover:bg-caramel transition-colors duration-300 flex items-center justify-center gap-3',
                )}
              >
                <span>Add to Cart</span>
                <span className="w-px h-4 bg-cream/30" />
                <span>${(product.price * quantity).toFixed(2)}</span>
              </button>
            </div>

            {/* Wishlist */}
            <div className="border-t border-caramel/10 pt-5">
              <button
                type="button"
                className="flex items-center gap-2 text-sm text-caramel font-medium hover:text-cocoa transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:text-red-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Add to Wishlist
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
