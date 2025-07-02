// import { useEffect, useRef, useState } from "react";
// import { Button, Table, Flex, Modal, Tooltip, message } from "antd";
// import {
//   fetchFirm,
//   postFirm,
//   putFirm,
//   deleteFirm,
// } from "../../../../service/customService/configuration/firm/firmService";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import FirmForm from "./firm-form";

// function buildTree(data) {
//   const nodeMap = {};
//   const tree = [];

//   // Step 1: Add all nodes to a map
//   data.forEach((item) => {
//     nodeMap[item.id] = { ...item, key: item.id, children: [] };
//   });

//   // Step 2: Link children to their parent
//   data.forEach((item) => {
//     if (item.parent && item.parent.id) {
//       const parentNode = nodeMap[item.parent.id];
//       if (parentNode) {
//         parentNode.children.push(nodeMap[item.id]);
//       }
//     } else {
//       tree.push(nodeMap[item.id]); // root node
//     }
//   });

//   return tree;
// }

// const Firm = () => {
//   const [firmData, setFirmData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const searchInput = useRef(null);

//   const fetchData = async () => {
//     try {
//       const res = await fetchFirm();

//       if (!res.data.success) {
//         message.error(res.data.message || "Failed to fetch firms");
//         return;
//       }

//       const dataWithKeys = res.data.data.map((item) => ({
//         ...item,
//         key: item.id,
//       }));
//       setFirmData(dataWithKeys);
//     } catch (err) {
//       message.error("Network error while fetching firms");
//     }
//   };

//   const saveData = async (props) => {
//     try {
//       let res;
//       if (editData) {
//         res = await putFirm(props, editData.id);
//       } else {
//         res = await postFirm(props);
//       }

//       if (!res.data.success) {
//         message.error(res.data.message || "Failed to save data");
//         return;
//       }

//       message.success(`Firm ${editData ? "updated" : "added"} successfully`);
//       handleCancel();
//       fetchData();
//     } catch (err) {
//       message.error("Something went wrong while saving data");
//     }
//   };

//   const deleteData = async (id) => {
//     try {
//       const res = await deleteFirm(id);

//       if (!res.data.success) {
//         message.error(res.data.message || "Failed to delete data");
//         return;
//       }

//       message.success(`Location deleted successfully`);
//       handleCancel();
//       fetchData();
//     } catch (err) {
//       message.error("Something went wrong while deleting data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setEditData(null);
//   };

//   const columns = [
//     {
//       title: "Firm Name",
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => a.name.localeCompare(b.name),
//     },
//     {
//       title: "Location",
//       dataIndex: "location",
//       key: "location",
//       render: (value) => {
//         return value.locationName;
//       },
//       sorter: (a, b) =>
//         a.location.locationName.localeCompare(b.location.locationName),
//     },
//     {
//       title: "",
//       dataIndex: "id",
//       key: "id",
//       align: "right",
//       render: (value, record, index) => {
//         return (
//           <>
//             <Tooltip title="Edit">
//               <EditOutlined
//                 className="tableActionButton"
//                 onClick={() => {
//                   setEditData(record);
//                   setIsModalOpen(true);
//                 }}
//               />
//             </Tooltip>
//             <Tooltip title="Delete">
//               <DeleteOutlined
//                 className="tableActionButton"
//                 onClick={() => {
//                   deleteData(value);
//                 }}
//               />
//             </Tooltip>
//           </>
//         );
//       },
//     },
//   ];

//   return (
//     <div>
//       <Flex justify="space-between" align="center">
//         <div style={{ fontSize: "1rem", fontWeight: 700 }}>Firm</div>
//         <Button onClick={() => setIsModalOpen(true)} type="primary">
//           Add
//         </Button>
//       </Flex>

//       <br />

//       <Table
//         scroll={{ x: "max-content" }}
//         columns={columns}
//         dataSource={firmData}
//       />

//       <Modal
//         title="Firm Form"
//         centered
//         closable
//         open={isModalOpen}
//         footer={false}
//         onCancel={handleCancel}
//       >
//         <FirmForm
//           editData={editData}
//           saveData={saveData}
//           firmData={firmData}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default Firm;

import dagre from "dagre";
import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Modal, Flex, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  fetchFirm,
  postFirm,
  putFirm,
  deleteFirm,
} from "../service/firmService";
import FirmForm from "./firm-form";

const nodeWidth = 200;
const nodeHeight = 100;

function buildTree(data) {
  const nodeMap = {};
  const tree = [];

  data.forEach((item) => {
    nodeMap[item.id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parent && item.parent.id) {
      nodeMap[item.parent.id]?.children.push(nodeMap[item.id]);
    } else {
      tree.push(nodeMap[item.id]);
    }
  });

  return tree;
}

function buildFlowElements(treeData) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });

  const nodes = [];
  const edges = [];

  const traverse = (item) => {
    const id = item.id.toString();
    const parentId = item.parent?.id?.toString();

    g.setNode(id, { width: nodeWidth, height: nodeHeight });

    nodes.push({
      id,
      data: {
        label: (
          <div style={{ padding: 10 }}>
            <b>{item.name}</b>
            <br />
            <small>{item.location?.locationName || "No Location"}</small>
            <br />
            <EditOutlined
              onClick={(e) => {
                e.stopPropagation();
                item._onEdit(item);
              }}
              style={{ marginRight: 8 }}
            />
            <DeleteOutlined
              onClick={(e) => {
                e.stopPropagation();
                item._onDelete(item.id);
              }}
            />
          </div>
        ),
      },
      position: { x: 0, y: 0 },
      draggable: false,
      style: {
        border: "1px solid #777",
        borderRadius: "8px",
        padding: "8px",
        background: "#fff",
      },
    });

    if (parentId) {
      g.setEdge(parentId, id);
      edges.push({ id: `${parentId}-${id}`, source: parentId, target: id });
    }

    item.children.forEach(traverse);
  };

  treeData.forEach(traverse);

  dagre.layout(g);

  const positionedNodes = nodes.map((node) => {
    const { x, y } = g.node(node.id);
    return {
      ...node,
      position: { x, y },
    };
  });

  return { nodes: positionedNodes, edges };
}

const sampleFirmData = [
  {
    id: 1,
    name: "Global Corp",
    location: { id: 101, locationName: "USA" },
    parent: null,
  },
  {
    id: 2,
    name: "Tech Division",
    location: { id: 102, locationName: "California" },
    parent: { id: 1 },
  },
  {
    id: 3,
    name: "AI Research Lab",
    location: { id: 103, locationName: "San Francisco" },
    parent: { id: 2 },
  },
  {
    id: 4,
    name: "Asia HQ",
    location: { id: 104, locationName: "India" },
    parent: { id: 1 },
  },
  {
    id: 5,
    name: "South Zone Office",
    location: { id: 105, locationName: "Tamil Nadu" },
    parent: { id: 4 },
  },
  {
    id: 6,
    name: "Chennai Tech Park",
    location: { id: 106, locationName: "Chennai" },
    parent: { id: 5 },
  },
];

const Firm = () => {
  const [firmData, setFirmData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editData, setEditData] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const fetchData = async () => {
    try {
      const res = await fetchFirm();
      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch firms");
        return;
      }
      // const items = res.data.data.map((item) => ({
      //   ...item,
      //   _onEdit: (data) => {
      //     setEditData(data);
      //     setIsModalOpen(true);
      //   },
      //   _onDelete: async (id) => {
      //     await deleteData(id);
      //   },
      // }));
      const items = sampleFirmData.map((item) => ({
        ...item,
        _onEdit: (data) => {
          setEditData(data);
          setIsModalOpen(true);
        },
        _onDelete: async (id) => {
          await deleteData(id);
        },
      }));
      const tree = buildTree(items);
      const { nodes, edges } = buildFlowElements(tree);
      setFirmData(items);
      setNodes(nodes);
      setEdges(edges);
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
      message.success(`Firm deleted successfully`);
      fetchData();
    } catch (err) {
      message.error("Something went wrong while deleting data");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: "70vh" }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>Firm</div>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add
        </Button>
      </Flex>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>

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
