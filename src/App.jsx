import React from "react";
import { Row, Col, Typography, Divider, Button } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import FieldList from "./components/FieldList";
import JSONPreview from "./components/JSONPreview";

const { Title } = Typography;

export default function App() {
  const methods = useForm({ defaultValues: { fields: [] } });

  return (
    <FormProvider {...methods}>
      <div style={{ padding: 24 }}>
        <Title level={2}>JSON Schema Builder</Title>
        <Divider />
        <Row gutter={24}>
          <Col span={14}>
            <FieldList nestIndex="" />
            <Button style={{ margin: '16px' }}>Submit</Button>
          </Col>
          <Col span={10}>
            <h3>Live JSON Preview</h3>
            <JSONPreview />
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
}
