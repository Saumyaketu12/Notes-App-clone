import { useRef, useEffect } from "react";
export default function useDebounce(fn, delay, deps) {
  const t = useRef();
  useEffect(() => {
    clearTimeout(t.current);
    t.current = setTimeout(fn, delay);
    return () => clearTimeout(t.current);
  }, deps);
}
