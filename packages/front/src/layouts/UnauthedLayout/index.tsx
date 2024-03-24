import { useQuery } from '@tanstack/react-query';
import { Layout } from 'antd';
import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UnauthedLayout = () => {
  const navigate = useNavigate();
  const query = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    return fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return true; // ステータスコードが 200-299 の範囲内であれば true を返す
        } else {
          return false; // それ以外の場合は false を返す
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return false; // エラーが発生した場合も false を返す
      });
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['api/me'],
    queryFn: query,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (data) {
      navigate('/users');
    }
  }, [isLoading]);
  return (
    <Layout
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Outlet />
    </Layout>
  );
};

export default UnauthedLayout;
