import { Button, Checkbox, DatePicker, Form, Input, Radio } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const IOTGateWayForm = () => (
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
      label="Shift Name"
      name="shiftName"
      rules={[{ required: true, message: "Please input your shift name!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Start Time"
      name="startTime"
      rules={[{ required: true, message: "Please input your start time!" }]}
    >
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
    </Form.Item>

    <Form.Item
      label="End Time"
      name="endTime"
      rules={[{ required: true, message: "Please input your end time!" }]}
    >
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
    </Form.Item>
    <Form.Item
      label="Total Duration"
      name="totalDuration"
      rules={[{ required: true, message: "Please input your total duration!" }]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Shift Status"
      name="ShiftStatus"
      rules={[{ required: true, message: "Please input your Shift status!" }]}
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
export default IOTGateWayForm;
