import { useState } from 'react'
import type { JSX } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useCart } from '../hooks/useCart'
import { CheckoutFormSchema } from '../schemas/checkout'
import type { CheckoutFormValues } from '../schemas/checkout'

// ─── FieldError ───────────────────────────────────────────────────────────────

interface FieldErrorProps {
  message: string | undefined
}

function FieldError({ message }: FieldErrorProps): JSX.Element | null {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-500">{message}</p>
}

// ─── Confirmation screen ──────────────────────────────────────────────────────

function OrderConfirmation(): JSX.Element {
  return (
    <main className="pt-20 min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6">
      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl text-cocoa text-center">
        Order Placed!
      </h2>
      <p className="text-caramel text-base font-light text-center max-w-sm">
        Thank you for your order. We'll have your chocolates ready soon.
      </p>
      <Link
        to="/shop"
        className="mt-2 bg-cocoa text-cream px-8 py-3 rounded-full text-sm font-medium uppercase tracking-wider hover:bg-caramel transition-colors duration-300"
      >
        Continue Shopping
      </Link>
    </main>
  )
}

// ─── CheckoutPage ─────────────────────────────────────────────────────────────

export default function CheckoutPage(): JSX.Element {
  const { items, clear } = useCart()
  const [confirmed, setConfirmed] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
  })

  const onSubmit = (): void => {
    // No real payment processing — clear cart and show confirmation
    clear()
    setConfirmed(true)
  }

  if (confirmed) {
    return <OrderConfirmation />
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <main className="pt-20 bg-cream min-h-screen">
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

          <h1 className="font-serif text-4xl md:text-5xl text-cocoa mb-12">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex-1"
            >
              <div className="bg-white rounded-2xl p-8 border border-cream-muted shadow-[0_4px_40px_rgba(26,10,0,0.04)]">
                <h2 className="font-serif text-2xl text-cocoa mb-6">Contact & Delivery</h2>

                <div className="space-y-5">

                  {/* Full name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-cocoa mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      {...register('name')}
                      className={clsx(
                        'w-full rounded-xl border px-4 py-3 text-cocoa text-sm bg-cream',
                        'placeholder:text-caramel/40 outline-none transition-colors duration-200',
                        'focus:border-gold focus:ring-1 focus:ring-gold/30',
                        errors.name ? 'border-red-400' : 'border-caramel/20',
                      )}
                      placeholder="Jane Smith"
                    />
                    <FieldError message={errors.name?.message} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-cocoa mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email')}
                      className={clsx(
                        'w-full rounded-xl border px-4 py-3 text-cocoa text-sm bg-cream',
                        'placeholder:text-caramel/40 outline-none transition-colors duration-200',
                        'focus:border-gold focus:ring-1 focus:ring-gold/30',
                        errors.email ? 'border-red-400' : 'border-caramel/20',
                      )}
                      placeholder="jane@example.com"
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  {/* Street address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-cocoa mb-1">
                      Street Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      autoComplete="street-address"
                      {...register('address')}
                      className={clsx(
                        'w-full rounded-xl border px-4 py-3 text-cocoa text-sm bg-cream',
                        'placeholder:text-caramel/40 outline-none transition-colors duration-200',
                        'focus:border-gold focus:ring-1 focus:ring-gold/30',
                        errors.address ? 'border-red-400' : 'border-caramel/20',
                      )}
                      placeholder="123 Cocoa Lane"
                    />
                    <FieldError message={errors.address?.message} />
                  </div>

                  {/* City + ZIP row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-cocoa mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        autoComplete="address-level2"
                        {...register('city')}
                        className={clsx(
                          'w-full rounded-xl border px-4 py-3 text-cocoa text-sm bg-cream',
                          'placeholder:text-caramel/40 outline-none transition-colors duration-200',
                          'focus:border-gold focus:ring-1 focus:ring-gold/30',
                          errors.city ? 'border-red-400' : 'border-caramel/20',
                        )}
                        placeholder="Brussels"
                      />
                      <FieldError message={errors.city?.message} />
                    </div>

                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-cocoa mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        autoComplete="postal-code"
                        {...register('zip')}
                        className={clsx(
                          'w-full rounded-xl border px-4 py-3 text-cocoa text-sm bg-cream',
                          'placeholder:text-caramel/40 outline-none transition-colors duration-200',
                          'focus:border-gold focus:ring-1 focus:ring-gold/30',
                          errors.zip ? 'border-red-400' : 'border-caramel/20',
                        )}
                        placeholder="1000"
                      />
                      <FieldError message={errors.zip?.message} />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(
                    'mt-8 w-full bg-cocoa text-cream py-4 rounded-full',
                    'text-sm font-medium uppercase tracking-wider',
                    'hover:bg-caramel transition-colors duration-300',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                  )}
                >
                  Place Order
                </button>

                <p className="mt-4 text-xs text-caramel/50 text-center">
                  No payment is charged — this is a demo checkout.
                </p>
              </div>
            </form>

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

                <div className="border-t border-cream-muted pt-4 mb-4">
                  <div className="flex justify-between text-cocoa font-medium text-base">
                    <span>Subtotal</span>
                    <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-caramel/60 mt-1">Shipping calculated separately</p>
                </div>

                <Link
                  to="/cart"
                  className="text-sm text-caramel hover:text-gold underline underline-offset-2 transition-colors duration-200"
                >
                  ← Edit Cart
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  )
}
