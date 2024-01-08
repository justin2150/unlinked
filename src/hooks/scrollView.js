import { useEffect } from 'react';

export default function useScrollIntoview(secret, listEl) {
  useEffect(
    function () {
      if (secret) listEl.current.scrollIntoView({ behavior: 'smooth' });
    },
    [listEl, secret]
  );
}
