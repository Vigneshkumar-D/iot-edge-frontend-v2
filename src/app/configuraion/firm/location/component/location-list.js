import dagre from "dagre";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button, Modal, Flex, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  fetchLocations,
  postLocation,
  putLocation,
  deleteLocation,
} from "../service/locationService";
import LocationForm from "./location-form";

const sampleData = [
  {
    id: 1,
    locationName: "India",
    category: "Country",
    latitude: "20.5937",
    longitude: "78.9629",
    parent: null,
  },
  {
    id: 2,
    locationName: "Tamil Nadu",
    category: "State",
    latitude: "11.1271",
    longitude: "78.6569",
    parent: { id: 1 },
  },
  {
    id: 3,
    locationName: "Chennai",
    category: "City",
    latitude: "13.0827",
    longitude: "80.2707",
    parent: { id: 2 },
  },
  {
    id: 4,
    locationName: "Karnataka",
    category: "State",
    latitude: "15.3173",
    longitude: "75.7139",
    parent: { id: 1 },
  },
  {
    id: 5,
    locationName: "Bangalore",
    category: "City",
    latitude: "12.9716",
    longitude: "77.5946",
    parent: { id: 4 },
  },
  {
    id: 6,
    locationName: "USA",
    category: "Country",
    latitude: "37.0902",
    longitude: "-95.7129",
    parent: { id: 4 },
  },
  {
    id: 7,
    locationName: "California",
    category: "State",
    latitude: "36.7783",
    longitude: "-119.4179",
    parent: { id: 6 },
  },
  {
    id: 8,
    locationName: "San Francisco",
    category: "City",
    latitude: "37.7749",
    longitude: "-122.4194",
    parent: { id: 7 },
  },
];

// Build parent-child tree structure
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

const nodeWidth = 180;
const nodeHeight = 100;

function buildFlowElements(treeData) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" }); // Top to Bottom

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
            <b>{item.locationName}</b>
            <br />
            <small>{item.category}</small>
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
      position: { x: 0, y: 0 }, // temporary
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

  // Apply layout
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

const Location = () => {
  const [locationData, setLocationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const fetchData = async () => {
    try {
      const res = await fetchLocations();
      if (!res.data.success) {
        message.error(res.data.message || "Failed to fetch locations");
        return;
      }
      const items = sampleData.map((item) => ({
        ...item,
        _onEdit: (d) => {
          setEditData(d);
          setIsModalOpen(true);
        },
        _onDelete: async (id) => {
          await deleteData(id);
        },
      }));
      const tree = buildTree(items);
      const { nodes, edges } = buildFlowElements(tree);
      setLocationData(items);
      setNodes(nodes);
      setEdges(edges);
    } catch (err) {
      message.error("Network error while fetching locations");
    }
  };

  const saveData = async (props) => {
    try {
      let res;
      if (editData) {
        res = await putLocation(props, editData.id);
      } else {
        res = await postLocation(props);
      }

      if (!res.data.success) {
        message.error(res.data.message || "Failed to save data");
        return;
      }

      message.success(
        `Location ${editData ? "updated" : "added"} successfully`
      );
      handleCancel();
      fetchData();
    } catch (err) {
      message.error("Something went wrong while saving data");
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await deleteLocation(id);
      if (!res.data.success) {
        message.error(res.data.message || "Failed to delete data");
        return;
      }
      message.success(`Location deleted successfully`);
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
        <div style={{ fontSize: "1rem", fontWeight: 700 }}>Location</div>
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
        title="Location Form"
        centered
        closable
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <LocationForm
          editData={editData}
          saveData={saveData}
          locationData={locationData}
        />
      </Modal>
    </div>
  );
};

export default Location;
