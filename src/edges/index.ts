import type { Edge, EdgeTypes } from "reactflow";

export enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}

export const edgeTypes = {
  // custom edge types if needed
} satisfies EdgeTypes;

export const initialEdges = [
  { id: "1->2", source: "1", target: "2", animated: false, markerEnd: {type: MarkerType.ArrowClosed}},
] satisfies Edge[];