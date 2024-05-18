import type { NodeProps } from "reactflow";

export type TextNodeData = {
  label?: string;
  connectable?: true;
};

export function TextNode({
  data,
}: NodeProps<TextNodeData>) {
  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}
    </div>
  );
}
