import Overview from '@/components/Overview';
import Pictures from '@/components/Pictures';
import Poems from '@/components/Poems';
import Sentences from '@/components/Sentences';
import { Layout } from 'antd';
import React from 'react';
import './index.less';
const { Header, Content, Footer } = Layout;

export default () => {
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header className="header">
        <h1 className="title" style={{ color: 'white', textAlign: 'center' }}>
          Crawler Dashboard
        </h1>
      </Header>
      <Content className="content">
        <Overview />
        <Pictures />
        <Poems />
        <Sentences />
      </Content>
      <Footer style={{ textAlign: 'center', marginBottom: '36px' }}>
        Lifeni ©2020 用于 Python 实习作品
      </Footer>
    </Layout>
  );
};
