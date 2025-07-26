import React, { useEffect, useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import { getClientes, Cliente } from '../utils/api';
import { UsersIcon } from 'lucide-react';
const RegisterPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  const handleClienteAdded = () => {
    fetchClientes();
  };
  const handleClienteDeleted = () => {
    fetchClientes();
  };
  const handleClienteUpdated = () => {
    fetchClientes();
  };
  return <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Cadastro de Participantes</h1>
        <p className="mt-2 text-gray-300">
          Registre os participantes para o sorteio
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <ClientForm onClienteAdded={handleClienteAdded} />
        <div>
          <div className="flex items-center gap-2 mb-4">
            <UsersIcon size={24} />
            <h2 className="text-xl font-bold">
              Total de Participantes: {clientes.length}
            </h2>
          </div>
          {loading ? <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div> : error ? <div className="bg-red-500/80 text-white p-4 rounded-lg">
              {error}
              <button onClick={fetchClientes} className="ml-4 underline">
                Tentar novamente
              </button>
            </div> : <ClientList clientes={clientes} onClienteDeleted={handleClienteDeleted} onClienteUpdated={handleClienteUpdated} />}
        </div>
      </div>
    </div>;
};
export default RegisterPage;