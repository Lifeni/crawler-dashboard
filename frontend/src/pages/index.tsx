import {
  Card,
  Col,
  Layout,
  Menu,
  Row,
  Typography,
  Statistic,
  PageHeader,
} from 'antd';
import React, { useState, ReactNode } from 'react';
import './index.less';

const { SubMenu } = Menu;
const { Title, Paragraph, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;

interface ModuleProps {
  children: ReactNode;
  title: String;
  subtitle: String;
}

const Module = ({ children, title, subtitle }: ModuleProps) => {
  return (
    <>
      <Row
        align="top"
        gutter={[16, 16]}
        justify="start"
        style={{ maxWidth: 1200, width: '100%' }}
      >
        <PageHeader title={title} subTitle={subtitle} />
      </Row>
      <Row
        align="top"
        gutter={[16, 16]}
        justify="space-between"
        style={{ maxWidth: 1200, width: '100%' }}
      >
        {children}
      </Row>
    </>
  );
};

const Overview = () => {
  return (
    <Module title="Overview" subtitle="统计与概览">
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="所有数据">
          <Row style={{ marginBottom: 24 }}>
            <Statistic title="数据总量" value={112893} suffix="条" />
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title="数据类别" value={3} suffix="种" />
            </Col>
            <Col span={12}>
              <Statistic title="数据表" value={4} suffix="个" />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="必应壁纸">
          <Row style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Statistic title="数据量" value={90} suffix="条" />
            </Col>
            <Col span={12}>
              <Statistic title="图片" value={90} suffix="张" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title="总点赞数" value={4561} suffix="次" />
            </Col>
            <Col span={12}>
              <Statistic title="总下载数" value={9537} suffix="次" />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="宋词">
          <Row style={{ marginBottom: 24 }}>
            <Statistic title="数据量" value={25720} suffix="条" />
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title="词作者数量" value={1368} suffix="人" />
            </Col>
            <Col span={12}>
              <Statistic title="词数量" value={21050} suffix="首" />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="一言">
          <Row style={{ marginBottom: 24 }}>
            <Statistic title="数据量" value={4521} suffix="条" />
          </Row>
          <Row>
            <Col span={12}>
              <Statistic title="尝试爬取数量" value={6500} suffix="次" />
            </Col>
            <Col span={12}>
              <Statistic title="分类" value={8} suffix="个" />
            </Col>
          </Row>
        </Card>
      </Col>
    </Module>
  );
};

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
      </Content>
    </Layout>
  );
};
