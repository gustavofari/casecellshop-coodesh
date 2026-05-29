import { CheckCircle2, XCircle, X, Package, Hash } from 'lucide-react';
import type { FeedbackState } from '../../types/checkout.types';

interface PurchaseModalProps {
  feedback: FeedbackState;
  onClose: () => void;
}

export function PurchaseModal({ feedback, onClose }: PurchaseModalProps) {
  const isSuccess = feedback.type === 'success';

  return (
    <div data-testid="purchase-modal" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className={`p-6 text-white flex items-start justify-between ${isSuccess ? 'bg-green-600' : 'bg-red-600'}`}>
          <div className="flex items-center gap-3">
            {isSuccess ? <CheckCircle2 className="w-8 h-8 text-green-100" /> : <XCircle className="w-8 h-8 text-red-100" />}
            <h3 className="text-xl font-bold">{feedback.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
            aria-label="Fechar popup"
            data-testid="close-modal-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-gray-700">
          {feedback.type === 'success' ? (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium pb-2 border-b border-gray-100">
                Seu pedido foi processado pelo nosso ERP e confirmado.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Produto</p>
                    <p className="text-gray-900 font-bold">{feedback.productName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Qtd Comprada</p>
                      <p className="text-gray-900 font-bold">{feedback.quantity} un.</p>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-lg text-gray-800 font-medium">{feedback.message}</p>
              <p className="text-sm text-gray-500 mt-2">Por favor, feche este aviso e tente novamente.</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2.5 rounded-xl font-bold transition-colors ${
              isSuccess 
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {isSuccess ? 'Continuar Comprando' : 'Fechar'}
          </button>
        </div>
      </div>
    </div>
  );
}
