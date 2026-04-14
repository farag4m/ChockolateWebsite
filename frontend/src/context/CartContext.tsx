import { createContext, useReducer } from 'react'
import type { JSX, ReactNode } from 'react'
import type { CartItem, Product } from '../schemas/product'

// ─── Context value type ───────────────────────────────────────────────────────

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clear: () => void
}

// eslint-disable-next-line react-refresh/only-export-components -- context object must be co-located with its provider
export const CartContext = createContext<CartContextValue | null>(null)

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[]
}

// ─── Actions ──────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

// ─── Reducer ──────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i,
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i,
        ),
      }
    case 'CLEAR':
      return { items: [] }
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const addItem = (product: Product, quantity = 1): void => {
    dispatch({ type: 'ADD_ITEM', product, quantity })
  }

  const removeItem = (productId: string): void => {
    dispatch({ type: 'REMOVE_ITEM', productId })
  }

  const updateQuantity = (productId: string, quantity: number): void => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  }

  const clear = (): void => {
    dispatch({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider
      value={{ items: state.items, itemCount, addItem, removeItem, updateQuantity, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

