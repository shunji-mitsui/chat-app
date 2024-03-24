import { useCallback } from 'react';

const useAuth = () => {
  const me = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    return fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        const res = await response.json()
        console.log({response:res.userName})
        return res.userName as string
      })
  }, []);

  return { me };
};

export default useAuth;
