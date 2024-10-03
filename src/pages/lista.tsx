import { useEffect, useState } from 'react';
import styles from '@/styles/lista.module.css';
import { IUser } from '@/types/user';

export default function Lista() {
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUsersList() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`
      );
      const data = await response.json();

      if (!response.ok) throw new Error('Erro ao obter os dados');

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Lista de usuários</h2>

        <div data-list-container>
          {users.length ? (
            users.map((user) => (
              <div key={user.id} data-list-item>
                ID {user.id} - {user.name} ({user.email})
              </div>
            ))
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
