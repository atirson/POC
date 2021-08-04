import { Form, Input, Button, Checkbox, Col, Row, Typography } from 'antd';
import axios from 'axios';
import './root.component.less';
import './root.component.scss';

export default function Root(props) {
  const onFinish = async (values: any) => {

    const res = await axios.get(`https://610ab78e52d56400176aff4c.mockapi.io/login/${values.email}`)
    if (res.status === 200) {
      const event = new CustomEvent("login", { detail: { ...res.data } });
      window.dispatchEvent(event);
      console.log('Success:', values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row className="row">
      <Col span={12} className='right'>
        <img src="https://corretor-main-dev.pottencial.com.br/093105277d0d798a1dea97367e47280b.jpg" alt="logo" aria-label="Pottencial" />
      </Col>
      <Col span={12}>
        <Form
          name="basic"
          wrapperCol={{ offset: 3, span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="form"
        >

          <Form.Item wrapperCol={{ offset: 3, span: 18 }}>
            <Typography.Title className="title">PORTAL DO CORRETOR</Typography.Title>
            <Typography.Title className="subtitle">Seja Bem-vindo(a)!</Typography.Title>
            <p>É novo na Pottencial? Cadastre-se</p>
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Por favor informe seu email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3, span: 18 }}>
            <Button shape="round" block type="primary" htmlType="submit">
              Avançar
            </Button>
          </Form.Item>
        </Form>

      </Col>
    </Row>
  );
}
