import { useState, useEffect, useRef, useLayoutEffect } from 'react';

type CounterProps = {
  initialCount: number;
  onUnmount: () => void;
};

export const Counter: React.FC<CounterProps> = ({
  initialCount,
  onUnmount,
}) => {
  const [count, setCount] = useState(initialCount);
  const TOTAL_COUNT = 10;
  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!hasMounted.current) {
      const handleCounterMount = new CustomEvent('onCounterMount');
      window.dispatchEvent(handleCounterMount);

      hasMounted.current = true;
    }

    return () => {
      if (!hasMounted.current) {
        const handleCounterUnmount = new CustomEvent('onCounterUnmount');

        window.dispatchEvent(handleCounterUnmount);
      }
    };
  }, []);

  useEffect(() => {
    if (count && hasMounted.current) {
      const handleCounterUpdate = new CustomEvent('onCounterUpdate', {
        detail: { count },
      });
      window.dispatchEvent(handleCounterUpdate);

      if (count >= TOTAL_COUNT) {
        const handleCounterUnmount = new CustomEvent('onCounterUnmount');
        window.dispatchEvent(handleCounterUnmount);

        onUnmount();
      }
    }
  }, [count, onUnmount]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={handleIncrement}>Incrementar +</button>
    </div>
  );
};
