import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Input, Button, List, Typography } from 'antd';
import io from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const { Header, Content } = Layout;
const socket = io('ws://localhost:3000', {
  query: {
    id: 'hogehogehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
});
const TalkPage = () => {
  const {me} = useAuth()
  const { data:username } = useQuery({
    queryKey: ['api/me'],
    queryFn: me,
  });
  const id = useMemo(()=>{
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return randomNumber.toString();
  },[])
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<{content:string,sender:'self'|'friend'}[]>([]);

  const handleMessageSend = () => {
    socket.emit('message', { text: inputMessage, id });
  };
  useEffect(() => {
    if (!socket.connected) {
      return;
    }
    console.log({ socket });
    socket.on('message', (message) => {
      console.log({ message: message.text.text });
      console.log({username})
      setMessages((prev) => [
        ...prev,
        {
          content: message.text.text,
          sender:message.text.id === id? 'self' : 'friend',
        },
      ]);
    });

    console.log('bnurteiongeuinrg');
    return () => {
      socket.disconnect();
    };
  }, [socket.connected]);

  return (
    <Layout>
      <Header style={{ background: '#fff' }}>
        <Typography.Title>相手の名前</Typography.Title>
      </Header>
      <Content style={{ padding: '50px' }}>
        <List
          style={{ height: '60vh', overflow: 'auto' }}
          dataSource={messages}
          renderItem={(message) => (
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
          <Button type="primary" onClick={handleMessageSend} disabled={!username}>
            送信
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default TalkPage;
