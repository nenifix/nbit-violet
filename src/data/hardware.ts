import heroPrismImg from '../assets/images/hero_workstation_prism_1795539552170.jpg';
import audioMonolithImg from '../assets/images/product_audio_monolith_1795539551253.jpg';
import spatialDisplayImg from '../assets/images/product_spatial_display_1795539552889.jpg';
import mechanicalDeckImg from '../assets/images/product_mechanical_deck_1795539553267.jpg';
import computeBladeImg from '../assets/images/product_compute_blade_1795539553126.jpg';
import acousticMonitorImg from '../assets/images/product_acoustic_monitor_1795539552460.jpg';
import { HardwareProduct } from '../types/hardware';

export const BENCHMARK_METRICS = [
  { label: 'Thermal Headroom', value: '340 W', detail: 'Vapor-chamber equilibrium' },
  { label: 'Optical Backplane', value: '120 Gbps', detail: 'Zero-jitter bidirectional' },
  { label: 'Acoustic Floor', value: '14.2 dBA', detail: 'Anechoic idle baseline' },
  { label: 'Chassis Tolerance', value: '0.02 mm', detail: '5-axis CNC obsidian alloy' },
];

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
  {
    id: 'prism-workstation',
    sku: 'VK-PRISM-01',
    name: 'Prism Cube Workstation',
    category: 'Workstations',
    kicker: 'Modular Compute',
    summary:
      'Desktop-scale neural workstation housed in bead-blasted obsidian aluminum with a smoked optical-glass thermal canopy.',
    price: 3890,
    availability: 'In Stock',
    leadTime: 'Ships in 48 hours',
    image: heroPrismImg,
    imageAlt: 'Prism Cube Workstation in anodized obsidian aluminum with smoked glass top panel',
    aspectRatio: '16:9',
    traits: ['ARM64 Neural', 'Optical I/O', 'CNC Obsidian'],
    quickMetrics: [
      { label: 'Unified Memory', value: '192 GB' },
      { label: 'Peak Bandwidth', value: '820 GB/s' },
    ],
    specs: [
      { label: 'Compute Architecture', value: '32-Core ARM64 + 64-Core Tensor Matrix', highlight: true },
      { label: 'Memory Bandwidth', value: '820 GB/s LPDDR5X ECC' },
      { label: 'Thermal Envelope', value: '340 W Dual Vapor-Chamber Loop' },
      { label: 'Acoustic Output', value: '14.2 dBA Idle / 26.8 dBA Load' },
      { label: 'Optical & I/O Bus', value: '4× Thunderbolt 5 · 2× 100GbE SFP28', highlight: true },
      { label: 'Chassis Milling', value: '6061-T6 Obsidian Anodized + Gorilla Glass' },
      { label: 'Dimensions', value: '218 × 218 × 224 mm · 6.4 kg' },
    ],
    variants: [
      { id: '96gb', label: '96 GB · 2 TB NVMe', specNote: 'Base Studio Node', priceDelta: 0 },
      { id: '192gb', label: '192 GB · 4 TB NVMe', specNote: 'Architecture Cluster', priceDelta: 850 },
      { id: '256gb', label: '256 GB · 8 TB RAID', specNote: 'Reference Flagship', priceDelta: 1650 },
    ],
    finishes: [
      { id: 'obsidian', name: 'Obsidian Anodized', swatch: '#171923' },
      { id: 'titanium', name: 'Titanium Slate', swatch: '#475569' },
      { id: 'graphite', name: 'Raw Graphite', swatch: '#27272a' },
    ],
  },
  {
    id: 'compute-blade-n4',
    sku: 'VK-BLADE-N4',
    name: 'Compute Blade N4',
    category: 'Workstations',
    kicker: 'Fanless Edge Node',
    summary:
      'Passively cooled compute node machined from solid finned titanium with dual optical fiber uplinks and transparent side inspection glass.',
    price: 2450,
    availability: 'In Stock',
    leadTime: 'Ships in 3 days',
    image: computeBladeImg,
    imageAlt: 'Compute Blade N4 finned titanium heatsink chassis with optical ports',
    aspectRatio: '4:3',
    traits: ['ARM64 Neural', 'Passive Thermal', 'Optical I/O'],
    quickMetrics: [
      { label: 'Noise Floor', value: '0.0 dBA' },
      { label: 'Optical Ports', value: '2× 100G' },
    ],
    specs: [
      { label: 'Processor Complex', value: '24-Core High-Efficiency Neural SoC', highlight: true },
      { label: 'Cooling Architecture', value: '100% Passive Finned Titanium Monoblock' },
      { label: 'Acoustic Output', value: '0.0 dBA Zero Moving Parts', highlight: true },
      { label: 'Storage Array', value: 'Dual M.2 PCIe Gen5 Hardware RAID' },
      { label: 'Network Fabric', value: 'Dual 100GbE QSFP28 + Out-of-Band Mgmt' },
      { label: 'Power Delivery', value: '180 W GaN Internal PSU (94% Efficiency)' },
      { label: 'Dimensions', value: '196 × 168 × 148 mm · 4.9 kg' },
    ],
    variants: [
      { id: '64gb', label: '64 GB · 2 TB', specNote: 'Single Edge Node', priceDelta: 0 },
      { id: '128gb', label: '128 GB · 4 TB', specNote: 'Dual-Fabric Ready', priceDelta: 620 },
    ],
    finishes: [
      { id: 'titanium', name: 'Brushed Titanium', swatch: '#64748b' },
      { id: 'obsidian', name: 'Obsidian Anodized', swatch: '#171923' },
    ],
  },
  {
    id: 'spatial-display-32',
    sku: 'VK-DISP-32R',
    name: 'Spatial Reference 32',
    category: 'Displays',
    kicker: '6K Optical Panel',
    summary:
      'Frameless 32-inch micro-etched reference display engineered for color grading, CAD assemblies, and architectural visualization.',
    price: 2980,
    availability: 'In Stock',
    leadTime: 'Ships in 4 days',
    image: spatialDisplayImg,
    imageAlt: 'Spatial Reference 32 frameless anodized monitor on machined cantilever stand',
    aspectRatio: '4:3',
    traits: ['Optical I/O', 'CNC Obsidian'],
    quickMetrics: [
      { label: 'Resolution', value: '6016 × 3384' },
      { label: 'Peak Luminance', value: '1,600 nits' },
    ],
    specs: [
      { label: 'Panel Matrix', value: '32" Dual-Layer Tandem OLED · 120 Hz', highlight: true },
      { label: 'Native Resolution', value: '6016 × 3384 (218 PPI)' },
      { label: 'Color Precision', value: '99.8% DCI-P3 · Delta-E < 0.4 Factory Calibrated' },
      { label: 'Luminance Range', value: '0.0005 to 1,600 nits Peak HDR', highlight: true },
      { label: 'Surface Treatment', value: 'Sub-wavelength Nano-Etched Anti-Reflective Glass' },
      { label: 'Host Connectivity', value: 'Thunderbolt 5 (140 W PD) · DisplayPort 2.1' },
      { label: 'Stand Articulation', value: 'Counterbalanced CNC Aluminum Cantilever' },
    ],
    variants: [
      { id: 'standard', label: 'Standard Gloss Glass', specNote: '99.8% DCI-P3', priceDelta: 0 },
      { id: 'nano', label: 'Nano-Etched Matte', specNote: 'Zero-Glare Studio', priceDelta: 340 },
    ],
    finishes: [
      { id: 'obsidian', name: 'Obsidian Anodized', swatch: '#171923' },
      { id: 'graphite', name: 'Space Graphite', swatch: '#334155' },
    ],
  },
  {
    id: 'monolith-dac-01',
    sku: 'VK-DAC-01',
    name: 'Monolith DAC-01',
    category: 'Acoustics',
    kicker: 'Reference Conversion',
    summary:
      'Balanced dual-mono digital-to-analog converter and Class-A headphone stage milled from a single block of matte black aluminum.',
    price: 1180,
    availability: 'In Stock',
    leadTime: 'Ships in 24 hours',
    image: audioMonolithImg,
    imageAlt: 'Monolith DAC-01 desktop amplifier with precision knurled dial and violet halo',
    aspectRatio: '4:3',
    traits: ['Passive Thermal', 'CNC Obsidian'],
    quickMetrics: [
      { label: 'Dynamic Range', value: '134 dB' },
      { label: 'THD+N Ratio', value: '0.00008%' },
    ],
    specs: [
      { label: 'Conversion Stage', value: 'Dual-Mono Discrete R-2R Ladder Architecture', highlight: true },
      { label: 'Sample Rate Support', value: 'PCM up to 768 kHz · Native DSD512' },
      { label: 'Dynamic Range', value: '134 dB A-Weighted Balanced Out' },
      { label: 'Output Power', value: '6.4 W @ 32 Ohms Class-A Discrete', highlight: true },
      { label: 'Attenuator Control', value: 'Optical 256-Step Relay Volume Encoder' },
      { label: 'Digital Inputs', value: 'USB-C Isolated · AES/EBU · Optical Toslink' },
      { label: 'Dimensions', value: '185 × 172 × 54 mm · 2.1 kg' },
    ],
    variants: [
      { id: 'desktop', label: 'Single-Ended + 4.4mm', specNote: 'Studio Desk Edition', priceDelta: 0 },
      { id: 'balanced', label: 'Dual XLR Pro Stage', specNote: 'Mastering Output', priceDelta: 260 },
    ],
    finishes: [
      { id: 'obsidian', name: 'Matte Obsidian', swatch: '#11131d' },
      { id: 'titanium', name: 'Anodized Slate', swatch: '#475569' },
    ],
  },
  {
    id: 'tactile-deck-75',
    sku: 'VK-DECK-75',
    name: 'Tactile Deck 75',
    category: 'Peripherals',
    kicker: 'Hall-Effect Input',
    summary:
      'Low-profile 75% architectural keyboard combining CNC slate housing, polycarbonate smoked keycaps, and adjustable magnetic actuation.',
    price: 420,
    availability: 'In Stock',
    leadTime: 'Ships in 24 hours',
    image: mechanicalDeckImg,
    imageAlt: 'Tactile Deck 75 CNC mechanical keyboard with smoked translucent keycaps',
    aspectRatio: '4:3',
    traits: ['Optical I/O', 'CNC Obsidian'],
    quickMetrics: [
      { label: 'Polling Rate', value: '8,000 Hz' },
      { label: 'Actuation Range', value: '0.2–3.8 mm' },
    ],
    specs: [
      { label: 'Switch Mechanism', value: 'Linear Hall-Effect Magnetic Sensor Matrix', highlight: true },
      { label: 'Actuation Tuning', value: 'Per-Key 0.1 mm Incremental Adjustment' },
      { label: 'Scan Latency', value: '0.125 ms @ 8,000 Hz Native USB-C', highlight: true },
      { label: 'Keycap Material', value: 'Double-Shot Smoked Polycarbonate' },
      { label: 'Internal Damping', value: 'Silicone Gasket + Brass Acoustic Weight' },
      { label: 'Connectivity', value: 'Braided LEMO Detachable USB-C + Tri-Mode BLE' },
      { label: 'Dimensions', value: '316 × 132 × 21 mm · 1.45 kg' },
    ],
    variants: [
      { id: 'ansi', label: 'ANSI US Layout', specNote: 'Smoked Polycarbonate', priceDelta: 0 },
      { id: 'iso', label: 'ISO UK/EU Layout', specNote: 'Smoked Polycarbonate', priceDelta: 20 },
    ],
    finishes: [
      { id: 'slate', name: 'Anodized Slate', swatch: '#334155' },
      { id: 'obsidian', name: 'Deep Obsidian', swatch: '#0f172a' },
    ],
  },
  {
    id: 'nearfield-s2',
    sku: 'VK-AUDIO-S2',
    name: 'Nearfield Monitor S2',
    category: 'Acoustics',
    kicker: 'Waveguide Reference',
    summary:
      'Active phase-coherent studio monitors featuring carbon-weave transducers, optical waveguide rings, and onboard DSP room calibration.',
    price: 1640,
    availability: 'Built to Order',
    leadTime: 'Ships in 7 days',
    image: acousticMonitorImg,
    imageAlt: 'Nearfield Monitor S2 anodized aluminum studio speaker with woven driver',
    aspectRatio: '4:3',
    traits: ['Passive Thermal', 'Optical I/O', 'CNC Obsidian'],
    quickMetrics: [
      { label: 'Frequency', value: '34 Hz–32 kHz' },
      { label: 'SPL Peak', value: '112 dB' },
    ],
    specs: [
      { label: 'Frequency Response', value: '34 Hz – 32 kHz (±1.2 dB)', highlight: true },
      { label: 'Transducer Array', value: '6.5" Carbon-Weave Woofer · 1.1" Beryllium Tweeter' },
      { label: 'Amplification', value: 'Bi-Amped 280 W Class-D + Linear PSU' },
      { label: 'Room Calibration', value: '24-Bit / 192 kHz FIR Phase Correction', highlight: true },
      { label: 'Enclosure', value: 'Die-Cast Damped Aluminum + Glass Waveguide' },
      { label: 'Inputs', value: 'AES/EBU · Balanced XLR · Optical S/PDIF' },
      { label: 'Dimensions (Each)', value: '310 × 204 × 242 mm · 7.8 kg' },
    ],
    variants: [
      { id: 'pair', label: 'Matched Stereo Pair', specNote: 'Factory Phase-Matched', priceDelta: 0 },
      { id: 'pair-stands', label: 'Pair + Isolation Bases', specNote: 'Sorbothane Decoupled', priceDelta: 290 },
    ],
    finishes: [
      { id: 'obsidian', name: 'Obsidian Matte', swatch: '#11131d' },
      { id: 'graphite', name: 'Graphite Bead-Blast', swatch: '#3f3f46' },
    ],
  },
];

export const CATEGORIES: ('All Systems' | HardwareProduct['category'])[] = [
  'All Systems',
  'Workstations',
  'Acoustics',
  'Displays',
  'Peripherals',
];
