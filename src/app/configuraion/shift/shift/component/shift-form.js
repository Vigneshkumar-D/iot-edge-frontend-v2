import { Button, Flex, Form, Input, message, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { fetchLocations } from "../../../firm/location/service/locationService";

const convertTreeData = (nodes) =>
  nodes.map((node) => ({
    title: node.locationName,
    value: node.id,
    key: node.id,
    children: node.children ? convertTreeData(node.children) : undefined,
  }));

const ShiftForm = (props) => {
  const [form] = Form.useForm();
  const [locationData, setLocationData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetchLocations();

      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch locations");
        return;
      }

      const dataWithKeys = res.data.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setLocationData(dataWithKeys);
    } catch (err) {
      message.error("Network error while fetching locations");
    }
  };

  useEffect(() => {
    if (props.editData) {
      console.log("hit", props.editData);
      form.setFieldsValue({
        ...props.editData,
        parent: props.editData.parent
          ? { id: props.editData.parent.id }
          : undefined,
      });
    }
    fetchData();
  }, [props.editData, form]);

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={(data) => props.saveData(data)}
      onFinishFailed={(err) => console.log("Failed:", err)}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Location" name={["location", "id"]}>
        <TreeSelect
          treeData={convertTreeData(locationData)}
          placeholder="Select Location"
          allowClear
          treeDefaultExpandAll
        />
      </Form.Item>
      <Form.Item label="Parent" name={["parent", "id"]}>
        <TreeSelect
          treeData={convertTreeData(props.firmData)}
          placeholder="Select Parent"
          allowClear
          treeDefaultExpandAll
        />
      </Form.Item>
      <Flex justify="end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default ShiftForm;
