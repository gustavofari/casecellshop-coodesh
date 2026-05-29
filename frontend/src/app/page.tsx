"use client";

import { useCheckout } from '../hooks/useCheckout';
import { Header } from '../components/layout/Header';
import { ProductGrid } from '../components/layout/ProductGrid';
import { ProductCard } from '../components/product/ProductCard';
import { PurchaseModal } from '../components/ui/PurchaseModal';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { Pagination } from '../components/ui/Pagination';
import { PackageSearch } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export default function CheckoutPage() {
  const {
    paginatedProducts,
    isLoadingPage,
    buyingProductId,
    feedback,
    currentPage,
    totalPages,
    onSearchChange,
    handlePageChange,
    handleBuyProduct,
    clearFeedback,
  } = useCheckout();

  useScrollToTop(currentPage);

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-950 relative">
      <Header onSearch={onSearchChange} />

      <main className="max-w-7xl mx-auto px-6">
        <ProductGrid>
          {isLoadingPage ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isProcessing={buyingProductId === product.id}
                onBuy={handleBuyProduct}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-inner">
              <PackageSearch className="w-16 h-16 text-gray-300 mb-6" />
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Nenhum resultado</h3>
              <p className="text-gray-500 max-w-xs mt-1.5">
                Não encontramos capinhas para o termo selecionado. Tente outra busca.
              </p>
            </div>
          )}
        </ProductGrid>

        {!isLoadingPage && paginatedProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {feedback && <PurchaseModal feedback={feedback} onClose={clearFeedback} />}

      <footer className="max-w-7xl mx-auto px-6 py-10 mt-12 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>&copy; 2026 CaseCellShop Inc. Todos os direitos reservados.</p>
        <p className="text-xs mt-1">Challenge by Coodesh.</p>
      </footer>
    </div>
  );
}
