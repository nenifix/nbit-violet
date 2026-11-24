import { useMemo, useState } from 'react';
import { Check, Cpu, RotateCcw } from 'lucide-react';
import { HARDWARE_PRODUCTS } from '../data/hardware';
import { HardwareProduct } from '../types/hardware';
import { HardwareImage } from './HardwareImage';

interface ConfiguratorScreenProps {
  onAddCustomBuild: (params: {
    product: HardwareProduct;
    variantLabel: string;
    finishName: string;
    unitPrice: number;
    customSummary: string;
  }) => void;
}

const CHASSIS_OPTIONS = [
  {
    id: 'prism',
    label: 'Prism Cube Desktop',
    note: 'Smoked glass thermal canopy · 218 mm footprint',
    basePrice: 3890,
    watts: 190,
    dba: 14.2,
    tempC: 46,
    productIndex: 0,
  },
  {
    id: 'blade',
    label: 'Compute Blade N4',
    note: 'Passive finned titanium · zero moving parts',
    basePrice: 2450,
    watts: 120,
    dba: 0.0,
    tempC: 51,
    productIndex: 1,
  },
];

const COMPUTE_OPTIONS = [
  { id: 'c24', label: '24-Core Neural SoC', price: 0, watts: 45 },
  { id: 'c32', label: '32-Core Tensor Matrix', price: 780, watts: 85 },
  { id: 'c64', label: '64-Core Dual-Die Cluster', price: 1640, watts: 145 },
];

const MEMORY_OPTIONS = [
  { id: 'm64', label: '64 GB ECC', price: 0, watts: 12 },
  { id: 'm192', label: '192 GB Unified', price: 850, watts: 24 },
  { id: 'm256', label: '256 GB High-Bandwidth', price: 1450, watts: 32 },
];

const STORAGE_OPTIONS = [
  { id: 's2', label: '2 TB PCIe Gen5', price: 0 },
  { id: 's4', label: '4 TB Dual RAID', price: 420 },
  { id: 's8', label: '8 TB Enterprise NVMe', price: 960 },
];

const ADDONS = [
  {
    id: 'sfp28',
    label: 'Dual 100GbE Optical SFP28 Transceivers',
    price: 340,
    watts: 14,
  },
  {
    id: 'calibration',
    label: 'Factory Burn-In & Acoustic Verification Certificate',
    price: 180,
    watts: 0,
  },
  {
    id: 'rail',
    label: 'Anodized Desk Isolation Plinth',
    price: 220,
    watts: 0,
  },
];

export function ConfiguratorScreen({
  onAddCustomBuild,
}: ConfiguratorScreenProps) {
  const [chassisId, setChassisId] = useState('prism');
  const [computeId, setComputeId] = useState('c32');
  const [memoryId, setMemoryId] = useState('m192');
  const [storageId, setStorageId] = useState('s4');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['sfp28']);
  const [added, setAdded] = useState(false);

  const chassis =
    CHASSIS_OPTIONS.find((c) => c.id === chassisId) ?? CHASSIS_OPTIONS[0];
  const compute =
    COMPUTE_OPTIONS.find((c) => c.id === computeId) ?? COMPUTE_OPTIONS[0];
  const memory =
    MEMORY_OPTIONS.find((m) => m.id === memoryId) ?? MEMORY_OPTIONS[0];
  const storage =
    STORAGE_OPTIONS.find((s) => s.id === storageId) ?? STORAGE_OPTIONS[0];

  const baseProduct = HARDWARE_PRODUCTS[chassis.productIndex];

  const metrics = useMemo(() => {
    const addonTotal = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
      (sum, a) => sum + a.price,
      0
    );
    const addonWatts = ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce(
      (sum, a) => sum + a.watts,
      0
    );
    const totalPrice =
      chassis.basePrice +
      compute.price +
      memory.price +
      storage.price +
      addonTotal;
    const totalWatts = chassis.watts + compute.watts + memory.watts + addonWatts;
    const headroomPct = Math.max(12, Math.round(((420 - totalWatts) / 420) * 100));
    const estimatedTemp = chassis.tempC + Math.round((totalWatts - 160) / 28);

    return {
      totalPrice,
      totalWatts,
      headroomPct,
      estimatedTemp,
      dba: chassis.dba,
    };
  }, [chassis, compute, memory, storage, selectedAddons]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetConfig = () => {
    setChassisId('prism');
    setComputeId('c32');
    setMemoryId('m192');
    setStorageId('s4');
    setSelectedAddons(['sfp28']);
  };

  const handleCommit = () => {
    const addonNames = ADDONS.filter((a) => selectedAddons.includes(a.id)).map(
      (a) => a.label
    );
    onAddCustomBuild({
      product: baseProduct,
      variantLabel: `${compute.label} · ${memory.label} · ${storage.label}`,
      finishName: 'Custom Architecture Build',
      unitPrice: metrics.totalPrice,
      customSummary:
        addonNames.length > 0
          ? `Includes ${addonNames.join(', ')}`
          : 'Standard factory configuration',
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 pb-24 pt-10 md:px-12">
      <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#a78bfa]">
            Architecture Configurator
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Provision Custom Compute Node
          </h1>
        </div>
        <button
          type="button"
          onClick={resetConfig}
          className="btn-glass-ghost inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold self-start md:self-auto cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Controls */}
        <div className="space-y-6 lg:col-span-7">
          {/* Step 1: Chassis Architecture */}
          <section className="glass-tier-1 rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              01. Chassis Enclosure
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CHASSIS_OPTIONS.map((opt) => {
                const active = opt.id === chassisId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setChassisId(opt.id)}
                    className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                      active
                        ? 'border-[#7c3aed] bg-[#7c3aed]/15 shadow-[0_0_24px_rgba(124,58,237,0.18)]'
                        : 'border-white/10 bg-black/25 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-white">
                        {opt.label}
                      </span>
                      <span className="font-mono-tabular text-xs text-[#d2bbff]">
                        ${opt.basePrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-[#958da1]">{opt.note}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Compute & Memory Segmented Controls */}
          <section className="glass-tier-1 space-y-6 rounded-2xl p-6">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">
                02. Compute & Memory Topology
              </h2>
              <p className="mt-1 text-xs text-[#958da1]">
                Select silicon tier, unified ECC memory pool, and optical NVMe
                storage.
              </p>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-[#ccc3d8]">
                Silicon Complex
              </div>
              <div className="sunken-trench grid grid-cols-1 gap-1.5 rounded-xl p-1.5 sm:grid-cols-3">
                {COMPUTE_OPTIONS.map((opt) => {
                  const active = opt.id === computeId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setComputeId(opt.id)}
                      className={`rounded-lg px-3 py-2.5 text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#282934] text-white border border-white/15'
                          : 'text-[#958da1] hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="font-mono-tabular mt-0.5 text-[11px] text-[#a78bfa]">
                        {opt.price === 0 ? 'Base' : `+$${opt.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-[#ccc3d8]">
                Unified Memory Pool
              </div>
              <div className="sunken-trench grid grid-cols-1 gap-1.5 rounded-xl p-1.5 sm:grid-cols-3">
                {MEMORY_OPTIONS.map((opt) => {
                  const active = opt.id === memoryId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setMemoryId(opt.id)}
                      className={`rounded-lg px-3 py-2.5 text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#282934] text-white border border-white/15'
                          : 'text-[#958da1] hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="font-mono-tabular mt-0.5 text-[11px] text-[#a78bfa]">
                        {opt.price === 0 ? 'Base' : `+$${opt.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-[#ccc3d8]">
                Optical NVMe Array
              </div>
              <div className="sunken-trench grid grid-cols-1 gap-1.5 rounded-xl p-1.5 sm:grid-cols-3">
                {STORAGE_OPTIONS.map((opt) => {
                  const active = opt.id === storageId;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStorageId(opt.id)}
                      className={`rounded-lg px-3 py-2.5 text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-[#282934] text-white border border-white/15'
                          : 'text-[#958da1] hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="text-xs font-semibold">{opt.label}</div>
                      <div className="font-mono-tabular mt-0.5 text-[11px] text-[#a78bfa]">
                        {opt.price === 0 ? 'Base' : `+$${opt.price}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Step 3: Optical Modules & Verification Checkboxes */}
          <section className="glass-tier-1 rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold text-white">
              03. Optical Transceivers & Calibration
            </h2>
            <div className="mt-4 space-y-2.5">
              {ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-all cursor-pointer ${
                      checked
                        ? 'border-[#7c3aed]/70 bg-[#7c3aed]/12'
                        : 'border-white/10 bg-black/25 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          checked
                            ? 'border-[#a78bfa] bg-[#7c3aed] text-white'
                            : 'border-white/15 bg-white/[0.05] text-transparent'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-white">
                        {addon.label}
                      </span>
                    </div>
                    <span className="font-mono-tabular text-xs font-semibold text-[#d2bbff] shrink-0">
                      +${addon.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sticky Summary & Telemetry Envelope */}
        <aside className="lg:sticky lg:top-24 lg:col-span-5">
          <div className="glass-tier-2 overflow-hidden rounded-2xl p-5 sm:p-6">
            <div className="overflow-hidden rounded-xl bg-black/35">
              <HardwareImage
                src={baseProduct.image}
                alt={baseProduct.imageAlt}
                aspectClassName="aspect-[16/9]"
              />
            </div>

            <div className="mt-5 flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#38bdf8]">
                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Live Build Envelope</span>
                </div>
                <h2 className="font-display mt-1 text-xl font-semibold text-white">
                  {chassis.label}
                </h2>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#958da1]">Estimated Total</div>
                <div className="font-display text-2xl font-bold text-white tabular-nums">
                  ${metrics.totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Telemetry Readout List */}
            <dl className="mt-4 divide-y divide-white/[0.05]">
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-xs text-[#958da1]">Continuous Load</dt>
                <dd className="font-mono-tabular font-semibold text-white">
                  {metrics.totalWatts} W
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-xs text-[#958da1]">Thermal Headroom</dt>
                <dd className="font-mono-tabular font-semibold text-[#38bdf8]">
                  {metrics.headroomPct}% ({metrics.estimatedTemp}°C nominal)
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-xs text-[#958da1]">Acoustic Floor</dt>
                <dd className="font-mono-tabular font-semibold text-white">
                  {metrics.dba.toFixed(1)} dBA
                </dd>
              </div>
              <div className="flex items-center justify-between py-2.5 text-sm">
                <dt className="text-xs text-[#958da1]">Selected Topology</dt>
                <dd className="text-right text-xs font-medium text-[#ccc3d8]">
                  {compute.label} · {memory.label}
                </dd>
              </div>
            </dl>

            {/* Thermal Capacity Meter */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-[#958da1]">
                <span>Power Envelope Utilization</span>
                <span className="font-mono-tabular text-white">
                  {metrics.totalWatts} / 420 W
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/45">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#38bdf8] transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((metrics.totalWatts / 420) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCommit}
              className="btn-electric mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold cursor-pointer"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Custom Build Added to Bag</span>
                </>
              ) : (
                <span>Add Custom Build — ${metrics.totalPrice.toLocaleString()}</span>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
