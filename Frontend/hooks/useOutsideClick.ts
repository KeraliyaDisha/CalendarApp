import { useEffect } from "react";

export default function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>, // Allow null explicitly
  callback: () => void
) {
  useEffect(() => {
    if (!ref.current) return; // Early exit if ref is null

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
