import { Rose } from '@ant-design/charts';
import { Card, Col, Empty, Input, InputNumber, Row, Statistic } from 'antd';
import React from 'react';
import Section from './Section';
const { Search } = Input;

export default () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其它',
      value: 5,
    },
  ];
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '句子的分类',
    },
    description: {
      visible: true,
      text: '各种句子所属类别的统计',
    },
    radius: 0.8,
    data,
    radiusField: 'value',
    categoryField: 'type',
    colorField: 'type',
    label: {
      visible: true,
      type: 'outer',
      content: (text) => text.value,
    },
  };

  function onChange(value) {
    console.log('changed', value);
  }

  return (
    <Section title="一言" subtitle="Sentences">
      <Col span={24} md={24} xl={12}>
        <Card title="分类统计">
          <Row style={{ marginBottom: 24 }}>
            <Col span={18}>
              <Statistic title="最大的分类" value={'动画，1520 个句子'} />
            </Col>
            <Col span={6}>
              <Statistic title="句子总数" value={4218} suffix="个" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Rose {...config} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24} md={24} xl={12}>
        <Card title="查询句子">
          <Row style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Statistic title="根据句子的 ID 或者 Text" value={'进行查询'} />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <InputNumber
                size="large"
                min={1}
                max={10000}
                placeholder="ID"
                onChange={onChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={18}>
              <Search
                placeholder="Text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
          <Row
            gutter={[16, 0]}
            align="middle"
            justify="center"
            style={{ minHeight: 344 }}
          >
            <Col span={24} flex="auto">
              <Empty />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
