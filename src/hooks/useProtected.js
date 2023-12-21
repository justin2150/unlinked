import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { populateId } from '../slices/idme';
import { SITE_URL } from '../utils/variables';

const BASEURL = `${SITE_URL}/api/v1`;

export default function useProtected() {
  const jwtToken = localStorage.getItem('jwtToken') || '';
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (!jwtToken) return navigate('/');

      async function checkToken() {
        const res = await fetch(`${BASEURL}/client/verify`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (res.status !== 200) {
          return navigate('/');
        }
        const { user, id } = await res.json();
        setUser(user);
        dispatch(populateId(id));
      }
      checkToken();
    },
    [dispatch, jwtToken, navigate]
  );
  return user;
}
