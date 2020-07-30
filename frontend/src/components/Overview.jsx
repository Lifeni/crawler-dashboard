import { Card, Col, Row, Statistic, Skeleton } from 'antd';
import React, { useContext } from 'react';
import Section from './Section';
import { DataContext } from '../pages/index';

export default () => {
  const data = useContext(DataContext).overview;
  if (data) {
    return (
      <Section title="概览" subtitle="Overview">
        <Col span={24} sm={24} md={12} xl={6}>
          <Card title="所有数据">
            <Row style={{ marginBottom: 24 }}>
              <Statistic
                title="数据总量"
                value={data['total_data_count']}
                suffix="条"
              />
            </Row>
            <Row>
              <Col span={12}>
                <Statistic
                  title="数据类别"
                  value={data['category_count']}
                  suffix="种"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="数据表"
                  value={data['database_table_count']}
                  suffix="个"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} xl={6}>
          <Card title="必应壁纸">
            <Row style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Statistic
                  title="数据量"
                  value={data['pictures_data_count']}
                  suffix="条"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="总点赞数"
                  value={data['pictures_total_like_count']}
                  suffix="次"
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Statistic
                  title="图片"
                  value={data['pictures_image_count']}
                  suffix="张"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="总下载数"
                  value={data['pictures_total_download_count']}
                  suffix="次"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} xl={6}>
          <Card title="宋词">
            <Row style={{ marginBottom: 24 }}>
              <Statistic
                title="数据量"
                value={data['poems_data_count']}
                suffix="条"
              />
            </Row>
            <Row>
              <Col span={12}>
                <Statistic
                  title="词作者数量"
                  value={data['poems_author_count']}
                  suffix="人"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="词数量"
                  value={data['poems_poem_count']}
                  suffix="首"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24} sm={24} md={12} xl={6}>
          <Card title="一言">
            <Row style={{ marginBottom: 24 }}>
              <Statistic
                title="数据量"
                value={data['sentences_data_count']}
                suffix="条"
              />
            </Row>
            <Row>
              <Col span={12}>
                <Statistic
                  title="尝试爬取数量"
                  value={data['sentences_try_count']}
                  suffix="次"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="分类"
                  value={data['sentences_category_count']}
                  suffix="个"
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Section>
    );
  }
  return (
    <Section title="概览" subtitle="Overview">
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="所有数据">
          <Row style={{ marginBottom: 24 }}>
            <Skeleton />
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="必应壁纸">
          <Row style={{ marginBottom: 24 }}>
            <Skeleton />
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="宋词">
          <Row style={{ marginBottom: 24 }}>
            <Skeleton />
          </Row>
        </Card>
      </Col>
      <Col span={24} sm={24} md={12} xl={6}>
        <Card title="一言">
          <Row style={{ marginBottom: 24 }}>
            <Skeleton />
          </Row>
        </Card>
      </Col>
    </Section>
  );
};
