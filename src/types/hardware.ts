export type ScreenId = 'showcase' | 'catalog' | 'inspector' | 'configurator';

export type HardwareCategory = 'Workstations' | 'Acoustics' | 'Displays' | 'Peripherals';

export type ArchitectureTrait =
  | 'ARM64 Neural'
  | 'Passive Thermal'
  | 'Optical I/O'
  | 'CNC Obsidian';

export interface HardwareSpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface HardwareVariant {
  id: string;
  label: string;
  specNote: string;
  priceDelta: number;
}

export interface HardwareFinish {
  id: string;
  name: string;
  swatch: string;
}

export interface HardwareProduct {
  id: string;
  sku: string;
  name: string;
  category: HardwareCategory;
  kicker: string;
  summary: string;
  price: number;
  availability: string;
  leadTime: string;
  image: string;
  imageAlt: string;
  aspectRatio: '16:9' | '4:3';
  traits: ArchitectureTrait[];
  quickMetrics: { label: string; value: string }[];
  specs: HardwareSpecRow[];
  variants: HardwareVariant[];
  finishes: HardwareFinish[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  variantLabel: string;
  finishName: string;
  unitPrice: number;
  quantity: number;
  customSummary?: string;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingTier: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  placedAt: string;
}
