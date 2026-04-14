import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { useCart } from '../hooks/useCart'
import type { Product } from '../schemas/product'
import { CATEGORY_LABEL, CATEGORY_BG } from '../constants/categories'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    addItem(product)
  }

  return (
    <article
      className={clsx(
        'group flex flex-col bg-white rounded-2xl overflow-hidden border border-cream-muted',
        'shadow-[0_4px_40px_rgba(26,10,0,0.04)] hover:shadow-[0_20px_60px_rgba(26,10,0,0.08)]',
        'transition-all duration-500 hover:-translate-y-2',
      )}
    >
      <Link to={`/products/${product.id}`} className="block p-4 bg-cream-muted/30">
        <div
          className={clsx(
            'relative aspect-[4/3] rounded-xl flex items-center justify-center overflow-hidden',
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
            <div className="z-10 bg-cream px-6 py-4 border-2 border-gold shadow-2xl flex flex-col items-center text-center w-36">
              <span className="text-[10px] uppercase tracking-widest text-caramel mb-1">
                {CATEGORY_LABEL[product.category]}
              </span>
              <span className="font-serif text-xl text-cocoa font-semibold capitalize">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-caramel mb-1">
            {CATEGORY_LABEL[product.category]}
          </p>
          <h3 className="font-serif text-xl text-cocoa mb-2 truncate">{product.name}</h3>
          <p className="text-cocoa/70 text-sm font-light mb-4 truncate">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-medium text-cocoa">${product.price.toFixed(2)}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            className={clsx(
              'bg-cocoa text-cream px-5 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider',
              'hover:bg-caramel transition-colors duration-300',
            )}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  )
}
