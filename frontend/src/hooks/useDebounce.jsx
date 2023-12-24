import { useEffect } from 'react';
import { useTimeout } from './useTimeout.jsx';

export const useDebounce = (callback, delay, deps) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...deps, reset]);
  useEffect(clear, []);
}