import type { JSX, ReactNode } from 'react'
import type { CartItem } from '../schemas/product'

// ─── Props ────────────────────────────────────────────────────────────────────

interface OrderSummaryProps {
  items: CartItem[]
  shippingNote: string
  footer: ReactNode
}

// ─── OrderSummary ─────────────────────────────────────────────────────────────

export function OrderSummary({ items, shippingNote, footer }: OrderSummaryProps): JSX.Element {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
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
          <p className="text-xs text-caramel/60 mt-1">{shippingNote}</p>
        </div>

        {footer}
      </div>
    </aside>
  )
}
