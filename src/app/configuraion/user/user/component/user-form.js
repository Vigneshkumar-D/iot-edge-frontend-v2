import { Button, Flex, Form, Input, message, TreeSelect, Upload } from "antd";
import { useEffect, useState } from "react";
// import { fetchLocations } from "../../../../service/customService/configuration/firm/locationService";
import { UploadOutlined } from "@ant-design/icons";
import { fetchLocations } from "../../../firm/location/service/locationService";

const convertTreeData = (nodes) =>
  nodes.map((node) => ({
    title: node.locationName,
    value: node.id,
    key: node.id,
    children: node.children ? convertTreeData(node.children) : undefined,
  }));

const UserForm = (props) => {
  const [form] = Form.useForm();
  const [locationData, setLocationData] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
      setProfileImage(reader.result.split(",")[1]); // Only base64 content
    };
    reader.readAsDataURL(file);
    return false; // prevent auto upload
  };

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
      {/* <Form.Item
        label="Name"
        name="username"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mobile Number"
        name="mobileNumber"
        rules={[{ required: true, message: "Please input mobile number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input password!" }]}
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
      <Flex justify="end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex> */}
      <Form.Item
        label="Name"
        name="username"
        rules={[{ required: true, message: "Please input name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input email!" },
          { type: "email", message: "Invalid email!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mobile Number"
        name="mobileNumber"
        rules={[{ required: true, message: "Please input mobile number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Role" name={["role", "id"]}>
        <TreeSelect
          treeData={convertTreeData(props.roleData || [])}
          placeholder="Select Role"
          allowClear
          treeDefaultExpandAll
        />
      </Form.Item>

      <Form.Item label="Profile Image">
        <Upload
          accept="image/*"
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{
              marginTop: 10,
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
      </Form.Item>

      <Flex justify="end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default UserForm;
