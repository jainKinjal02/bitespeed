import type { Node, NodeTypes } from "reactflow";
import { TextNode } from "./TextNode";

export const initialNodes = [
  { id: "1", type: "default", position: { x: 0, y: 0 }, data: { label: "Text Message 1" } },
  { id: "2", type: "default", position: { x: 100, y: 100 }, data: { label: "Output Message" } },
  { id: "3", type: "default", position: { x: 300, y: -100 }, data: { label: "Text Message 2" } },
] satisfies Node[];

export const nodeTypes = {
  // custom node types for future extensiility
  "text-node" : TextNode,
} satisfies NodeTypes;