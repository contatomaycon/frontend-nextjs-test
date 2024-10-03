import React from 'react';
import styles from '@/styles/context-api.module.css';
import { IToastMessage } from '@/types/toast-message';
import { ToastMessage } from '@/components/ToastMessage';
import { useToast } from '@/contexts/ToastContext';

export default function ContextApi() {
  const { messages, addMessage, removeMessage } = useToast();

  function handleSuccessButtonClick() {
    const successMessage: IToastMessage = {
      id: String(new Date().getTime()),
      message: 'Mensagem de sucesso',
      type: 'success',
    };

    addMessage(successMessage);
  }

  function handleErrorButtonClick() {
    const errorMessage: IToastMessage = {
      id: String(new Date().getTime()),
      message: 'Mensagem de erro',
      type: 'error',
    };

    addMessage(errorMessage);
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={handleSuccessButtonClick}>
          Disparar mensagem de sucesso
        </button>
        <button type="button" onClick={handleErrorButtonClick}>
          Disparar mensagem de erro
        </button>
      </div>

      <div className={styles['toast-container']}>
        {messages.map((message) => (
          <ToastMessage
            key={message.id}
            content={message}
            onClose={removeMessage}
          />
        ))}
      </div>
    </>
  );
}
