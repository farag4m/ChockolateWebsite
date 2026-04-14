import { useState } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { useCart } from '../hooks/useCart'
import type { Product } from '../schemas/product'

interface ProductDetailProps {
  product: Product
}

const CATEGORY_LABEL: Record<Product['category'], string> = {
  dark: 'Dark Chocolate',
  milk: 'Milk Chocolate',
  white: 'White Chocolate',
}

const CATEGORY_BG: Record<Product['category'], string> = {
  dark: 'from-[#3d1f11] to-[#1a0a00]',
  milk: 'from-[#8c6046] to-[#5a3a2a]',
  white: 'from-[#f0d8b6] to-[#d4b998]',
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
            `bg-gradient-to-br ${CATEGORY_BG[product.category]}`,
          )}
        >
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-cream/10 border border-gold/30 p-8 flex flex-col items-center text-center backdrop-blur-sm w-56">
                <span className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                  {CATEGORY_LABEL[product.category]}
                </span>
                <span className="text-cream/60 text-sm mt-4 uppercase tracking-wider">{product.name}</span>
              </div>
            </div>
          )}
          {/* Category badge */}
          <div className="absolute top-8 left-8 bg-cream text-cocoa px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-10">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold capitalize">
              {CATEGORY_LABEL[product.category]}
            </span>
          </div>
        </div>

        {/* Content pane */}
        <div className="w-full lg:w-1/2 flex items-center bg-cream px-6 py-16 lg:px-16">
          <div className="max-w-xl w-full">

            {/* Meta */}
            <div className="mb-6 border-b border-caramel/20 pb-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-caramel bg-caramel/10 px-3 py-1 rounded-sm">
                {CATEGORY_LABEL[product.category]}
              </span>
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
