import type { JSX } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage(): JSX.Element {
  return (
    <main>
      {/* Hero */}
      <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center bg-cocoa overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/80 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa/80 via-transparent to-cocoa/80 z-0" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
          <span className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold mb-6 flex items-center gap-4">
            <span className="block w-12 h-px bg-gold/50" />
            L&rsquo;Art du Chocolat
            <span className="block w-12 h-px bg-gold/50" />
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl text-cream font-medium leading-tight mb-6">
            Crafted for the{' '}
            <em className="text-gold font-light not-italic">Connoisseur</em>
          </h1>

          <p className="text-cream/80 text-lg md:text-xl font-light mb-10 max-w-lg mx-auto leading-relaxed">
            Single-origin chocolates, handcrafted in small batches to preserve the exact essence of
            the world&rsquo;s finest cacao.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold text-cocoa rounded-full font-medium tracking-wide uppercase text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(200,151,58,0.2)] hover:shadow-[0_0_60px_rgba(200,151,58,0.4)]"
          >
            Shop Now
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-cream text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream to-transparent" />
        </div>
      </header>
    </main>
  )
}
