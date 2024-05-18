import { useCallback, useRef, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  ReactFlowInstance,
} from "reactflow";

import "reactflow/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes, MarkerType } from "./edges";
import Panel from "./panel/Panel";

let id = 3;
const getId = () => `${++id}`;

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [editMode, setEditMode]  = useState<boolean>(false);

  const onConnect = useCallback((connection:any) => {
    setEdges((currentEdges) => {
      const { source } = connection;
      const sourceAlreadyConnected = currentEdges.some(edge => 
        edge.source === source
      );
      if (!sourceAlreadyConnected) {
        return addEdge(connection, currentEdges);
      } 
      return currentEdges;
    });
  }, [setEdges]);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        console.error("ReactFlow instance is not initialized");
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        console.error("Node type invalid");
        return;
      }
      
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!position) {
        console.error("Failed to get node position");
        return; // Exit if position is undefined
      }

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "New Text Message" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onNodeClick = useCallback((_e:any, node:any) => {
    setSelectedNode(node);
    setEditMode(true);
  }, []);

  const handleUpdateNodeLabel = useCallback((nodeId:any, newLabel:any) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data: { ...node.data, label: newLabel } };
      }
      return node;
    }));
  }, [setNodes]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full text-center p-2 z-1 h-4 font-medium">
        BiteSpeed
      </div>
      <div className="flex flex-row w-full flex-grow h-full relative">
        <ReactFlowProvider>
          <div className="w-4/5 h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              edges={edges}
              edgeTypes={edgeTypes}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              fitView
              onNodeClick={onNodeClick}
              defaultEdgeOptions={{animated : false, markerEnd: {type: MarkerType.ArrowClosed}}}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
          <Panel editMode={editMode} setEditMode={setEditMode} selectedNode={selectedNode} updateNodeLabel={handleUpdateNodeLabel} nodes={nodes} edges={edges}/>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
