import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { HardwareProduct } from '../types/hardware';
import { HardwareImage } from './HardwareImage';

interface HardwareCardProps {
  product: HardwareProduct;
  onInspect: (productId: string) => void;
  onQuickAdd: (product: HardwareProduct) => void;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (productId: string) => void;
}

export function HardwareCard({
  product,
  onInspect,
  onQuickAdd,
  isSelectedForCompare,
  onToggleCompare,
}: HardwareCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onQuickAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  return (
    <article className="glass-tier-2 group flex flex-col rounded-2xl p-4 sm:p-5">
      {/* Integrated Upper Hardware Stage */}
      <button
        type="button"
        onClick={() => onInspect(product.id)}
        className="relative block w-full overflow-hidden rounded-xl bg-black/35 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]"
      >
        <HardwareImage
          src={product.image}
          alt={product.imageAlt}
          aspectClassName="aspect-[4/3]"
          className="group-hover:[&_img]:scale-[1.03]"
        />
      </button>

      {/* Card Body */}
      <div className="mt-4 flex flex-1 flex-col">
        {/* Clean Unboxed Metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#958da1]">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-[#a78bfa]">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{product.sku}</span>
          </div>
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(product.id)}
              className={`text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isSelectedForCompare
                  ? 'text-[#38bdf8]'
                  : 'text-[#958da1] hover:text-white'
              }`}
            >
              {isSelectedForCompare ? 'Comparing' : 'Compare'}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onInspect(product.id)}
          className="mt-2 flex items-start justify-between gap-2 text-left cursor-pointer group/title"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover/title:text-[#d2bbff] transition-colors">
            {product.name}
          </h3>
          <ArrowUpRight
            className="mt-1 h-4 w-4 shrink-0 text-[#958da1] transition-transform duration-150 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 group-hover/title:text-[#d2bbff]"
            aria-hidden="true"
          />
        </button>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#ccc3d8]/85">
          {product.summary}
        </p>

        {/* Bottom Spec Matrix */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/[0.06] py-3">
          {product.quickMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0">
              <div className="text-[11px] font-medium text-[#958da1]">
                {metric.label}
              </div>
              <div className="font-display text-sm font-semibold text-white tabular-nums truncate">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Price & Direct Cart Action */}
        <div className="mt-4 flex items-center justify-between gap-3 pt-0.5">
          <div>
            <div className="font-display text-lg font-semibold text-white tabular-nums">
              ${product.price.toLocaleString()}
            </div>
            <div className="text-xs text-[#958da1]">{product.availability}</div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onInspect(product.id)}
              className="btn-glass-ghost rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Specs
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-electric inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              {justAdded ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
