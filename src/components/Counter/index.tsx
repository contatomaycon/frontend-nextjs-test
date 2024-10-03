import { useState, useEffect } from 'react';

type CounterProps = {
  initialCount: number;
  onUnmount: () => void;
};

export const Counter: React.FC<CounterProps> = ({ initialCount, onUnmount }) => {
  const [count, setCount] = useState(initialCount);
  const TOTAL_COUNT = 10;

  useEffect(() => {
    const handleCounterMount = new CustomEvent('onCounterMount');

    window.dispatchEvent(handleCounterMount);

    return () => {
      const handleCounterUnmount = new CustomEvent('onCounterUnmount');
	  	  
	  if (count > 0) {
      	window.dispatchEvent(handleCounterUnmount);
	  }
    };
  }, []);

  useEffect(() => {
    const handleCounterUpdate = new CustomEvent('onCounterUpdate', { detail: { count } });
    window.dispatchEvent(handleCounterUpdate);

    if (count === TOTAL_COUNT) {
      const handleCounterUnmount = new CustomEvent('onCounterUnmount');

      window.dispatchEvent(handleCounterUnmount);
      onUnmount();
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
