import React, { useState } from 'react';
import { Collapse, List, Button, Modal, Input } from 'antd';

const { Panel } = Collapse;
const { Search } = Input;

const UserPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activePanel, setActivePanel] = useState(null);

  // モーダルを開くハンドラー
  const handleModalOpen = () => {
    setModalVisible(true);
  };

  // モーダルを閉じるハンドラー
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // 検索ボックスの変更ハンドラー
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '50px' }}>
      <Search
        placeholder="検索..."
        onChange={handleSearchChange}
        style={{ marginBottom: '10px' }}
      />
      <Collapse
        accordion={false}
        activeKey={activePanel}
        onChange={(key) => setActivePanel(key)}
      >
        <Panel header="友達一覧" key="1">
          <List
            dataSource={['友達1', '友達2', '友達3']}
            renderItem={(item) => (
              <List.Item>
                {item}
                <Button type="link" onClick={handleModalOpen}>
                  トークに飛ぶ
                </Button>
              </List.Item>
            )}
          />
        </Panel>
        <Panel header="友達申請一覧" key="2">
          <List
            dataSource={['友達申請1', '友達申請2', '友達申請3']}
            renderItem={(item) => (
              <List.Item>
                {item}
                <Button type="primary">許可</Button>
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <Modal
        title="トークに飛ぶ"
        visible={modalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
        <p>トーク画面です。</p>
      </Modal>
    </div>
  );
};

export default UserPage;
