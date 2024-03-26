import { useEffect, useState } from 'react';

export default function useStates() {
  const [states, setStates] = useState([]);
  console.log(import.meta.env.VITE_SITE_URL);
  useEffect(function () {
    const fetchAsync = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SITE_URL}/api/v1/states/usa`
        );
        const { states } = await res.json();
        setStates(states);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAsync();
  }, []);
  return states.length > 1 ? states : [];
}
