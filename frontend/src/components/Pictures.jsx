import { Line } from '@ant-design/charts';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import Section from './Section';

export default () => {
  const data = [
    {
      time: '1991',
      count: 3,
    },
    {
      time: '1992',
      count: 4,
    },
    {
      time: '1993',
      count: 3.5,
    },
    {
      time: '1994',
      count: 5,
    },
    {
      time: '1995',
      count: 4.9,
    },
    {
      time: '1996',
      count: 6,
    },
    {
      time: '1997',
      count: 7,
    },
    {
      time: '1998',
      count: 9,
    },
    {
      time: '1999',
      count: 13,
    },
  ];
  const config = {
    title: {
      visible: true,
      text: '点赞数',
    },
    description: {
      visible: true,
      text: '统计 90 天内图片点赞数量变化趋势',
    },
    padding: 'auto',
    forceFit: true,
    data,
    xField: 'time',
    yField: 'count',
    smooth: true,
  };

  return (
    <Section title="必应壁纸" subtitle="Pictures">
      <Col span={24} md={24} xl={12}>
        <Card title="有关点赞数量的统计">
          <Row style={{ marginBottom: 24 }}>
            <Col span={12}>点赞最多的图片</Col>
            <Col span={12}>
              <Row style={{ marginBottom: 24 }}>
                <Col span={12}>
                  <Statistic title="总点赞量" value={9775} suffix="个" />
                </Col>
                <Col span={12}>
                  <Statistic title="平均点赞量" value={421} suffix="个" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Statistic title="点赞最多数量" value={783} suffix="个" />
                </Col>
                <Col span={12}>
                  <Statistic title="点赞最少数量" value={54} suffix="个" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Line {...config} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} md={24} xl={12}>
        <Card title="有关下载数量的统计">
          <Row style={{ marginBottom: 24 }}>
            <Col span={12}>下载最多的图片</Col>
            <Col span={12}>
              <Row style={{ marginBottom: 24 }}>
                <Col span={12}>
                  <Statistic title="总下载量" value={9775} suffix="个" />
                </Col>
                <Col span={12}>
                  <Statistic title="平均下载量" value={421} suffix="个" />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Statistic title="下载最多数量" value={783} suffix="个" />
                </Col>
                <Col span={12}>
                  <Statistic title="下载最少数量" value={54} suffix="个" />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Line {...config} />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
