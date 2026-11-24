import { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { ScreenId } from '../types/hardware';

interface TopNavProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  bagCount: number;
  onOpenBag: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'showcase', label: 'Showcase' },
  { id: 'catalog', label: 'Hardware' },
  { id: 'inspector', label: 'Spec Sheet' },
  { id: 'configurator', label: 'Configurator' },
];

export function TopNav({
  activeScreen,
  onNavigate,
  bagCount,
  onOpenBag,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0b0d17]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-8 px-5 md:px-12">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('showcase')}
          className="font-display text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded-md px-1 -ml-1 cursor-pointer"
        >
          Vektor
        </button>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed] rounded-sm ${
                  isActive
                    ? 'text-white'
                    : 'text-[#958da1] hover:text-[#e1e1f0]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action (Bag) + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            className="btn-electric inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span>Bag</span>
            <span className="font-mono-tabular text-xs text-white/90">
              ({bagCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="btn-glass-ghost inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/[0.08] bg-[#0e111d]/95 px-5 py-3 backdrop-blur-2xl md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#7c3aed]/20 text-white border border-[#a78bfa]/30'
                      : 'text-[#ccc3d8] hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-medium text-[#a78bfa]">Active</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
