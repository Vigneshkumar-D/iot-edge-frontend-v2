import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";

export const GetColumnSearchProps = ({
  dataIndex,
  searchInputRef,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
}) => {
  let handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  //   let handleReset = (clearFilters) => {
  //     clearFilters();
  //     setSearchText("");
  //   };
  let handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  };
};

// sample data. refer user list page
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: "30%",
//       ...GetColumnSearchProps({
//         dataIndex: "name",
//         searchInputRef: searchInput,
//         searchText,
//         setSearchText,
//         searchedColumn,
//         setSearchedColumn,
//       }),
//     },

export const GetFirstOrderColumnSearchProps = ({
  dataIndex,
  searchInputRef,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchedColumn,
}) => {
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  const getValue = (obj, path) =>
    Array.isArray(path)
      ? path.reduce((acc, key) => acc?.[key], obj)
      : obj?.[path];

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${
            Array.isArray(dataIndex)
              ? dataIndex
                  .join(" ")
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()
              : dataIndex.replace(/([A-Z])/g, " $1").toLowerCase()
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const recordValue = getValue(record, dataIndex);
      return recordValue
        ?.toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    render: (text) =>
      JSON.stringify(searchedColumn) === JSON.stringify(dataIndex) ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  };
};

// sample data
// {
//       title: "Asset",
//       dataIndex: ["asset", "name"],
//       key: "asset",
//       sorter: (a, b) => a.asset.name.localeCompare(b.asset.name),
//       sortDirections: ["descend", "ascend"],
//       ...GetFirstOrderColumnSearchProps({
//         dataIndex: ["asset", "name"],
//         searchInputRef: searchInput,
//         searchText,
//         setSearchText,
//         searchedColumn,
//         setSearchedColumn,
//       }),
//     },
