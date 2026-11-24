import { useMemo, useState } from 'react';
import { Check, Search, X } from 'lucide-react';
import { CATEGORIES, HARDWARE_PRODUCTS } from '../data/hardware';
import { ArchitectureTrait, HardwareProduct } from '../types/hardware';
import { HardwareCard } from './HardwareCard';

interface CatalogScreenProps {
  onInspectProduct: (productId: string) => void;
  onQuickAdd: (product: HardwareProduct) => void;
}

const TRAITS: ArchitectureTrait[] = [
  'ARM64 Neural',
  'Passive Thermal',
  'Optical I/O',
  'CNC Obsidian',
];

type SortMode = 'featured' | 'price-asc' | 'price-desc';

export function CatalogScreen({
  onInspectProduct,
  onQuickAdd,
}: CatalogScreenProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>('All Systems');
  const [selectedTraits, setSelectedTraits] = useState<ArchitectureTrait[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [compareIds, setCompareIds] = useState<string[]>([
    'prism-workstation',
    'compute-blade-n4',
  ]);

  const toggleTrait = (trait: ArchitectureTrait) => {
    setSelectedTraits((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    );
  };

  const toggleCompare = (productId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), productId];
      }
      return [...prev, productId];
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = HARDWARE_PRODUCTS.filter((item) => {
      const matchesCategory =
        category === 'All Systems' || item.category === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      const matchesTraits =
        selectedTraits.length === 0 ||
        selectedTraits.every((trait) => item.traits.includes(trait));
      return matchesCategory && matchesQuery && matchesTraits;
    });

    if (sortMode === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortMode === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [query, category, selectedTraits, sortMode]);

  const comparedProducts = useMemo(
    () => HARDWARE_PRODUCTS.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  const resetFilters = () => {
    setQuery('');
    setCategory('All Systems');
    setSelectedTraits([]);
    setSortMode('featured');
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-10 md:px-12">
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#a78bfa]">
            Hardware Catalog
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Architectural Compute & Studio Systems
          </h1>
        </div>
        <div className="text-sm text-[#958da1] tabular-nums">
          Showing <span className="font-semibold text-white">{filtered.length}</span> of{' '}
          {HARDWARE_PRODUCTS.length} systems
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-tier-1 mt-8 rounded-2xl p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-center">
          {/* Inset Glass Search Field */}
          <div className="relative lg:col-span-5">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#958da1]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by system name, SKU, or architecture..."
              aria-label="Search hardware catalog"
              className="inset-glass-input w-full rounded-lg py-2.5 pl-10 pr-9 text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#958da1] hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Segmented Category Filter */}
          <div className="sunken-trench flex flex-wrap items-center gap-1 rounded-xl p-1 lg:col-span-7">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#282934]/90 text-white border border-white/15'
                      : 'text-[#958da1] hover:text-white border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Squircle Checkboxes + Sort Segmented Switch */}
        <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs font-medium text-[#958da1]">
              Architecture:
            </span>
            {TRAITS.map((trait) => {
              const checked = selectedTraits.includes(trait);
              return (
                <button
                  key={trait}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggleTrait(trait)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#ccc3d8] hover:text-white cursor-pointer"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors ${
                      checked
                        ? 'border-[#a78bfa] bg-[#7c3aed] text-white'
                        : 'border-white/15 bg-white/[0.05] text-transparent'
                    }`}
                  >
                    <Check className="h-3 w-3 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <span className="whitespace-nowrap">{trait}</span>
                </button>
              );
            })}
          </div>

          <div className="sunken-trench inline-flex items-center gap-1 rounded-lg p-1 self-start sm:self-auto">
            {(
              [
                { id: 'featured', label: 'Featured' },
                { id: 'price-asc', label: 'Price: Low' },
                { id: 'price-desc', label: 'Price: High' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortMode(opt.id)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  sortMode === opt.id
                    ? 'bg-[#282934] text-white'
                    : 'text-[#958da1] hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <HardwareCard
              key={product.id}
              product={product}
              onInspect={onInspectProduct}
              onQuickAdd={onQuickAdd}
              isSelectedForCompare={compareIds.includes(product.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="glass-tier-1 mt-8 flex flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-white">
            No hardware systems match those filters
          </p>
          <p className="mt-2 max-w-md text-sm text-[#958da1]">
            Clear one or more architecture traits or search terms to view the
            full catalog.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="btn-electric mt-6 rounded-full px-5 py-2.5 text-xs font-semibold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Live Side-by-Side Comparison Matrix */}
      {comparedProducts.length > 0 && (
        <section
          aria-labelledby="compare-heading"
          className="glass-tier-1 mt-14 overflow-hidden rounded-2xl p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
            <div>
              <h2
                id="compare-heading"
                className="font-display text-lg font-semibold text-white"
              >
                Selected Architecture Comparison
              </h2>
              <p className="text-xs text-[#958da1]">
                Select up to 3 systems from the grid above to compare baseline
                specifications.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="text-xs font-medium text-[#958da1] hover:text-white cursor-pointer"
            >
              Clear Comparison
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-xs text-[#958da1]">
                  <th className="py-3 pr-4 font-medium">System</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Lead Metric</th>
                  <th className="py-3 px-4 font-medium">Lead Time</th>
                  <th className="py-3 pl-4 text-right font-medium">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {comparedProducts.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-3.5 pr-4">
                      <button
                        type="button"
                        onClick={() => onInspectProduct(item.id)}
                        className="font-display font-semibold text-white hover:text-[#d2bbff] cursor-pointer text-left"
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-[#ccc3d8]">{item.category}</td>
                    <td className="py-3.5 px-4 font-mono-tabular text-[#38bdf8]">
                      {item.quickMetrics[0].label}: {item.quickMetrics[0].value}
                    </td>
                    <td className="py-3.5 px-4 text-[#ccc3d8]">{item.leadTime}</td>
                    <td className="py-3.5 pl-4 text-right font-display font-semibold text-white tabular-nums">
                      ${item.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
