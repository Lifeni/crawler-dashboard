import { Column, WordCloud } from '@ant-design/charts';
import { Card, Col, Row, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import Section from './Section';

const ColumnBlock = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/qRZUAgaEYC/sales.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    title: {
      visible: true,
      text: '词作者留下的词的数量',
    },
    description: {
      visible: true,
      text: '共有 1358 位词作者，留下了 21050 首词',
    },
    forceFit: true,
    data,
    padding: 'auto',
    xField: '城市',
    xAxis: {
      visible: true,
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      visible: true,
      formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
    },
    yField: '销售额',
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0,
          end: 0.3,
        },
      },
    ],
  };

  return <Column {...config} />;
};

const WordCountBlock = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/fLPUlSQCRI/word-cloud.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };

  const config = getWordCloudConfig(data);
  function getDataList(data) {
    const list = [];
    data.forEach(d => {
      list.push({
        word: d.name,
        weight: d.value,
        id: list.length,
      });
    });
    return list;
  }

  function getWordCloudConfig(data) {
    return {
      data: getDataList(data),
      maskImage:
        'https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*07tdTIOmvlYAAAAAAAAAAABkARQnAQ',
      wordStyle: {
        rotateRatio: 0.5,
        rotationSteps: 360,
        fontSize: [50, 150],
        fontFamily: '"思源宋体 CN", "Source Han Serif CN", Serif',
        color: () => getRandomColor(),
        active: {
          shadowColor: '#333333',
          shadowBlur: 10,
        },
        gridSize: 8,
      },
      shape: 'square',
      shuffle: true,
      backgroundColor: '#fff',
      tooltip: {
        visible: true,
        offset: 20,
      },
      selected: -1,
    };
  }
  function getRandomColor() {
    const arr = [
      '#5B8FF9',
      '#5AD8A6',
      '#5D7092',
      '#F6BD16',
      '#E8684A',
      '#6DC8EC',
      '#9270CA',
      '#FF9D4D',
      '#269A99',
      '#FF99C3',
    ];
    return arr[Math.floor(Math.random() * (arr.length - 1))];
  }
  return <WordCloud {...config} className="word-count" />;
};

export default () => {
  return (
    <Section title="宋词" subtitle="Poems">
      <Col span={24}>
        <Card title="词作者">
          <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
            <Col xl={12} lg={24} sm={24} span={24}>
              <Statistic
                title="词最多的作者（不包含无名氏）"
                value={'辛弃疾，486 首词'}
              />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="词作者数量" value={1354} suffix="人" />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="平均作词数" value={54} suffix="首" />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="只留下 1 首词" value={854} suffix="人" />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="无名氏的词" value={6468} suffix="首" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ColumnBlock />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="词牌名">
          <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
            <Col xl={9} lg={24} sm={24} span={24}>
              <Statistic title="使用最多的词牌名" value={'蝶恋花，486 首词'} />
            </Col>
            <Col xl={9} lg={24} sm={24} span={24}>
              <Statistic title="使用最少的词牌名" value={'醉蓬莱，5 首词'} />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="词牌数量" value={243} suffix="个" />
            </Col>
            <Col xl={3} lg={6} sm={12} span={12}>
              <Statistic title="词牌平均词数" value={524} suffix="首" />
            </Col>
          </Row>
          <Row style={{ marginBottom: 24 }}>
            <Col span={24}>
              <WordCountBlock />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
