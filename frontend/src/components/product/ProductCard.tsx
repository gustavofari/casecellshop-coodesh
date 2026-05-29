import { useState, memo } from "react";
import Image from "next/image";
import { Minus, Plus, PackageX } from "lucide-react";
import type { Product } from "../../types/checkout.types";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  isProcessing: boolean;
  onBuy: (id: string, quantity: number) => void;
}

function ProductCardComponent({ product, isProcessing, onBuy }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const isOutOfStock = product.stock === 0;
  const isDisabled = isProcessing || isOutOfStock;
  const selectedQuantity = Math.min(quantity, product.stock || 1);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(product.stock, q + 1));

  const getButtonStyles = () => {
    if (isOutOfStock)
      return "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200";
    if (isProcessing) return "bg-blue-100 text-blue-500 cursor-wait animate-pulse";
    return "bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-gray-200 hover:shadow-gray-300 transform hover:-translate-y-0.5";
  };

  return (
    <article
      data-testid="product-card"
      className="group bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-50/50 border border-gray-100 transition-all duration-300 flex flex-col"
    >
      <div className="aspect-4/3 rounded-xl overflow-hidden mb-5 bg-gray-50 border border-gray-100 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
            <PackageX className="w-8 h-8 text-gray-400" />
            <span className="text-sm font-medium text-gray-500">Sem estoque</span>
          </div>
        )}
      </div>

      <div className="grow flex flex-col justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-950 leading-snug tracking-tight mb-1.5 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h2>

        <div className="flex items-end justify-between gap-4 mt-auto">
          <p className="text-2xl font-extrabold text-gray-950 tracking-tight">
            {formatCurrency(product.price)}
          </p>

          <span className="text-gray-500 mr-1">
            {isOutOfStock ? "Esgotado" : `${product.stock} disponíveis`}
          </span>
        </div>
      </div>

      {!isOutOfStock && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Quantidade</span>
          <div className="flex items-center gap-3" data-testid="quantity-selector">
            <button
              type="button"
              onClick={decrement}
              disabled={selectedQuantity <= 1 || isProcessing}
              aria-label="Diminuir quantidade"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              data-testid="quantity-value"
              className="w-6 text-center text-sm font-bold text-gray-900"
            >
              {selectedQuantity}
            </span>
            <button
              type="button"
              onClick={increment}
              disabled={selectedQuantity >= product.stock || isProcessing}
              aria-label="Aumentar quantidade"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        data-testid={`buy-button-${product.id}`}
        onClick={() => onBuy(product.id, selectedQuantity)}
        disabled={isDisabled}
        className={`w-full py-3 px-5 rounded-xl font-bold transition-all duration-200 text-sm flex items-center justify-center gap-2 ${getButtonStyles()}`}
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            Processando...
          </>
        ) : isOutOfStock ? (
          "Produto Indisponível"
        ) : (
          <>Comprar</>
        )}
      </button>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
