import { Area } from '@ant-design/charts';
import {
  Card,
  Col,
  Modal,
  Row,
  Statistic,
  Typography,
  Skeleton,
  message,
} from 'antd';
import React, { useContext } from 'react';
import { DataContext } from '../pages/index';
import Section from './Section';

export default () => {
  const data = useContext(DataContext).pictures;

  if (data) {
    const likeList = data['num_data']
      .map(obj => {
        return {
          id: obj['id'],
          date: obj['picture_date'],
          type: '点赞数量',
          value: obj['picture_like'],
        };
      })
      .sort((a, b) => {
        const AMonth = Number(a['date'].split('月')[0]);
        const ADay = Number(a['date'].split('月')[1].split('日')[0]);
        const BMonth = Number(b['date'].split('月')[0]);
        const BDay = Number(b['date'].split('月')[1].split('日')[0]);
        if (AMonth > BMonth) {
          return 1;
        } else if (AMonth === BMonth) {
          if (ADay > BDay) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      });
    const downloadList = data['num_data']
      .map(obj => {
        return {
          id: obj['id'],
          date: obj['picture_date'],
          type: '下载数量',
          value: obj['picture_download'],
        };
      })
      .sort((a, b) => {
        const AMonth = Number(a['date'].split('月')[0]);
        const ADay = Number(a['date'].split('月')[1].split('日')[0]);
        const BMonth = Number(b['date'].split('月')[0]);
        const BDay = Number(b['date'].split('月')[1].split('日')[0]);
        if (AMonth > BMonth) {
          return 1;
        } else if (AMonth === BMonth) {
          if (ADay > BDay) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      });

    const list = [...likeList, ...downloadList];
    const config = {
      title: {
        visible: true,
        text: '点赞和下载数',
      },
      description: {
        visible: true,
        text: '统计 90 天内图片点赞和下载数量变化趋势',
      },
      padding: 'auto',
      forceFit: true,
      data: list,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      smooth: true,
      meta: {
        date: {
          alias: '时间',
        },
        like: {
          alias: '点赞数量',
        },
        download: {
          alias: '下载数量',
        },
      },
      yAxis: {
        min: 1200,
        max: 8500,
      },
      legend: {
        visible: true,
        position: 'top-right',
      },
      point: {
        visible: true,
        shape: 'circle',
        size: 6,
        style: {
          lineWidth: 2,
          stroke: '#fff',
          fillOpacity: 0.8,
        },
      },
      interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 0.3,
          },
        },
      ],
      events: {
        onPointClick: e => {
          try {
            const d = e.data;
            if (d) {
              message.loading({ content: 'Loading...', key: 'picture' });
              fetch('http://localhost:8001/pictures/' + d.id)
                .then(response => response.json())
                .then(data => {
                  message.success({
                    content: 'Loaded!',
                    key: 'picture',
                    duration: 2,
                  });
                  Modal.info({
                    title: d.date,
                    centered: true,
                    width: 600,
                    icon: null,
                    content: (
                      <div>
                        <img
                          src={'https://test.lifeni.life' + data.url}
                          alt={data.text}
                          style={{
                            width: '100%',
                            borderRadius: 2,
                            margin: '1rem 0 0 0',
                          }}
                        />
                        <Typography.Paragraph
                          style={{ margin: '2rem 0 1rem 0' }}
                        >
                          {data.text}
                        </Typography.Paragraph>
                      </div>
                    ),
                    onOk() {},
                  });
                });
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    };

    return (
      <Section title="必应壁纸" subtitle="Pictures">
        <Col span={24}>
          <Card title="数据统计">
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 0]}>
                  <Col span={10}>
                    <img
                      src={
                        'https://test.lifeni.life' +
                        data['max_like_count_image_url']
                      }
                      alt={data['max_like_count_image_text']}
                      style={{ width: '100%', borderRadius: 2 }}
                    />
                  </Col>
                  <Col span={14}>
                    <Statistic
                      title={data['max_like_count_image_date']}
                      value="点赞最多的图片"
                      style={{ marginBottom: 24, paddingRight: 24 }}
                      suffix={data['max_like_count_image_text']}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row style={{ marginBottom: 24 }}>
                  <Col span={12}>
                    <Statistic
                      title="总点赞量"
                      value={data['total_like_count']}
                      suffix="次"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="平均点赞量"
                      value={data['avg_like_count'].toFixed(2)}
                      suffix="次"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Statistic
                      title="点赞最多数量"
                      value={data['max_like_count']}
                      suffix="次"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="点赞最少数量"
                      value={data['min_like_count']}
                      suffix="次"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 0]}>
                  <Col span={10}>
                    <img
                      src={
                        'https://test.lifeni.life' +
                        data['max_download_count_image_url']
                      }
                      alt={data['max_download_count_image_text']}
                      style={{ width: '100%', borderRadius: 2 }}
                    />
                  </Col>
                  <Col span={14}>
                    <Statistic
                      title={data['max_download_count_image_date']}
                      value="下载最多的图片"
                      suffix={data['max_download_count_image_text']}
                      style={{ paddingRight: 24, marginBottom: 24 }}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <Row style={{ marginBottom: 24 }}>
                  <Col span={12}>
                    <Statistic
                      title="总下载量"
                      value={data['total_download_count']}
                      suffix="次"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="平均下载量"
                      value={data['avg_download_count'].toFixed(2)}
                      suffix="次"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Statistic
                      title="下载最多数量"
                      value={data['max_download_count']}
                      suffix="次"
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="下载最少数量"
                      value={data['min_download_count']}
                      suffix="次"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Area {...config} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Section>
    );
  }

  return (
    <Section title="必应壁纸" subtitle="Pictures">
      <Col span={24}>
        <Card title="数据统计">
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <Skeleton />
            </Col>
            <Col span={8}>
              <Skeleton />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <Skeleton />
            </Col>
            <Col span={8}>
              <Skeleton />
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Skeleton />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
