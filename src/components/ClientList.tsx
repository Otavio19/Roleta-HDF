import React, { useState } from 'react';
import { Cliente, deleteCliente, updateCliente } from '../utils/api';
import { TrashIcon, PencilIcon, CheckIcon, XIcon } from 'lucide-react';
interface ClientListProps {
  clientes: Cliente[];
  onClienteDeleted: () => void;
  onClienteUpdated: () => void;
}
const ClientList: React.FC<ClientListProps> = ({
  clientes,
  onClienteDeleted,
  onClienteUpdated
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editContato, setEditContato] = useState('');
  const [loading, setLoading] = useState(false);
  const handleEdit = (cliente: Cliente) => {
    setEditingId(cliente.id || null);
    setEditNome(cliente.nome);
    setEditContato(cliente.contato);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  const handleSaveEdit = async (id: string) => {
    if (!editNome.trim() || !editContato.trim()) return;
    setLoading(true);
    try {
      await updateCliente(id, {
        nome: editNome.trim(),
        contato: editContato.trim()
      });
      setEditingId(null);
      onClienteUpdated();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este participante?')) {
      setLoading(true);
      try {
        await deleteCliente(id);
        onClienteDeleted();
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (clientes.length === 0) {
    return <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-6">
        <p className="text-center text-gray-200">
          Nenhum participante cadastrado ainda.
        </p>
      </div>;
  }
  return <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Participantes Cadastrados</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-white/20">
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">Contato</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => <tr key={cliente.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4">
                  {editingId === cliente.id ? <input type="text" value={editNome} onChange={e => setEditNome(e.target.value)} className="w-full p-1 bg-white/20 border border-white/30 rounded focus:ring-2 focus:ring-purple-300 focus:outline-none text-white" /> : cliente.nome}
                </td>
                <td className="py-3 px-4">
                  {editingId === cliente.id ? <input type="text" value={editContato} onChange={e => setEditContato(e.target.value)} className="w-full p-1 bg-white/20 border border-white/30 rounded focus:ring-2 focus:ring-purple-300 focus:outline-none text-white" /> : cliente.contato}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingId === cliente.id ? <div className="flex justify-end space-x-2">
                      <button onClick={() => handleSaveEdit(cliente.id!)} disabled={loading} className="p-1 text-green-400 hover:text-green-300 disabled:opacity-50" title="Salvar">
                        <CheckIcon size={18} />
                      </button>
                      <button onClick={handleCancelEdit} disabled={loading} className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50" title="Cancelar">
                        <XIcon size={18} />
                      </button>
                    </div> : <div className="flex justify-end space-x-2">
                      <button onClick={() => handleEdit(cliente)} disabled={loading} className="p-1 text-blue-400 hover:text-blue-300 disabled:opacity-50" title="Editar">
                        <PencilIcon size={18} />
                      </button>
                      <button onClick={() => handleDelete(cliente.id!)} disabled={loading} className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50" title="Excluir">
                        <TrashIcon size={18} />
                      </button>
                    </div>}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default ClientList;