import { useEffect, useRef, useState } from "react";
import { Button, Table, Flex, Modal, Tooltip, message } from "antd";
import {
  fetchRole,
  postRole,
  putRole,
  deleteRole,
} from "../service/roleService";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RoleForm from "./role-form";

const Role = () => {
  const [roleData, setRoleData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetchRole();

      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch firms");
        return;
      }

      const dataWithKeys = res.data.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setRoleData(dataWithKeys);
    } catch (err) {
      message.error("Network error while fetching firms");
    }
  };

  const saveData = async (props) => {
    try {
      let res;
      if (editData) {
        res = await putRole(props, editData.id);
      } else {
        res = await postRole(props);
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
      const res = await deleteRole(id);

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
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
      sorter: (a, b) => a.roleName.localeCompare(b.roleName),
    },
    {
      title: "Firm",
      dataIndex: ["firm", "name"],
      key: "firm",
      sorter: (a, b) => a.firm.name.localeCompare(b.firm.name),
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.active === value,
      render: (value) => (value ? "Active" : "Inactive"),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      align: "center",
      width:"100px",
      render: (value, record, index) => {
        return (
          value === 1 ||
          value === 2 ||
          value === 3 || (
            <Flex justify="space-around">
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
            </Flex>
          )
        );
      },
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>Role</div>
        <Button onClick={() => setIsModalOpen(true)} className="custom-ant-btn">
          Add
        </Button>
      </Flex>

      <br />

      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={roleData}
      />

      <Modal
        title="Firm Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <RoleForm editData={editData} saveData={saveData} firmData={roleData} />
      </Modal>
    </div>
  );
};

export default Role;
