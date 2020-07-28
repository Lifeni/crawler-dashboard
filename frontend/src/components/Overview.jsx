import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import Section from './Section';

export default () => {
  return (
    <Section title="概览" subtitle="Overview">
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
    </Section>
  );
};
