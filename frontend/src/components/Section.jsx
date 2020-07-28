import { PageHeader, Row } from 'antd';
import React from 'react';

export default ({ children, title, subtitle }) => {
  return (
    <>
      <Row
        align="top"
        gutter={[16, 16]}
        justify="start"
        style={{ maxWidth: 1200, width: '100%' }}
      >
        <PageHeader title={title} subTitle={subtitle} />
      </Row>
      <Row
        align="top"
        gutter={[16, 16]}
        justify="space-between"
        style={{ maxWidth: 1200, width: '100%' }}
      >
        {children}
      </Row>
    </>
  );
};
