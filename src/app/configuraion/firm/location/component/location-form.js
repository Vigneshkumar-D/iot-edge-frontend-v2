// import { Button, Flex, Form, Input, TreeSelect } from "antd";
// import { useEffect } from "react";

// const convertTreeData = (nodes) =>
//   nodes.map((node) => ({
//     title: node.locationName,
//     value: node.id,
//     key: node.id,
//     children: node.children ? convertTreeData(node.children) : undefined,
//   }));

// const LocationForm = (props) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (props.editData) {
//       console.log("hit", props.editData);
//       form.setFieldsValue({
//         ...props.editData,
//         parent: props.editData.parent ? { id: props.editData.parent.id } : undefined,
//       });
//     }
//   }, [props.editData, form]);

//   return (
//     <Form
//       form={form}
//       name="basic"
//       labelCol={{ span: 8 }}
//       wrapperCol={{ span: 16 }}
//       style={{ maxWidth: 600 }}
//       initialValues={{ remember: true }}
//       onFinish={(data) => props.saveData(data)}
//       onFinishFailed={(err) => console.log("Failed:", err)}
//       autoComplete="off"
//     >
//       <Form.Item
//         label="Location Name"
//         name="locationName"
//         rules={[{ required: true, message: "Please input your location name!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Category"
//         name="category"
//         rules={[{ required: true, message: "Please input your category!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Latitude"
//         name="latitude"
//         rules={[{ required: true, message: "Please input your latitude!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Longitude"
//         name="longitude"
//         rules={[{ required: true, message: "Please input your longitude!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item label="Parent Location" name={["parent", "id"]}>
//         <TreeSelect
//           treeData={convertTreeData(props.locationData)}
//           placeholder="Select Parent Location"
//           allowClear
//           treeDefaultExpandAll
//         />
//       </Form.Item>
//       <Flex justify="end">
//         <Button type="primary" htmlType="submit">
//           Submit
//         </Button>
//       </Flex>
//     </Form>
//   );
// };

// export default LocationForm;

import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  TreeSelect,
  Tooltip,
  Row,
  Col,
} from "antd";
import {
  EnvironmentOutlined,
  GlobalOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const convertTreeData = (nodes) =>
  nodes.map((node) => ({
    title: node.locationName,
    value: node.id,
    key: node.id,
    children: node.children ? convertTreeData(node.children) : undefined,
  }));

const LocationForm = ({ editData, saveData, locationData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        parent: editData.parent ? { id: editData.parent.id } : undefined,
      });
    }
  }, [editData, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: 600 }}
      onFinish={saveData}
      onFinishFailed={(err) => console.log("Failed:", err)}
      autoComplete="off"
    >
      <Row gutter={[20,10]}>
        <Col span={12}>
          <Card
            size="small"
            title={
              <>
                <GlobalOutlined /> Location Info
              </>
            }
          >
            <Form.Item
              label="Location Name"
              name="locationName"
              rules={[
                { required: true, message: "Please input your location name!" },
              ]}
            >
              <Input placeholder="e.g., San Francisco" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Please input your category!" },
              ]}
            >
              <Input placeholder="e.g., City, State, Country" />
            </Form.Item>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title={
              <>
                <EnvironmentOutlined /> Coordinates
              </>
            }
          >
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[
                { required: true, message: "Please input your latitude!" },
              ]}
            >
              <Input type="number" placeholder="e.g., 37.7749" />
            </Form.Item>

            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[
                { required: true, message: "Please input your longitude!" },
              ]}
            >
              <Input type="number" placeholder="e.g., -122.4194" />
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card
        size="small"
        title={
          <>
            <BranchesOutlined /> Parent Location
          </>
        }
      >
        <Form.Item label="Parent Location" name={["parent", "id"]}>
          <TreeSelect
            treeData={convertTreeData(locationData)}
            placeholder="Select Parent Location"
            allowClear
            treeDefaultExpandAll
            showSearch
            filterTreeNode={(input, node) =>
              (node.title || "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      </Card>

      <Flex justify="end" style={{ marginTop: 20 }}>
        <Button htmlType="submit" className="custom-ant-btn">
          {editData ? "Update" : "Add"} Location
        </Button>
      </Flex>
    </Form>
  );
};

export default LocationForm;
