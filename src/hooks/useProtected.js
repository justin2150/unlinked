import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { populateId } from '../slices/idme';

export default function useProtected() {
  const jwtToken = localStorage.getItem('jwtToken') || '';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (!jwtToken) return navigate('/');

      async function checkToken() {
        const res = await fetch(
          `${import.meta.env.VITE_SITE_URL}/api/v1/client/verify`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (res.status !== 200) {
          return navigate('/');
        }
        const { id } = await res.json();
        dispatch(populateId(id));
      }
      checkToken();
    },
    [dispatch, jwtToken, navigate]
  );
}
