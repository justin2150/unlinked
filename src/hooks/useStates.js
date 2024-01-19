import { useEffect, useState } from 'react';
import { SITE_URL } from '../utils/variables';

export default function useStates() {
  const [states, setStates] = useState([]);
  useEffect(function () {
    const fetchAsync = async () => {
      try {
        const res = await fetch(`${SITE_URL}/api/v1/states/usa`);
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
