import { useEffect, useRef } from "react";

const useOutsideModalClick = (close?: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close?.();
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);
  //  const ref = useRef(null);
  //  useEffect(() => {
  //    const handleClick = (e: MouseEvent) => {
  //      if (!ref.current) return;
  //      if (e.target === ref.current) close?.();
  //      else return;
  //    };
  //    document.addEventListener("click", handleClick);
  //    return () => document.removeEventListener("click", handleClick);
  //  }, [close]);

  return { ref };
};
export default useOutsideModalClick;
