import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';
import { HARDWARE_PRODUCTS } from '../data/hardware';
import { HardwareProduct } from '../types/hardware';
import { HardwareImage } from './HardwareImage';

interface InspectorScreenProps {
  selectedProductId: string;
  onSelectProduct: (productId: string) => void;
  onBackToCatalog: () => void;
  onAddConfiguredItem: (params: {
    product: HardwareProduct;
    variantLabel: string;
    finishName: string;
    unitPrice: number;
  }) => void;
}

export function InspectorScreen({
  selectedProductId,
  onSelectProduct,
  onBackToCatalog,
  onAddConfiguredItem,
}: InspectorScreenProps) {
  const product =
    HARDWARE_PRODUCTS.find((p) => p.id === selectedProductId) ??
    HARDWARE_PRODUCTS[0];

  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [finishId, setFinishId] = useState(product.finishes[0].id);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setVariantId(product.variants[0].id);
    setFinishId(product.finishes[0].id);
    setAddedFeedback(false);
  }, [product]);

  const activeVariant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const activeFinish =
    product.finishes.find((f) => f.id === finishId) ?? product.finishes[0];
  const totalPrice = product.price + activeVariant.priceDelta;

  const handleAdd = () => {
    onAddConfiguredItem({
      product,
      variantLabel: activeVariant.label,
      finishName: activeFinish.name,
      unitPrice: totalPrice,
    });
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1400);
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-8 md:px-12">
      {/* Top Breadcrumb + Quick System Switcher */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-center">
        <button
          type="button"
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#958da1] hover:text-white transition-colors self-start cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Hardware Catalog</span>
        </button>

        <div className="sunken-trench flex items-center gap-1 overflow-x-auto rounded-xl p-1 max-w-full">
          {HARDWARE_PRODUCTS.map((item) => {
            const active = item.id === product.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectProduct(item.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#282934] text-white border border-white/15'
                    : 'text-[#958da1] hover:text-white border border-transparent'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contiguous Purchase Module (Sticky Hardware Stage Left + Purchase Module Right) */}
      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Sticky Viewport */}
        <div className="lg:sticky lg:top-24 lg:col-span-7">
          <div className="glass-tier-2 overflow-hidden rounded-2xl p-4 sm:p-5">
            <div className="overflow-hidden rounded-xl bg-black/40">
              <HardwareImage
                src={product.image}
                alt={product.imageAlt}
                aspectClassName="aspect-[4/3]"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-4 sm:grid-cols-3">
              <div>
                <div className="text-[11px] text-[#958da1]">SKU Identifier</div>
                <div className="font-mono-tabular mt-0.5 text-xs font-medium text-white">
                  {product.sku}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-[#958da1]">Selected Finish</div>
                <div className="mt-0.5 text-xs font-medium text-[#d2bbff]">
                  {activeFinish.name}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-[11px] text-[#958da1]">Dispatch Window</div>
                <div className="mt-0.5 text-xs font-medium text-[#38bdf8]">
                  {product.leadTime}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="lg:col-span-5">
          <div className="glass-tier-1 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-[#958da1]">
              <span className="font-semibold text-[#a78bfa]">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.kicker}</span>
              <span aria-hidden="true">·</span>
              <span>{product.availability}</span>
            </div>

            <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-white">
              {product.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#ccc3d8]">
              {product.summary}
            </p>

            <div className="mt-6 flex items-baseline justify-between border-y border-white/[0.08] py-4">
              <span className="text-xs font-medium text-[#958da1]">
                Configured Unit Price
              </span>
              <span className="font-display text-3xl font-bold text-white tabular-nums">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Finish Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#ccc3d8]">Chassis Finish</span>
                <span className="text-[#958da1]">{activeFinish.name}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {product.finishes.map((finish) => {
                  const selected = finish.id === activeFinish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setFinishId(finish.id)}
                      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                        selected
                          ? 'border-[#a78bfa] bg-[#7c3aed]/15 text-white'
                          : 'border-white/10 bg-white/[0.03] text-[#ccc3d8] hover:border-white/25'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-white/25"
                        style={{ backgroundColor: finish.swatch }}
                        aria-hidden="true"
                      />
                      <span className="whitespace-nowrap">{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variant / Capacity Selection */}
            <div className="mt-6">
              <div className="text-xs font-medium text-[#ccc3d8]">
                Architecture Tier
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                {product.variants.map((variant) => {
                  const selected = variant.id === activeVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setVariantId(variant.id)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${
                        selected
                          ? 'border-[#7c3aed] bg-[#7c3aed]/15 shadow-[0_0_20px_rgba(124,58,237,0.18)]'
                          : 'border-white/10 bg-black/25 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {variant.label}
                        </div>
                        <div className="text-xs text-[#958da1]">
                          {variant.specNote}
                        </div>
                      </div>
                      <div className="font-mono-tabular text-xs font-semibold text-[#d2bbff]">
                        {variant.priceDelta === 0
                          ? 'Included'
                          : `+$${variant.priceDelta.toLocaleString()}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="btn-electric mt-7 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span>Add to Bag — ${totalPrice.toLocaleString()}</span>
              )}
            </button>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4 text-xs text-[#958da1]">
              <div className="flex items-center gap-2">
                <Truck className="h-3.5 w-3.5 text-[#a78bfa]" aria-hidden="true" />
                <span>Insured Express Freight</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="h-3.5 w-3.5 text-[#38bdf8]"
                  aria-hidden="true"
                />
                <span>3-Year Hardware Coverage</span>
              </div>
            </div>
          </div>

          {/* Telemetry / Spec Readout List */}
          <section
            aria-labelledby="telemetry-specs-heading"
            className="glass-tier-1 mt-6 overflow-hidden rounded-2xl p-6"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
              <h2
                id="telemetry-specs-heading"
                className="font-display text-base font-semibold text-white"
              >
                Technical Specification Sheet
              </h2>
              <span className="font-mono-tabular text-xs text-[#958da1]">
                {product.specs.length} Parameters
              </span>
            </div>

            <dl className="mt-2 divide-y divide-white/[0.05]">
              {product.specs.map((row, idx) => (
                <div
                  key={row.label}
                  className={`flex flex-col justify-between gap-1 px-3 py-3 sm:flex-row sm:items-center sm:gap-4 ${
                    idx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                  }`}
                >
                  <dt className="text-xs font-medium text-[#958da1]">
                    {row.label}
                  </dt>
                  <dd
                    className={`font-display text-sm font-medium tabular-nums sm:text-right ${
                      row.highlight ? 'text-[#38bdf8]' : 'text-white'
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
