import { Layout, Menu, Button, Row, Col } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

const AuthedLayout = () => {
  const handleLogout = () => {
    // ログアウトの処理を実装する
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
