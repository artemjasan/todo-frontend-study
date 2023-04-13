import React, { useState, useEffect } from 'react';

const ButtonComponent: React.FC = () => {
  const [count, setCount] = useState<{ count: number; count1: number }>({
    count: 1,
    count1: 2,
  });

  const [summary, setSummary] = useState<number>(0);

  useEffect(() => {
    setSummary(count.count + count.count1);
  }, [count.count, count.count1]);

  const handleIncrement = (): void => {
    setCount((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  const handleDecrement = (): void => {
    setCount((prev) => ({ ...prev, count1: prev.count1 - 1 }));
  };

  return (
    <div>
      <p>
        Counter: {count.count} {count.count1}
      </p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
      <div>Summ: {summary}</div>
    </div>
  );
};

export default ButtonComponent;
