import { Donut } from '@ant-design/charts';
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Skeleton,
  Statistic,
  Typography,
  message,
} from 'antd';
import React, { useContext } from 'react';
import { DataContext } from '../pages/index';
import Section from './Section';

export default () => {
  const data = useContext(DataContext).sentences;
  const getRandomSentence = () => {
    message.loading({ content: 'Loading...', key: 'sentence' });
    fetch('http://localhost:8001/sentences/random/')
      .then(response => response.json())
      .then(data => {
        message.success({
          content: 'Loaded!',
          key: 'sentence',
          duration: 2,
        });
        Modal.info({
          icon: null,
          centered: true,
          content: (
            <div>
              <Typography.Paragraph>
                # {data.id} / {data.category}
              </Typography.Paragraph>
              <Typography.Title
                style={{
                  fontSize: '1.25rem',
                  margin: '1rem 0',
                  fontWeight: 'normal',
                }}
              >
                {data.text}
              </Typography.Title>
              <Typography.Paragraph style={{ margin: '1rem 0 0 0' }}>
                {data.from} {data.from_who ? '/' : ''} {data.from_who}
              </Typography.Paragraph>
            </div>
          ),
          onOk() {},
        });
      });
  };

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
      events: {
        onPlotClick: e => {
          try {
            const d = e.target.cfg.element.data;
            if (d) {
              Modal.info({
                title: '分类：' + d.sentence_category,
                centered: true,
                icon: null,
                content: (
                  <div>
                    <Typography.Title
                      style={{
                        fontSize: '1.25rem',
                        margin: '1rem 0',
                        fontWeight: 'normal',
                      }}
                    >
                      {d.sentence_category_description}
                    </Typography.Title>
                    <Typography.Paragraph style={{ margin: '1rem 0 0 0' }}>
                      {d.sentence_category__count} 个句子
                    </Typography.Paragraph>
                  </div>
                ),
                onOk() {},
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    };

    return (
      <Section title="一言" subtitle="Sentences">
        <Col span={24} md={24}>
          <Card title="统计数据">
            <Row gutter={[48, 24]}>
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
                <Row gutter={[24, 24]}>
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
                <Row gutter={[24, 24]}>
                  <Col span={24} style={{ padding: '0 12px' }}>
                    <Button
                      type="primary"
                      size="large"
                      onClick={getRandomSentence}
                      style={{ marginTop: 180 }}
                    >
                      随机获取一个句子
                    </Button>
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
