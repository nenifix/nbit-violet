import { useEffect, useState } from 'react';
import { BagDrawer } from './components/BagDrawer';
import { CatalogScreen } from './components/CatalogScreen';
import { ConfiguratorScreen } from './components/ConfiguratorScreen';
import { InspectorScreen } from './components/InspectorScreen';
import { ShowcaseScreen } from './components/ShowcaseScreen';
import { TopNav } from './components/TopNav';
import { HARDWARE_PRODUCTS } from './data/hardware';
import { CartItem, HardwareProduct, ScreenId } from './types/hardware';

const STORAGE_KEY = 'vektor_hardware_bag_v1';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('showcase');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    HARDWARE_PRODUCTS[0].id
  );
  const [bagOpen, setBagOpen] = useState(false);
  const [bagItems, setBagItems] = useState<CartItem[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bagItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [bagItems]);

  const navigateTo = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectProduct = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo('inspector');
  };

  const addToBag = (params: {
    product: HardwareProduct;
    variantLabel: string;
    finishName: string;
    unitPrice: number;
    customSummary?: string;
  }) => {
    const key = `${params.product.id}::${params.variantLabel}::${params.finishName}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: params.product.id,
          name: params.product.name,
          sku: params.product.sku,
          image: params.product.image,
          variantLabel: params.variantLabel,
          finishName: params.finishName,
          unitPrice: params.unitPrice,
          quantity: 1,
          customSummary: params.customSummary,
        },
      ];
    });
  };

  const handleQuickAdd = (product: HardwareProduct) => {
    addToBag({
      product,
      variantLabel: product.variants[0].label,
      finishName: product.finishes[0].name,
      unitPrice: product.price,
    });
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setBagItems((prev) => prev.filter((item) => item.key !== key));
  };

  const bagCount = bagItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="kinetic-canvas flex min-h-screen flex-col text-[#e1e1f0]">
      <TopNav
        activeScreen={activeScreen}
        onNavigate={navigateTo}
        bagCount={bagCount}
        onOpenBag={() => setBagOpen(true)}
      />

      <main className="flex-1">
        {activeScreen === 'showcase' && (
          <ShowcaseScreen
            onNavigate={navigateTo}
            onInspectProduct={handleInspectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeScreen === 'catalog' && (
          <CatalogScreen
            onInspectProduct={handleInspectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeScreen === 'inspector' && (
          <InspectorScreen
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
            onBackToCatalog={() => navigateTo('catalog')}
            onAddConfiguredItem={addToBag}
          />
        )}

        {activeScreen === 'configurator' && (
          <ConfiguratorScreen
            onAddCustomBuild={(build) => {
              addToBag(build);
              setBagOpen(true);
            }}
          />
        )}
      </main>

      <footer className="border-t border-white/[0.08] bg-[#090b13]/80">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-4 px-5 py-8 text-xs text-[#958da1] sm:flex-row sm:items-center md:px-12">
          <div className="flex items-center gap-3">
            <span className="font-display font-semibold text-white">Vektor</span>
            <span aria-hidden="true">·</span>
            <span>Precision Compute & Optical Architecture</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => navigateTo('showcase')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Showcase
            </button>
            <button
              type="button"
              onClick={() => navigateTo('catalog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Hardware
            </button>
            <button
              type="button"
              onClick={() => navigateTo('inspector')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Spec Sheet
            </button>
            <button
              type="button"
              onClick={() => navigateTo('configurator')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Configurator
            </button>
          </div>
        </div>
      </footer>

      <BagDrawer
        open={bagOpen}
        onClose={() => setBagOpen(false)}
        items={bagItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearBag={() => setBagItems([])}
      />
    </div>
  );
}
