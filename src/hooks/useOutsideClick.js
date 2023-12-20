import { useEffect } from "react";

export default function useOutsideClick(ref, revert) {
  useEffect(
    function () {
      const handleClick = (e) => {
        if (ref.current) {
          const addrEl = ref.current.previousElementSibling;
          if (
            addrEl === e.target.closest("div") ||
            ref.current.contains(e.target)
          )
            return;
          revert();
        }
      };

      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    },
    [ref, revert]
  );
}
