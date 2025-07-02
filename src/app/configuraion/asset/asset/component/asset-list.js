import { useEffect, useRef, useState } from "react";
import { Button, Table, Flex, Modal, Row, Col, Select, message } from "antd";
import AssetForm from "./asset-form";
import { fetchAsset } from "../service/assetService";
import { GetColumnSearchProps, GetFirstOrderColumnSearchProps } from "../../../../../utils/getColumnSearchProps";
const Data = [
  {
    key: 1,
    id: 1,
    shift: { id: 101, name: "Morning Shift" },
    asset: { id: 201, name: "Machine A" },
    firmId: 1,
    shiftDate: "2025-06-14T08:00:00Z",
    startDate: "2025-06-14T08:00:00Z",
    endDate: "2025-06-14T16:00:00Z",
    doneBy: 1001,
  },
  {
    key: 2,
    id: 2,
    shift: { id: 102, name: "Evening Shift" },
    asset: { id: 202, name: "Machine B" },
    firmId: 1,
    shiftDate: "2025-06-14T16:00:00Z",
    startDate: "2025-06-14T16:00:00Z",
    endDate: "2025-06-14T23:00:00Z",
    doneBy: 1002,
  },
];

const Asset = () => {
  const [shiftData, setShiftData] = useState(Data);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const fetchData = async () => {
    try {
      const res = await fetchAsset();
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
      title: "Shift",
      dataIndex: ["shift", "name"],
      key: "shift",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
      ...GetFirstOrderColumnSearchProps({
        dataIndex: ["shift", "name"],
        searchInputRef: searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
      }),
    },
    {
      title: "Asset",
      dataIndex: ["asset", "name"],
      key: "asset",
      sorter: (a, b) => a.asset.name.localeCompare(b.asset.name),
      sortDirections: ["descend", "ascend"],
      ...GetFirstOrderColumnSearchProps({
        dataIndex: ["asset", "name"],
        searchInputRef: searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
      }),
    },
    {
      title: "Shift Date",
      dataIndex: "shiftDate",
      key: "shiftDate",
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: "Start Time",
      dataIndex: "startDate",
      key: "startDate",
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: "End Time",
      dataIndex: "endDate",
      key: "endDate",
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: "Done By",
      dataIndex: "doneBy",
      key: "doneBy",
      sorter: (a, b) => a.doneBy.length - b.doneBy.length,
      sortDirections: ["descend", "ascend"],
      ...GetColumnSearchProps({
        dataIndex: "doneBy",
        searchInputRef: searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
      }),
    },
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>Asset</div>
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
        title="Asset Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <AssetForm />
      </Modal>
    </div>
  );
};

export default Asset;
