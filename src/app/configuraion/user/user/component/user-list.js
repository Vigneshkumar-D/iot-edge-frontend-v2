import { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Modal,
  Tooltip,
  message,
  Card,
  Row,
  Col,
  Select,
  Input,
  Tag,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchUser,
  postUser,
  putUser,
  deleteUser,
} from "../service/userService";
import UserForm from "./user-form";
import { FaUserAltSlash, FaUser } from "react-icons/fa";
import { ChatPageTimeFormat } from "../../../../../utils/formates";

const User = () => {
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState({
    username: "",
    role: "",
    mobile: "",
    status: [],
  });

  const fetchData = async () => {
    try {
      const res = await fetchUser();
      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch users");
        return;
      }
      const dataWithKeys = res.data.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setUserData(dataWithKeys);
      setFilteredData(dataWithKeys);
    } catch (err) {
      message.error("Network error while fetching users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...userData];
    if (search.username)
      result = result.filter((u) =>
        u.username.toLowerCase().includes(search.username.toLowerCase())
      );
    if (search.role)
      result = result.filter((u) =>
        u.role?.roleName?.toLowerCase().includes(search.role.toLowerCase())
      );
    if (search.mobile)
      result = result.filter((u) => u.mobileNumber.includes(search.mobile));
    if (search.status.length > 0)
      result = result.filter((u) => search.status.includes(u.active));
    setFilteredData(result);
  }, [search, userData]);

  const saveData = async (props) => {
    try {
      let res;
      if (editData) {
        res = await putUser(props, editData.id);
      } else {
        res = await postUser(props);
      }
      if (!res.data.success) {
        message.error(res.data.message || "Failed to save data");
        return;
      }
      message.success(`User ${editData ? "updated" : "added"} successfully`);
      handleCancel();
      fetchData();
    } catch (err) {
      message.error("Error while saving user data");
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await deleteUser(id);
      if (!res.data.success) {
        message.error(res.data.message || "Failed to delete data");
        return;
      }
      message.success("User deleted successfully");
      handleCancel();
      fetchData();
    } catch (err) {
      message.error("Error while deleting user");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>User</div>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add
        </Button>
      </Flex>
      <br />

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        <Col span={6}>
          <Input
            placeholder="Filter by Username"
            value={search.username}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Filter by Role"
            value={search.role}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, role: e.target.value }))
            }
          />
        </Col>
        <Col span={6}>
          <Input
            placeholder="Filter by Mobile"
            value={search.mobile}
            onChange={(e) =>
              setSearch((prev) => ({ ...prev, mobile: e.target.value }))
            }
          />
        </Col>
        <Col span={6}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by Status"
            style={{ width: "100%" }}
            value={search.status}
            onChange={(val) => setSearch((prev) => ({ ...prev, status: val }))}
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
          />
        </Col>
      </Row>
      <br />

      <Row gutter={[16, 16]}>
        {filteredData.map((item) => (
          <Col span={12} key={item.id}>
            <Card size="small" hoverable>
              <Row gutter={12} align="middle">
                <Col flex="80px">
                  {item.profileImage ? (
                    <img
                      src={`data:image/jpeg;base64,${item.profileImage}`}
                      alt="Profile"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: "#fff",
                      }}
                    >
                      N/A
                    </div>
                  )}
                </Col>
                <Col flex="auto">
                  <Flex justify="space-between">
                    <div>
                      <strong>{item.username}</strong>{" "}
                      <span style={{ color: "#999", fontSize: 12 }}>
                        ({item.role?.roleName || "No Role"})
                      </span>
                    </div>
                    <div>
                      {item.id === 1
                      ? // || item.id === 2 || item.id === 3
                        []
                      : [
                          <Tooltip title="Edit" key="edit">
                            <EditOutlined
                              style={{ marginRight: "10px" }}
                              onClick={() => {
                                setEditData(item);
                                setIsModalOpen(true);
                              }}
                            />
                          </Tooltip>,
                          <Tooltip title="Delete" key="delete">
                            <DeleteOutlined
                              onClick={() => deleteData(item.id)}
                            />
                          </Tooltip>,
                        ]}
                    </div>
                  </Flex>
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    {item.mobileNumber} | {item.email} |{" "}
                    {item.active ? (
                      <>
                        <FaUser /> <Tag color="green">Active</Tag>
                      </>
                    ) : (
                      <>
                        <FaUserAltSlash /> <Tag color="red">Inactive</Tag>
                      </>
                    )}
                    <br />
                    <br />
                    <Flex justify="end">
                      Last Login:{" "}
                      {item.lastLogin
                        // ? new Date(item.lastLogin).toLocaleString()
                        ? ChatPageTimeFormat(item.lastLogin)
                        : "Never"}
                    </Flex>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="User Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <UserForm editData={editData} saveData={saveData} />
      </Modal>
    </div>
  );
};

export default User;
