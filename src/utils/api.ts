const API_URL = 'https://6884ffe5745306380a3a10d1.mockapi.io/clientes';
export interface Cliente {
  id?: string;
  nome: string;
  contato: string;
  createdAt?: string;
}
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Falha ao buscar clientes');
  }
  return response.json();
};
export const getCliente = async (id: string): Promise<Cliente> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar cliente');
  }
  return response.json();
};
export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  });
  if (!response.ok) {
    throw new Error('Falha ao criar cliente');
  }
  return response.json();
};
export const updateCliente = async (id: string, cliente: Cliente): Promise<Cliente> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  });
  if (!response.ok) {
    throw new Error('Falha ao atualizar cliente');
  }
  return response.json();
};
export const deleteCliente = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Falha ao excluir cliente');
  }
};