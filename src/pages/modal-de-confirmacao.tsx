import React, { useState } from 'react';
import styles from '@/styles/modal.module.css';
import { ConfirmationModal } from '@/components/Modal/ConfirmationModal';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleConfirm() {
    setModalIsOpen(false);
    alert('Ação confirmada!');
  }

  function handleClose() {
    setModalIsOpen(false);
  }

  return (
    <>
      <main className={styles.container}>
        <button type="button" onClick={() => setModalIsOpen(true)}>
          Abrir modal de confirmação
        </button>
      </main>

      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        content="Tem certeza que deseja realizar esta ação?"
      />
    </>
  );
}
