import React, { useEffect, useState } from 'react';
import Wheel from '../components/Wheel';
import Modal from '../components/Modal';
import { getClientes, Cliente } from '../utils/api';
import { TrophyIcon } from 'lucide-react';
const WheelPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [winner, setWinner] = useState<Cliente | null>(null);
  const fetchClientes = async () => {
    setLoading(true);
    try {
      const data = await getClientes();
      setClientes(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Falha ao carregar os participantes. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClientes();
  }, []);
  const handleWinnerSelected = (winner: Cliente) => {
    setWinner(winner);
  };
  const handleCloseModal = () => {
    setWinner(null);
  };
  return <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Roleta do Sorteio</h1>
        <p className="mt-2 text-gray-300">
          Gire a roleta para selecionar um ganhador
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrophyIcon size={24} className="text-yellow-400" />
            <h2 className="text-xl font-bold">Sorteie um Ganhador</h2>
          </div>
          {loading ? <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div> : error ? <div className="bg-red-500/80 text-white p-4 rounded-lg text-center">
              {error}
              <button onClick={fetchClientes} className="ml-4 underline">
                Tentar novamente
              </button>
            </div> : <Wheel clientes={clientes} onWinnerSelected={handleWinnerSelected} />}
        </div>
      </div>
      {winner && <Modal winner={winner} onClose={handleCloseModal} />}
    </div>;
};
export default WheelPage;