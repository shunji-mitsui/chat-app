import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Item } = Form;

const LoginPage = () => {
  const navigate = useNavigate();
  // ログインフォームの送信ハンドラー
  const onFinish = (inputValue: { email: string; password: string }) => {
    navigate('/users');
    console.log('Success:', inputValue);
    // ここにログイン処理を実装します
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Card
      title="Chat-App ログイン"
      style={{
        maxWidth: '1000px',
        maxHeight: '1800px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ textAlign: 'center' }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Item
          label="ユーザー名"
          name="username"
          rules={[
            { required: true, message: 'ユーザー名を入力してください！' },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="パスワード"
          name="password"
          rules={[
            { required: true, message: 'パスワードを入力してください！' },
          ]}
        >
          <Input.Password />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            ログイン
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default LoginPage;
