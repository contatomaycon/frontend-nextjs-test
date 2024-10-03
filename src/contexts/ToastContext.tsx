import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IToastMessage } from '@/types/toast-message';

interface ToastContextData {
  messages: IToastMessage[];
  addMessage: (message: IToastMessage) => void;
  removeMessage: (id: string) => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addMessage = (message: IToastMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setTimeout(() => removeMessage(message.id), 5000);
  };

  const removeMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <ToastContext.Provider value={{ messages, addMessage, removeMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
