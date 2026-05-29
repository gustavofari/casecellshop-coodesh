import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchProductsService, processCheckoutService } from '../services/checkout.service';
import type { Product, FeedbackState } from '../types/checkout.types';

const ITEMS_PER_PAGE = 8;

interface UseCheckoutReturn {
  paginatedProducts: Product[];
  isLoadingPage: boolean;
  buyingProductId: string | null;
  feedback: FeedbackState | null;
  currentPage: number;
  totalPages: number;
  onSearchChange: (query: string) => void;
  handlePageChange: (page: number) => void;
  handleBuyProduct: (productId: string, quantity: number) => Promise<void>;
  clearFeedback: () => void;
}

export function useCheckout(): UseCheckoutReturn {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [buyingProductId, setBuyingProductId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const filteredProducts = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    if (!lowerQuery) return allProducts;

    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery),
    );
  }, [allProducts, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const onSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  const loadProducts = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchProductsService();
      setAllProducts(data);
    } catch (error) {
      setFeedback({
        type: 'error',
        title: 'Erro de Conexão',
        message: error instanceof Error ? error.message : 'Erro ao carregar a vitrine.',
      });
    } finally {
      setIsLoadingPage(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const handleBuyProduct = useCallback(
    async (productId: string, quantity: number): Promise<void> => {
      setBuyingProductId(productId);
      setFeedback(null);

      try {
        const response = await processCheckoutService(productId, quantity);

        setFeedback({
          type: 'success',
          title: 'Compra Aprovada!',
          productName: response.product,
          quantity: response.quantityBought,
          remainingStock: response.remainingStock,
        });

        await loadProducts();
      } catch (error) {
        setFeedback({
          type: 'error',
          title: 'Falha na Compra',
          message: error instanceof Error ? error.message : 'Erro durante o checkout no ERP.',
        });
      } finally {
        setBuyingProductId(null);
      }
    },
    [loadProducts],
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);

  return {
    paginatedProducts,
    isLoadingPage,
    buyingProductId,
    feedback,
    currentPage: safePage,
    totalPages,
    onSearchChange,
    handlePageChange,
    handleBuyProduct,
    clearFeedback,
  };
}
