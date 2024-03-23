import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const UnauthedLayout = () => {
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
