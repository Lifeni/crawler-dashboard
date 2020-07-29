import { Column, WordCloud } from '@ant-design/charts';
import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import Section from './Section';
import { DataContext } from '../pages/index';

const ColumnBlock = () => {
  const data = useContext(DataContext).poems;
  if (data) {
    const config = {
      title: {
        visible: true,
        text: '词作者留下的词的数量',
      },
      description: {
        visible: true,
        text: `共有 ${data['author_count']} 位词作者，留下了 ${data['data_count']} 首词`,
      },
      forceFit: true,
      data: data['author_poem_data'],
      padding: 'auto',
      meta: {
        poem_author: {
          alias: '词作者',
        },
        poem_author__count: {
          alias: '词数量',
        },
      },
      xField: 'poem_author',
      xAxis: {
        visible: true,
        label: {
          visible: true,
          autoHide: true,
        },
      },
      yAxis: {
        visible: true,
      },
      yField: 'poem_author__count',
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 0.03,
          },
        },
      ],
    };

    return <Column {...config} />;
  }
  return <Skeleton />;
};

const WordCountBlock = () => {
  const data = useContext(DataContext).poems;
  if (data) {
    let num = 0;
    const list = data['poem_title_data'].map(obj => {
      num = num + 1;
      return {
        word: obj['poem_title'],
        weight: obj['poem_title__count'],
        id: num,
      };
    });

    const config = {
      data: list,
      wordStyle: {
        rotateRatio: 0,
        rotationSteps: 0,
        fontSize: [25, 200],
        fontWeight: '700',
        fontFamily: '"思源宋体 CN", "Source Han Serif CN", Serif',
        color: () => getRandomColor(),
        active: {
          shadowColor: '#333333',
          shadowBlur: 10,
        },
        gridSize: 8,
      },
      shape: 'square',
      forceFit: true,
      shuffle: true,
      backgroundColor: '#fff',
      tooltip: {
        visible: true,
        offset: 20,
      },
      selected: -1,
    };
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
  }
  return <Skeleton />;
};

export default () => {
  const data = useContext(DataContext).poems;

  if (data) {
    return (
      <Section title="宋词" subtitle="Poems">
        <Col span={24}>
          <Card title="词作者">
            <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
              <Col xl={12} lg={24} sm={24} span={24}>
                <Statistic
                  title="词最多的作者（不包含无名氏）"
                  value={
                    data['author_poem_data'][1]['poem_author'] +
                    '，' +
                    data['author_poem_data'][1]['poem_author__count'] +
                    ' 首词'
                  }
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="词作者数量"
                  value={data['author_count']}
                  suffix="人"
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="平均作词数"
                  value={data['author_avg_poem_count'].toFixed(2)}
                  suffix="首"
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="只留下 1 首词"
                  value={data['poem_count_1']}
                  suffix="人"
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="无名氏的词"
                  value={data['author_poem_data'][0]['poem_author__count']}
                  suffix="首"
                />
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
                <Statistic
                  title="使用最多的词牌名"
                  value={
                    data['poem_title_data'][0]['poem_title'] +
                    '，' +
                    data['poem_title_data'][0]['poem_title__count'] +
                    ' 首词'
                  }
                />
              </Col>
              <Col xl={9} lg={24} sm={24} span={24}>
                <Statistic
                  title="使用最少的词牌名之一"
                  value={
                    data['poem_title_data'][data['poem_title_data'].length - 1][
                      'poem_title'
                    ] +
                    '，' +
                    data['poem_title_data'][data['poem_title_data'].length - 1][
                      'poem_title__count'
                    ] +
                    ' 首词'
                  }
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="词牌数量"
                  value={data['title_count']}
                  suffix="个"
                />
              </Col>
              <Col xl={3} lg={6} sm={12} span={12}>
                <Statistic
                  title="词牌平均词数"
                  value={data['poem_avg_title_count'].toFixed(2)}
                  suffix="首"
                />
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
  }
  return (
    <Section title="宋词" subtitle="Poems">
      <Col span={24}>
        <Card title="词作者">
          <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
            <Skeleton />
          </Row>
          <Row>
            <Skeleton />
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="词牌名">
          <Row style={{ marginBottom: 24 }} gutter={[0, 24]}>
            <Skeleton />
          </Row>
          <Row style={{ marginBottom: 24 }}>
            <Skeleton />
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
