/**
 * 主页采用模块化设计，模块在 /src/components/ 目录
 */

import Overview from '@/components/Overview';
import Pictures from '@/components/Pictures';
import Poems from '@/components/Poems';
import Sentences from '@/components/Sentences';
import { Layout } from 'antd';
import React, { useState, useEffect, createContext } from 'react';
import './index.less';
const { Header, Content, Footer } = Layout;

export const DataContext = createContext();

export default () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8001')
      .then(res => res.json())
      .then(data => {
        setData(data);
        // console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <DataContext.Provider value={data}>
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
        <Footer style={{ textAlign: 'center', marginBottom: '12px' }}>
          Lifeni ©2020 用于 Python 实习作品
        </Footer>
      </Layout>
    </DataContext.Provider>
  );
};
