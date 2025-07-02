import React, { useEffect, useRef, useState } from "react";
import { Button, Table, Flex, Modal, Row, Col, Select, message } from "antd";
import { fetchShifts } from "../../../shift/shift/service/shiftService";
import dayjs from "dayjs";
import ShiftForm from "./mqtt-form";
import { GetColumnSearchProps } from "../../../../../utils/getColumnSearchProps";
const Data = [
  {
    id: 1,
    shiftName: "Morning Shift",
    startTime: "2025-06-14T06:00:00Z",
    endTime: "2025-06-14T14:00:00Z",
    totalDuration: 480, // in minutes (8 hours)
    status: "SCHEDULED",
    breaks: [
      {
        id: 101,
        breakName: "Tea Break",
        startTime: "2025-06-14T09:00:00Z",
        endTime: "2025-06-14T09:15:00Z",
        duration: 15,
      },
      {
        id: 102,
        breakName: "Lunch Break",
        startTime: "2025-06-14T12:00:00Z",
        endTime: "2025-06-14T12:30:00Z",
        duration: 30,
      },
    ],
  },
  {
    id: 2,
    shiftName: "Evening Shift",
    startTime: "2025-06-14T14:00:00Z",
    endTime: "2025-06-14T22:00:00Z",
    totalDuration: 480,
    status: "SCHEDULED",
    breaks: [
      {
        id: 103,
        breakName: "Tea Break",
        startTime: "2025-06-14T17:00:00Z",
        endTime: "2025-06-14T17:15:00Z",
        duration: 15,
      },
    ],
  },
  {
    id: 3,
    shiftName: "Night Shift",
    startTime: "2025-06-14T22:00:00Z",
    endTime: "2025-06-15T06:00:00Z",
    totalDuration: 480,
    status: "SUSPENDED",
    breaks: [],
  },
];

const MQTTList = () => {
  const [shiftData, setShiftData] = useState(Data);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const fetchData = async () => {
    try {
      const res = await fetchShifts();
      const dataWithKeys = res.data.map((item) => ({
        ...item,
        key: item.id,
      }));
      setShiftData(dataWithKeys);
      setFilteredData(dataWithKeys);
    } catch (err) {
      message.error("Failed to fetch shift data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...shiftData];
    if (selectedStatus?.length > 0) {
      result = result.filter((item) => selectedStatus.includes(item.status));
    }
    setFilteredData(result);
  }, [selectedStatus, shiftData]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Shift Name",
      dataIndex: "shiftName",
      key: "shiftName",
      sorter: (a, b) => a.shiftName.length - b.shiftName.length,
      ...GetColumnSearchProps({
        dataIndex: "shiftName",
        searchInputRef: searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
      }),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (text) => dayjs(text).format("HH:mm A"),
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => dayjs(text).format("HH:mm A"),
    },
    {
      title: "Total Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
      render: (minutes) => `${minutes} mins`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>MQTT</div>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add
        </Button>
      </Flex>

      <br />
      <Row gutter={[10, 10]}>
        <Col span={6}>
          <Select
            mode="multiple"
            allowClear
            placeholder="Status"
            value={selectedStatus}
            onChange={(values) => {
              setSelectedStatus(values);
            }}
            options={Array.from(
              new Map(
                Data.filter((item) => item.status) // avoid undefined
                  .map((item) => [item, item.status])
              ).values()
            ).map((role) => ({
              value: role,
              label: role,
            }))}
            style={{
              width: "100%",
              minHeight: "50%",
              marginBottom: "2rem",
            }}
          />
        </Col>
      </Row>

      <Table columns={columns} dataSource={filteredData} />

      <Modal
        title="MQTT Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <ShiftForm />
      </Modal>
    </div>
  );
};

export default MQTTList;
