https://github.com/farag4m/ChockolateWebsite


[PROJECT OVERVIEW]

This system is governed by a Project Manager agent.

* Human interacts ONLY with Project Manager
* Project Manager creates GitHub Issues for all tasks
* Specialist roles implement tasks via Pull Requests
* Project Manager reviews and approves/rejects Pull Requests
* All behavior is driven by:

  * /roles
  * /rules

---

## Frontend

React + TypeScript + Vite SPA. See `frontend/README.md` for full setup and architecture details.

### Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Hero section and featured products |
| `/shop` | Shop | Full product listing with filters |
| `/products/:id` | Product Detail | Single product view with add-to-cart |
| `/cart` | Cart | View items, adjust quantities, remove items |
| `/checkout` | Checkout | Contact & delivery form, order confirmation |

### Cart persistence

`CartContext` persists the cart to `localStorage` under the key `chocolate_cart`. On load, the stored value is parsed and validated with Zod (`StorageSchema`). Invalid or missing data silently falls back to an empty cart. Cart state is saved to `localStorage` on every state change via a `useEffect`.

### Shared components

| Component | Path | Props | Purpose |
|-----------|------|-------|---------|
| `Navbar` | `src/components/Navbar.tsx` | — | Top navigation; cart icon links to `/cart` and shows live item count |
| `OrderSummary` | `src/components/OrderSummary.tsx` | `items`, `shippingNote`, `footer` | Reusable order summary panel used on both Cart and Checkout pages |
| `ProductCard` | `src/components/ProductCard.tsx` | — | Product tile used in Shop listing |
| `ProductDetail` | `src/components/ProductDetail.tsx` | — | Full product detail display |

### Schemas

| Schema file | Contents |
|-------------|----------|
| `src/schemas/product.ts` | `Product`, `CartItem`, `CartItemSchema` — product and cart item shapes |
| `src/schemas/checkout.ts` | `CheckoutFormSchema`, `CheckoutFormValues` — checkout form validation (name, email, address, city, zip) |

### User flow

```
/shop  →  /products/:id  →  add to cart
                                  ↓
                              /cart  →  /checkout  →  order confirmation
```
