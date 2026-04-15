# Chocolate Website — Frontend

React + TypeScript + Vite SPA for the chocolate storefront.

## Tech stack

- **React 19** with lazy-loaded pages via `Suspense`
- **TypeScript** — strict mode, all props and return types annotated
- **Vite** — dev server and build tool
- **React Router v7** — client-side routing
- **TanStack Query** — server state / data fetching
- **Zod** — runtime validation for API responses, cart storage, and form schemas
- **react-hook-form** + `@hookform/resolvers/zod` — form handling on checkout
- **Tailwind CSS** — utility-first styling with custom design tokens (`cocoa`, `gold`, `caramel`, `cream`)

## Running locally

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build
npm run typecheck # tsc --noEmit
```

## Routes

| Path | Page file | Description |
|------|-----------|-------------|
| `/` | `src/pages/home.tsx` | Hero and featured products |
| `/shop` | `src/pages/shop.tsx` | Full product listing |
| `/products/:id` | `src/pages/product-detail.tsx` | Single product, add-to-cart |
| `/cart` | `src/pages/cart.tsx` | Cart management (adjust qty, remove) |
| `/checkout` | `src/pages/checkout.tsx` | Contact & delivery form, order confirmation |

All pages are lazy-loaded. A top-level `Suspense` fallback is provided in `App.tsx`.

## State management

### CartContext (`src/context/CartContext.tsx`)

Global cart state managed with `useReducer`. Exposed via `useCart()` hook (`src/hooks/useCart.ts`).

**localStorage persistence** — cart is saved to `localStorage` under the key `chocolate_cart`.

- **On mount**: `loadFromStorage()` reads and validates the stored JSON with `StorageSchema` (Zod). Invalid or missing data falls back to `{ items: [] }` silently.
- **On every state change**: a `useEffect` calls `saveToStorage(state)`. Storage quota errors and private-browsing restrictions are silently ignored.

```ts
const StorageSchema = z.object({ items: z.array(CartItemSchema) })
```

Supported actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR`.

## Shared components

### `Navbar` — `src/components/Navbar.tsx`

Top navigation bar. The cart icon reads live item count from `useCart()` and links to `/cart`.

### `OrderSummary` — `src/components/OrderSummary.tsx`

Reusable aside panel showing a line-item breakdown and subtotal. Used on both `/cart` and `/checkout`.

| Prop | Type | Description |
|------|------|-------------|
| `items` | `CartItem[]` | Items to display |
| `shippingNote` | `string` | Text shown below subtotal (e.g. "Shipping calculated at checkout") |
| `footer` | `ReactNode` | CTA slot — Checkout button on Cart page, Edit Cart link on Checkout page |

### `ProductCard` — `src/components/ProductCard.tsx`

Product tile used in the Shop listing.

### `ProductDetail` — `src/components/ProductDetail.tsx`

Full product view with add-to-cart action.

## Schemas

| File | Exports | Purpose |
|------|---------|---------|
| `src/schemas/product.ts` | `Product`, `CartItem`, `CartItemSchema` | Product and cart item shapes; `CartItemSchema` used for localStorage validation |
| `src/schemas/checkout.ts` | `CheckoutFormSchema`, `CheckoutFormValues` | Checkout form fields: `name`, `email`, `address`, `city`, `zip` |

## User flow

```
/shop  →  /products/:id  →  add to cart
                                  ↓
                              /cart  →  /checkout  →  order confirmation
                                ↑
                      (cart icon in Navbar)
```

Checkout is a demo — no payment is charged. On form submit the cart is cleared and a confirmation screen is shown. An empty cart redirects from `/checkout` back to `/cart`.

## Rules

TypeScript strict mode must stay on. `tsc --noEmit` must pass with zero errors. All props, parameters, and return values must be typed. Use Zod as the runtime validation layer and derive TypeScript types from Zod schemas with `z.infer<>`.
