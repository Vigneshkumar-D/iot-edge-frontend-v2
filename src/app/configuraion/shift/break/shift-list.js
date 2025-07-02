import { useEffect, useRef, useState } from "react";
import { Button, Table, Flex, Modal, Tooltip, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import FirmForm from "./firm-form";
import {
  fetchFirm,
  postFirm,
  putFirm,
  deleteFirm,
} from "../../firm/firm/service/firmService";

function buildTree(data) {
  const nodeMap = {};
  const tree = [];

  // Step 1: Add all nodes to a map
  data.forEach((item) => {
    nodeMap[item.id] = { ...item, key: item.id, children: [] };
  });

  // Step 2: Link children to their parent
  data.forEach((item) => {
    if (item.parent && item.parent.id) {
      const parentNode = nodeMap[item.parent.id];
      if (parentNode) {
        parentNode.children.push(nodeMap[item.id]);
      }
    } else {
      tree.push(nodeMap[item.id]); // root node
    }
  });

  return tree;
}

const Firm = () => {
  const [firmData, setFirmData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const searchInput = useRef(null);

  const fetchData = async () => {
    try {
      const res = await fetchFirm();

      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch firms");
        return;
      }

      const dataWithKeys = res.data.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setFirmData(dataWithKeys);
    } catch (err) {
      message.error("Network error while fetching firms");
    }
  };

  const saveData = async (props) => {
    try {
      let res;
      if (editData) {
        res = await putFirm(props, editData.id);
      } else {
        res = await postFirm(props);
      }

      if (!res.data.success) {
        message.error(res.data.message || "Failed to save data");
        return;
      }

      message.success(`Firm ${editData ? "updated" : "added"} successfully`);
      handleCancel();
      fetchData();
    } catch (err) {
      message.error("Something went wrong while saving data");
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await deleteFirm(id);

      if (!res.data.success) {
        message.error(res.data.message || "Failed to delete data");
        return;
      }

      message.success(`Location deleted successfully`);
      handleCancel();
      fetchData();
    } catch (err) {
      message.error("Something went wrong while deleting data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const columns = [
    {
      title: "Firm Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (value) => {
        return value.locationName;
      },
      sorter: (a, b) =>
        a.location.locationName.localeCompare(b.location.locationName),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "right",
      render: (value, record, index) => {
        return (
          <>
            <Tooltip title="Edit">
              <EditOutlined
                className="tableActionButton"
                onClick={() => {
                  setEditData(record);
                  setIsModalOpen(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <DeleteOutlined
                className="tableActionButton"
                onClick={() => {
                  deleteData(value);
                }}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>Firm</div>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add
        </Button>
      </Flex>

      <br />

      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={firmData}
      />

      <Modal
        title="Firm Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <FirmForm editData={editData} saveData={saveData} firmData={firmData} />
      </Modal>
    </div>
  );
};

export default Firm;
