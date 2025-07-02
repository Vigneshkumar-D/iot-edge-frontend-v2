import { Button, Checkbox, Form, Input, Radio } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const ShiftAllocationForm = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please input your emailid!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Phone Number"
      name="mobileNumber"
      rules={[{ required: true, message: "Please input your phone number!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Role"
      name="role"
      rules={[{ required: true, message: "Please input your role!" }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Confirm Password"
      name="password"
      rules={[
        { required: true, message: "Please input your confirm password!" },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Status"
      name="active"
      rules={[{ required: true, message: "Please input your status!" }]}
    >
      <Radio.Group
        block
        options={[
          { label: "Active", value: true },
          { label: "In-active", value: false },
        ]}
        defaultValue={true}
        optionType="button"
        buttonStyle="solid"
      />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default ShiftAllocationForm;
