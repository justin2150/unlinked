import { useEffect, useState } from 'react';
import { SITE_URL } from '../utils/variables';

const BASEURL = `${SITE_URL}/api/v1`;

export default function useStates() {
  const [states, setStates] = useState([]);
  useEffect(function () {
    const fetchAsync = async () => {
      try {
        const res = await fetch(`${BASEURL}/states`);
        const data = await res.json();
        setStates(data.states);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAsync();
  }, []);
  return states;
}
