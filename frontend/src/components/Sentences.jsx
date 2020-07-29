import { Donut } from '@ant-design/charts';
import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import React, { useContext } from 'react';
import { DataContext } from '../pages/index';
import Section from './Section';

export default () => {
  const data = useContext(DataContext).sentences;

  if (data) {
    const config = {
      title: {
        visible: true,
        text: '句子的分类',
      },
      description: {
        visible: true,
        text: '各种句子所属类别的统计',
      },
      pixelRatio: 2,
      meta: {
        sentence_category: {
          alias: '分类',
        },
        sentence_category__count: {
          alias: '分类下的句子数量',
        },
      },
      radius: 1,
      data: data['sentence_data'],
      angleField: 'sentence_category__count',
      colorField: 'sentence_category',
      label: {
        visible: true,
        type: 'outer-center',
        formatter: (text, item) =>
          `${item._origin.sentence_category}: ${item._origin.sentence_category__count}`,
      },
    };

    return (
      <Section title="一言" subtitle="Sentences">
        <Col span={24} md={24}>
          <Card title="统计数据">
            <Row style={{ paddingBottom: 24 }} gutter={[48, 24]}>
              <Col span={14}>
                <Donut {...config} />
              </Col>
              <Col span={10}>
                <Row gutter={[24, 24]}>
                  <Col span={16}>
                    <Statistic
                      title="最大的分类"
                      value={
                        data['sentence_data'][0]['sentence_category'] +
                        '，' +
                        data['sentence_data'][0]['sentence_category__count'] +
                        ' 个句子'
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="句子总数"
                      value={data['data_count']}
                      suffix="个"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Statistic
                      title="最小的分类"
                      value={
                        data['sentence_data'][data['sentence_data'].length - 1][
                          'sentence_category'
                        ] +
                        '，' +
                        data['sentence_data'][data['sentence_data'].length - 1][
                          'sentence_category__count'
                        ] +
                        ' 个句子'
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Section>
    );
  }
  return (
    <Section title="一言" subtitle="Sentences">
      <Col span={24} md={24}>
        <Card title="统计数据">
          <Row style={{ marginBottom: 24 }}>
            <Col span={14} style={{ paddingRight: 48 }}>
              <Skeleton />
            </Col>
            <Col span={10}>
              <Skeleton />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
