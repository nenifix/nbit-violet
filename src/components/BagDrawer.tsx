import { FormEvent, useState } from 'react';
import { CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItem, OrderReceipt } from '../types/hardware';
import { HardwareImage } from './HardwareImage';

interface BagDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearBag: () => void;
}

export function BagDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: BagDrawerProps) {
  const [shippingTier, setShippingTier] = useState<'express' | 'priority'>('express');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  if (!open) {
    return null;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const shippingFee =
    items.length === 0 ? 0 : shippingTier === 'priority' ? 95 : 0;
  const total = subtotal + shippingFee;

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !shippingAddress.trim()) {
      setFormError('Please enter your name, email, and delivery address.');
      return;
    }
    setFormError('');
    const orderNumber = `VK-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      orderNumber,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      shippingAddress: shippingAddress.trim(),
      shippingTier:
        shippingTier === 'priority'
          ? 'Priority Air Freight (24h)'
          : 'Insured Ground Express (Complimentary)',
      items: [...items],
      subtotal,
      shippingFee,
      total,
      placedAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    onClearBag();
  };

  const resetAndClose = () => {
    setReceipt(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Hardware Bag and Checkout"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close bag backdrop"
        onClick={resetAndClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm cursor-pointer"
      />

      {/* Tier 3 Floating Drawer */}
      <div className="glass-tier-3 relative z-10 flex h-full w-full max-w-md flex-col">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">
              {receipt ? 'Order Confirmed' : 'Hardware Bag'}
            </h2>
            <p className="text-xs text-[#958da1]">
              {receipt
                ? `Reference ${receipt.orderNumber}`
                : `${items.reduce((s, i) => s + i.quantity, 0)} unit(s) staged`}
            </p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close hardware bag"
            className="btn-glass-ghost flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {receipt ? (
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 p-5">
                <div className="flex items-center gap-2.5 text-[#38bdf8]">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span className="font-display text-base font-semibold text-white">
                    Order #{receipt.orderNumber} Confirmed
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#ccc3d8]">
                  Prepared for {receipt.customerName} ({receipt.customerEmail}).
                  Dispatch notice sent at {receipt.placedAt}.
                </p>
              </div>

              <div className="glass-tier-1 rounded-xl p-4 text-xs space-y-2">
                <div className="text-[#958da1]">Destination</div>
                <div className="font-medium text-white">
                  {receipt.shippingAddress}
                </div>
                <div className="pt-1 text-[#958da1]">Logistics Tier</div>
                <div className="font-medium text-[#d2bbff]">
                  {receipt.shippingTier}
                </div>
              </div>

              <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.08] bg-black/25 px-4">
                {receipt.items.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-3 py-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">
                        {item.name} × {item.quantity}
                      </div>
                      <div className="text-[#958da1]">{item.variantLabel}</div>
                    </div>
                    <div className="font-mono-tabular font-semibold text-white">
                      ${(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="text-sm text-[#958da1]">Total Paid</span>
                <span className="font-display text-xl font-bold text-white tabular-nums">
                  ${receipt.total.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="btn-electric w-full rounded-full py-3 text-sm font-semibold cursor-pointer"
              >
                Return to Showcase
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-base font-semibold text-white">
                Your hardware bag is empty
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-[#958da1]">
                Select any workstation, acoustic DAC, display, or custom node to
                stage your order.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Itemized List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-3.5 rounded-xl border border-white/[0.08] bg-black/30 p-3"
                  >
                    <div className="w-20 shrink-0 overflow-hidden rounded-lg">
                      <HardwareImage
                        src={item.image}
                        alt={item.name}
                        aspectClassName="aspect-square"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm font-semibold text-white truncate">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.key)}
                            aria-label={`Remove ${item.name}`}
                            className="text-[#958da1] hover:text-[#ffb4ab] transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-[11px] text-[#958da1] truncate">
                          {item.variantLabel} · {item.finishName}
                        </p>
                        {item.customSummary && (
                          <p className="mt-0.5 text-[11px] text-[#a78bfa] line-clamp-1">
                            {item.customSummary}
                          </p>
                        )}
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="sunken-trench inline-flex items-center rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-6 w-6 items-center justify-center rounded text-[#ccc3d8] hover:text-white cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono-tabular px-2 text-xs font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Increase quantity"
                            className="flex h-6 w-6 items-center justify-center rounded text-[#ccc3d8] hover:text-white cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="font-display text-sm font-semibold text-white tabular-nums">
                          ${(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Method Segmented Toggle */}
              <div>
                <div className="mb-2 text-xs font-medium text-[#ccc3d8]">
                  Logistics Tier
                </div>
                <div className="sunken-trench grid grid-cols-2 gap-1 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setShippingTier('express')}
                    className={`rounded-lg px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                      shippingTier === 'express'
                        ? 'bg-[#282934] text-white border border-white/15'
                        : 'text-[#958da1] hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="font-semibold">Insured Express</div>
                    <div className="text-[11px] text-[#38bdf8]">Complimentary</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingTier('priority')}
                    className={`rounded-lg px-3 py-2 text-left text-xs transition-all cursor-pointer ${
                      shippingTier === 'priority'
                        ? 'bg-[#282934] text-white border border-white/15'
                        : 'text-[#958da1] hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="font-semibold">Priority Air</div>
                    <div className="font-mono-tabular text-[11px] text-[#d2bbff]">
                      +$95 (24h)
                    </div>
                  </button>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 border-t border-white/[0.08] pt-5">
                <div className="text-xs font-semibold text-white">
                  Dispatch Details
                </div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name or Organization"
                  className="inset-glass-input w-full rounded-lg px-3.5 py-2.5 text-xs"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Work Email Address"
                  className="inset-glass-input w-full rounded-lg px-3.5 py-2.5 text-xs"
                />
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street Address, City, Postal Code"
                  className="inset-glass-input w-full rounded-lg px-3.5 py-2.5 text-xs"
                />
                {formError && (
                  <p className="text-xs text-[#ffb4ab]" role="alert">
                    {formError}
                  </p>
                )}

                <div className="space-y-1.5 border-t border-white/[0.08] pt-4 text-xs">
                  <div className="flex justify-between text-[#958da1]">
                    <span>Subtotal</span>
                    <span className="font-mono-tabular text-white">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#958da1]">
                    <span>Freight</span>
                    <span className="font-mono-tabular text-white">
                      {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 text-sm font-semibold text-white">
                    <span>Total</span>
                    <span className="font-display text-lg tabular-nums">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-electric mt-2 w-full rounded-full py-3 text-sm font-semibold cursor-pointer"
                >
                  Confirm Hardware Order
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
