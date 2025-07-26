import React, { useState } from 'react';
import { createCliente, Cliente } from '../utils/api';
interface ClientFormProps {
  onClienteAdded: () => void;
}
const ClientForm: React.FC<ClientFormProps> = ({
  onClienteAdded
}) => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !contato.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const novoCliente: Cliente = {
        nome: nome.trim(),
        contato: contato.trim()
      };
      await createCliente(novoCliente);
      setNome('');
      setContato('');
      onClienteAdded();
    } catch (err) {
      setError('Erro ao cadastrar cliente. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Novo Participante</h2>
      {error && <div className="bg-red-500/80 text-white p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium">
            Nome
          </label>
          <input type="text" id="nome" value={nome} onChange={e => setNome(e.target.value)} className="w-full p-2.5 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none text-white" placeholder="Digite o nome do participante" disabled={loading} />
        </div>
        <div className="mb-4">
          <label htmlFor="contato" className="block mb-2 text-sm font-medium">
            Contato
          </label>
          <input type="text" id="contato" value={contato} onChange={e => setContato(e.target.value)} className="w-full p-2.5 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-300 focus:outline-none text-white" placeholder="Digite o contato do participante" disabled={loading} />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium rounded-lg py-2.5 px-5 focus:outline-none focus:ring-2 focus:ring-purple-300 disabled:opacity-70">
          {loading ? 'Cadastrando...' : 'Cadastrar Participante'}
        </button>
      </form>
    </div>;
};
export default ClientForm;