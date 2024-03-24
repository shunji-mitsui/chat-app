import { useQuery } from '@tanstack/react-query';
import { Layout, Menu, Button, Row, Col } from 'antd';
import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

const AuthedLayout = () => {
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
    if (!data) {
      navigate('/login');
    }
  }, [isLoading]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Header style={{ background: '#fff', padding: 0 }}>
        <Row justify="space-around">
          <Col span={16}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"> ユーザー一覧</Menu.Item>
              <Menu.Item key="2">トーク一覧</Menu.Item>
            </Menu>
          </Col>
          <Col>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthedLayout;
