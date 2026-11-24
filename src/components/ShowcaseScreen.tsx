import { useMemo, useState } from 'react';
import { ArrowRight, Layers, Sliders } from 'lucide-react';
import {
  BENCHMARK_METRICS,
  CATEGORIES,
  HARDWARE_PRODUCTS,
} from '../data/hardware';
import { HardwareProduct, ScreenId } from '../types/hardware';
import { HardwareCard } from './HardwareCard';
import { HardwareImage } from './HardwareImage';

interface ShowcaseScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onInspectProduct: (productId: string) => void;
  onQuickAdd: (product: HardwareProduct) => void;
}

export function ShowcaseScreen({
  onNavigate,
  onInspectProduct,
  onQuickAdd,
}: ShowcaseScreenProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>('All Systems');

  const flagship = HARDWARE_PRODUCTS[0];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All Systems') {
      return HARDWARE_PRODUCTS;
    }
    return HARDWARE_PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-8 md:px-12 md:pt-12">
      {/* Hero Feature Module: Balanced 2-Column Split */}
      <section aria-labelledby="hero-heading" className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 right-0 h-80 w-80 rounded-full bg-[#7c3aed]/20 blur-[110px]"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Narrative Column */}
          <div className="glass-tier-1 flex flex-col justify-between rounded-2xl p-6 sm:p-10 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#a78bfa]">
                2026 Reference Architecture · Obsidian Series
              </p>

              <h1
                id="hero-heading"
                className="font-display mt-4 text-[clamp(2.25rem,3.6vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white [text-wrap:balance]"
              >
                Compute hardware sculpted in smoked glass.
              </h1>

              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-[#ccc3d8]">
                Modular neural workstations, zero-noise titanium compute nodes,
                and reference optical displays engineered for systems architects
                and mastering studios.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Hardware</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('configurator')}
                  className="btn-glass-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Sliders className="h-4 w-4 text-[#a78bfa]" aria-hidden="true" />
                  <span>Configure Node</span>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-5 text-xs text-[#958da1]">
                <span>Prism Cube Workstation · 192 GB Unified</span>
                <button
                  type="button"
                  onClick={() => onInspectProduct(flagship.id)}
                  className="font-semibold text-[#38bdf8] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Inspect Specs →
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Hardware Stage */}
          <div className="glass-tier-2 relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 sm:p-5 lg:col-span-7">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl bg-black/40">
              <HardwareImage
                src={flagship.image}
                alt={flagship.imageAlt}
                aspectClassName="h-full w-full aspect-[16/9] lg:aspect-auto"
                className="lg:h-full"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-[#0b0d17]/95 via-[#0b0d17]/60 to-transparent p-5 sm:p-6">
                <div>
                  <div className="text-xs font-medium text-[#a78bfa]">
                    {flagship.kicker} · {flagship.sku}
                  </div>
                  <div className="font-display mt-1 text-xl font-semibold text-white">
                    {flagship.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#958da1]">Starting at</div>
                  <div className="font-display text-xl font-semibold text-white tabular-nums">
                    ${flagship.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Benchmark Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {BENCHMARK_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="glass-tier-1 rounded-2xl px-5 py-4"
            >
              <div className="text-xs font-medium text-[#958da1]">
                {metric.label}
              </div>
              <div className="font-display mt-1.5 text-2xl font-semibold tracking-tight text-white tabular-nums">
                {metric.value}
              </div>
              <div className="mt-1 text-xs text-[#ccc3d8]/75">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hardware Gallery */}
      <section aria-labelledby="gallery-heading" className="mt-20 md:mt-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#a78bfa]">
              Hardware Lineup
            </p>
            <h2
              id="gallery-heading"
              className="font-display mt-2 text-3xl font-semibold tracking-tight text-white [text-wrap:balance]"
            >
              Precision systems across compute, acoustics, and optics.
            </h2>
          </div>

          {/* Segmented Category Filter inside Sunken Glass Trench */}
          <div
            role="tablist"
            aria-label="Filter hardware by category"
            className="sunken-trench inline-flex flex-wrap items-center gap-1 rounded-xl p-1 self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                    active
                      ? 'bg-[#282934]/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15'
                      : 'text-[#958da1] hover:text-white border border-transparent'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <HardwareCard
              key={product.id}
              product={product}
              onInspect={onInspectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* Optical Architecture & Custom Build Callout */}
      <section className="mt-20 md:mt-24">
        <div className="glass-tier-1 grid grid-cols-1 items-center gap-8 rounded-2xl p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#38bdf8]">
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>Custom Architecture Provisioning</span>
            </div>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
              Tailor memory topology, optical uplinks, and acoustic cooling to your workload.
            </h2>
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#ccc3d8] sm:text-base">
              Model exact thermal headroom, continuous power draw, and decibel
              floor before ordering your workstation or rack cluster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <button
              type="button"
              onClick={() => onNavigate('inspector')}
              className="btn-glass-ghost rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              Compare Spec Sheets
            </button>
            <button
              type="button"
              onClick={() => onNavigate('configurator')}
              className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Launch Configurator</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
