import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
} from './counterSlice';
import styles from './Counter.module.css';
import { ActionCreators } from 'redux-undo';
import { random } from '../color/ColorSlice';
import { selectCount } from '../../app/store';
import { addHistory, redo, undo } from '../../app/history';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  const handleIncrementChange = (value: number) => {
    dispatch(
      addHistory({
        oldValue: count,
        newValue: count + value ,
        type: incrementByAmount(value).type
      })
    );
    dispatch(incrementByAmount(value));
  };

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}//
        >
          +
        </button>
      </div>
      <div className={styles.row}>

        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(redo())}
        >
         Forward 
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(undo())}
        >
         Back 
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={e => handleIncrementChange(incrementValue)}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          //onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          //onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({...random(), wouldLikeToBeInHistory: true})}
        >
          Color Random
        </button>
      </div>
    </div>
  );
}
