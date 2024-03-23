import { useState } from 'react';
import { Layout, Input, Button, List, Typography } from 'antd';

const { Header, Content } = Layout;

const TalkPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { content: 'こんにちは！', sender: 'friend' },
    { content: 'こんにちは！返信ありがとう！', sender: 'self' },
  ]);

  const handleMessageSend = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { content: inputMessage, sender: 'self' }]);
      setInputMessage('');
    }
  };

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Typography.Title>相手の名前</Typography.Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <List
          style={{ height: '60vh', overflow: 'auto' }}
          dataSource={messages}
          renderItem={(message, index) => (
            <List.Item
              style={{
                textAlign: message.sender === 'self' ? 'right' : 'left',
              }}
            >
              <div
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  backgroundColor:
                    message.sender === 'self' ? '#DCF8C6' : '#fff',
                  marginLeft: message.sender === 'self' ? 'auto' : 'unset',
                  marginRight: message.sender === 'self' ? 'unset' : 'auto',
                }}
              >
                {message.content}
              </div>
            </List.Item>
          )}
        />
        <div style={{ marginTop: '20px' }}>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onPressEnter={handleMessageSend}
            placeholder="メッセージを入力してください"
            style={{ width: '80%', marginRight: '10px' }}
          />
          <Button type="primary" onClick={handleMessageSend}>
            送信
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default TalkPage;
