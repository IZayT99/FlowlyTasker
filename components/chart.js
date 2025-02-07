import React, { useState } from "react";
import ReactFlow, { MiniMap, Controls, Background, addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", type: "input", data: { label: "Start" }, position: { x: 250, y: 5 } },
  { id: "2", data: { label: "Process" }, position: { x: 250, y: 100 } },
  { id: "3", type: "output", data: { label: "End" }, position: { x: 250, y: 200 } }
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }, { id: "e2-3", source: "2", target: "3" }];

export default function Chart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));
  const onEdgesChange = (changes) => setEdges((eds) => applyEdgeChanges(changes, eds));
  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <div className="h-screen w-full border-2 rounded-lg">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        onConnect={onConnect} 
        fitView
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
