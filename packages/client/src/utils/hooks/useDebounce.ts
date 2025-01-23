import { useRef, useEffect } from "react";

/**
 * A custom hook that debounces the execution of a callback function.
 * @param callback The function to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns A debounced version of the callback function.
 */
export default function useDebounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (...args: Args) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return debouncedCallback;
}
