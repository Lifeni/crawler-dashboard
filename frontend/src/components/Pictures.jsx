import { Area } from '@ant-design/charts';
import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import React, { useContext } from 'react';
import { DataContext } from '../pages/index';
import Section from './Section';

export default () => {
  const data = useContext(DataContext).pictures;

  if (data) {
    const list = data['num_data'].sort((a, b) => {
      const AMonth = Number(a['picture_date'].split('月')[0]);
      const ADay = Number(a['picture_date'].split('月')[1].split('日')[0]);
      const BMonth = Number(b['picture_date'].split('月')[0]);
      const BDay = Number(b['picture_date'].split('月')[1].split('日')[0]);
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

    const likeConfig = {
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
      data: list,
      xField: 'picture_date',
      yField: 'picture_like',
      smooth: true,
      meta: {
        picture_date: {
          alias: '时间',
        },
        picture_like: {
          alias: '点赞数量',
        },
      },
      yAxis: {
        min: 1200,
        max: 2400,
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
    };

    const downloadConfig = {
      title: {
        visible: true,
        text: '下载数',
      },
      description: {
        visible: true,
        text: '统计 90 天内图片下载数量变化趋势',
      },
      padding: 'auto',
      forceFit: true,
      data: data['num_data'],
      xField: 'picture_date',
      yField: 'picture_download',
      smooth: true,
      meta: {
        picture_date: {
          alias: '时间',
        },
        picture_download: {
          alias: '下载数量',
        },
      },
      yAxis: {
        min: 4500,
        max: 8500,
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
    };

    return (
      <Section title="必应壁纸" subtitle="Pictures">
        <Col span={24}>
          <Card title="有关点赞数量的统计">
            <Row style={{ marginBottom: 24 }} gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <img
                      src={
                        'https://test.lifeni.life' +
                        data['max_like_count_image_url']
                      }
                      alt={data['max_like_count_image_text']}
                      style={{ width: '100%', borderRadius: 2 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="点赞最多的图片"
                      value={data['max_like_count_image_text']}
                      style={{ marginBottom: 24, paddingRight: 24 }}
                      suffix={data['max_like_count_image_date']}
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
            <Row>
              <Col span={24}>
                <Area {...likeConfig} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="有关下载数量的统计">
            <Row style={{ marginBottom: 24 }} gutter={[24, 24]}>
              <Col span={16}>
                <Row gutter={[24, 0]}>
                  <Col span={12}>
                    <img
                      src={
                        'https://test.lifeni.life' +
                        data['max_download_count_image_url']
                      }
                      alt={data['max_download_count_image_text']}
                      style={{ width: '100%', borderRadius: 2 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="下载最多的图片"
                      value={data['max_download_count_image_text']}
                      suffix={data['max_download_count_image_date']}
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
            <Row>
              <Col span={24}>
                <Area {...downloadConfig} />
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
        <Card title="有关点赞数量的统计">
          <Row style={{ marginBottom: 24 }} gutter={[24, 24]}>
            <Col span={16}>
              <Row gutter={[24, 0]}>
                <Skeleton />
              </Row>
            </Col>
            <Col span={8}>
              <Row style={{ marginBottom: 24 }}>
                <Skeleton />
              </Row>
              <Row>
                <Skeleton />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Skeleton />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="有关下载数量的统计">
          <Row style={{ marginBottom: 24 }} gutter={[24, 24]}>
            <Col span={16}>
              <Row gutter={[24, 0]}>
                <Skeleton />
              </Row>
            </Col>
            <Col span={8}>
              <Row style={{ marginBottom: 24 }}>
                <Skeleton />
              </Row>
              <Row>
                <Skeleton />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Skeleton />
            </Col>
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
