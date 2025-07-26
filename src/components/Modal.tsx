import React from 'react';
import { Cliente } from '../utils/api';
import { XIcon } from 'lucide-react';
interface ModalProps {
  winner: Cliente | null;
  onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({
  winner,
  onClose
}) => {
  if (!winner) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-2xl p-8 max-w-md w-full animate-scale-up relative" style={{
      animation: 'scale-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
    }}>
        <button onClick={onClose} className="absolute top-2 right-2 text-white/80 hover:text-white" aria-label="Fechar">
          <XIcon size={24} />
        </button>
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Temos um ganhador!</h2>
          <div className="py-6 px-4 my-4 bg-white/10 rounded-lg">
            <h3 className="text-3xl font-bold mb-1">{winner.nome}</h3>
            <p className="text-gray-200">{winner.contato}</p>
          </div>
          <button onClick={onClose} className="mt-4 bg-white text-purple-700 hover:bg-gray-100 font-medium py-2 px-6 rounded-full">
            Fechar
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scale-up {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>;
};
export default Modal;