import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import styles from '@/styles/ciclo-de-vida.module.css';
import { Counter } from '@/components/Counter';

type CicloDeVidaProps = {
  initialCount: number;
};

export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
  const [showCounter, setShowCounter] = useState(false);

  function handleOcultCounterClick() {
    setShowCounter((prevState) => !prevState);
  }

  useEffect(() => {
    const handleMount = () => console.log('onCounterMount');
    const handleUnmount = () => setShowCounter(false);
    const handleUpdate = (event: CustomEventInit) =>
      console.log('onCounterUpdate', event.detail);

    window.addEventListener('onCounterMount', handleMount);
    window.addEventListener('onCounterUnmount', handleUnmount);
    window.addEventListener('onCounterUpdate', handleUpdate);

    return () => {
      window.removeEventListener('onCounterMount', handleMount);
      window.removeEventListener('onCounterUnmount', handleUnmount);
      window.removeEventListener('onCounterUpdate', handleUpdate);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <button type="button" onClick={handleOcultCounterClick}>
          {showCounter ? 'Ocultar contador' : 'Mostrar contador'}
        </button>

        {showCounter && (
          <>
            <h1>Exemplo de Ciclo de vida</h1>

            <div data-content>
              <Counter
                initialCount={initialCount}
                onUnmount={() => setShowCounter(false)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  CicloDeVidaProps
> = async () => {
  return {
    props: {
      initialCount: 0,
    },
  };
};
