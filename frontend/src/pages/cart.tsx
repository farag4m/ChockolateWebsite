import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { useCart } from '../hooks/useCart'
import type { CartItem } from '../schemas/product'

// ─── CartItemRow ──────────────────────────────────────────────────────────────

interface CartItemRowProps {
  item: CartItem
  onRemove: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
}

function CartItemRow({ item, onRemove, onUpdateQuantity }: CartItemRowProps): JSX.Element {
  const { product, quantity } = item

  const handleDecrement = (): void => {
    onUpdateQuantity(product.id, quantity - 1)
  }

  const handleIncrement = (): void => {
    onUpdateQuantity(product.id, quantity + 1)
  }

  const handleRemove = (): void => {
    onRemove(product.id)
  }

  return (
    <article className="flex items-center gap-6 bg-white rounded-2xl p-6 border border-cream-muted shadow-[0_4px_40px_rgba(26,10,0,0.04)]">
      {/* Image placeholder */}
      <div className="w-20 h-20 flex-shrink-0 rounded-xl bg-cream-muted flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-serif text-xs text-caramel text-center px-2 leading-tight capitalize">
            {product.category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-serif text-lg text-cocoa truncate">{product.name}</h3>
        <p className="text-caramel text-sm font-light truncate">{product.description}</p>
        <p className="text-cocoa font-medium mt-1">${product.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={handleDecrement}
          aria-label={`Decrease quantity of ${product.name}`}
          className={clsx(
            'w-8 h-8 rounded-full border border-caramel/30 flex items-center justify-center',
            'text-caramel hover:bg-caramel hover:text-cream transition-colors duration-200',
            'disabled:opacity-40 disabled:cursor-not-allowed',
          )}
        >
          <span aria-hidden="true">−</span>
        </button>
        <span className="w-6 text-center text-cocoa font-medium tabular-nums">{quantity}</span>
        <button
          type="button"
          onClick={handleIncrement}
          aria-label={`Increase quantity of ${product.name}`}
          className={clsx(
            'w-8 h-8 rounded-full border border-caramel/30 flex items-center justify-center',
            'text-caramel hover:bg-caramel hover:text-cream transition-colors duration-200',
          )}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      {/* Line total */}
      <p className="w-20 text-right text-cocoa font-medium tabular-nums flex-shrink-0">
        ${(product.price * quantity).toFixed(2)}
      </p>

      {/* Remove */}
      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Remove ${product.name} from cart`}
        className="flex-shrink-0 text-caramel/50 hover:text-red-500 transition-colors duration-200 ml-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </article>
  )
}

// ─── CartPage ─────────────────────────────────────────────────────────────────

export default function CartPage(): JSX.Element {
  const { items, removeItem, updateQuantity } = useCart()

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-caramel/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
          />
        </svg>
        <h2 className="font-serif text-3xl text-cocoa">Your cart is empty</h2>
        <p className="text-caramel text-base font-light">Add some chocolates to get started.</p>
        <Link
          to="/shop"
          className="mt-2 bg-cocoa text-cream px-8 py-3 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-caramel transition-colors duration-300"
        >
          Browse Collection
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-20 bg-cream min-h-screen">
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

          <h1 className="font-serif text-4xl md:text-5xl text-cocoa mb-12">Your Cart</h1>

          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Item list */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}

              <div className="pt-4">
                <Link
                  to="/shop"
                  className="text-sm text-caramel hover:text-gold underline underline-offset-2 transition-colors duration-200"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <aside className="lg:w-80 w-full flex-shrink-0">
              <div className="bg-white rounded-2xl p-8 border border-cream-muted shadow-[0_4px_40px_rgba(26,10,0,0.04)]">
                <h2 className="font-serif text-2xl text-cocoa mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm text-cocoa/70">
                      <span className="truncate pr-2">{item.product.name} × {item.quantity}</span>
                      <span className="tabular-nums flex-shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cream-muted pt-4 mb-6">
                  <div className="flex justify-between text-cocoa font-medium text-base">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-caramel/60 mt-1">Shipping calculated at checkout</p>
                </div>

                <Link
                  to="/checkout"
                  className={clsx(
                    'block w-full text-center bg-cocoa text-cream py-3.5 rounded-full',
                    'text-sm font-medium uppercase tracking-wider',
                    'hover:bg-caramel transition-colors duration-300',
                  )}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  )
}
