import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

export function Navbar(): JSX.Element {
  const { itemCount } = useCart()

  return (
    <nav className="fixed top-0 w-full z-50 bg-cream/90 backdrop-blur-md border-b border-caramel/10">
      <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Nav Links */}
        <ul className="hidden md:flex space-x-10 text-sm font-medium tracking-wide uppercase text-cocoa">
          <li>
            <Link to="/" className="hover:text-gold transition-colors duration-300 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gold transition-colors duration-300 relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link to="/" className="font-serif text-3xl font-semibold italic text-cocoa tracking-tight">
            Choçkolate
          </Link>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative group" aria-label={`Cart, ${itemCount} items`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-cocoa group-hover:text-gold transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
            />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-cream">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </Link>

      </div>
    </nav>
  )
}
