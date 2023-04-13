import React, { useReducer } from 'react';

interface State {
  count: number;
}

interface ReducerCounterProps {
  initValue: number;
}

type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const ButtonReducerComponent: React.FC<ReducerCounterProps> = ({ initValue }) => {
  const [state, dispatch] = useReducer(reducer, { count: initValue });

  return (
    <div>
      <p>Count Reducer: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Up</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Down</button>
    </div>
  );
};

export default ButtonReducerComponent;
