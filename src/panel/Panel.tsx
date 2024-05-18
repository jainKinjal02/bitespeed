import { useState, useEffect } from "react";

export default function Panel({editMode, setEditMode, selectedNode, updateNodeLabel, nodes, edges} : any) {
    const [label, setLabel] = useState("");
    const [saveStatus, setSaveStatus] = useState({ color: 'black', message: 'Save Flow' });

    useEffect(() => {
        if (selectedNode) {
          setLabel(selectedNode.data.label);
        }
      }, [selectedNode]);

    const handleLabelChange = (e:any) => {
        setLabel(e.target.value);
    };

    const handleSubmit = () => {
        updateNodeLabel(selectedNode.id, label);
        setEditMode(false);
    };

    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const saveFlow = () => {
        const unconnectedNodes = nodes.filter((node: any) => 
            !edges.some((edge: any) => edge.source === node.id || edge.target === node.id)
        );

        if (unconnectedNodes.length > 0) {
            setSaveStatus({ color: 'red-500', message: 'Cannot Save Flow' });
        } else {
            setSaveStatus({ color: 'green-500', message: 'Saved' });
        }

        // Reset the save status after 2 seconds
        setTimeout(() => {
        setSaveStatus({ color: 'black', message: 'Save Flow' });
        }, 1500);
    };

  return (
    <div className="w-1/5 bg-gray-100 rounded-md mr-4 mb-4 flex flex-col items-center justify-center border-l-1 border-black">
      {!editMode && 
        <div className="flex flex-col items-center space-y-96">
            <div>
                <p className="mb-3">Drag New Nodes</p>
                <div className="h-30 w-50 rounded-lg bg-white border p-3" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                    Text Message
                </div>
            </div>
            <>
            <button onClick={saveFlow} className={`m-2 p-2 text-white rounded-md bg-${saveStatus.color}`}>{saveStatus.message}</button>
            </>
      </div>      
      }
      {editMode && 
        <div>
        {selectedNode && (
          <div className="flex flex-col items-center justify-center">
            <input value={label} onChange={handleLabelChange} className="p-1.5 rounded-md m-2 text-center"/>
            <button onClick={handleSubmit} className="m-2 p-2 bg-black text-white rounded-md">Update Message</button>
          </div>
        )}
      </div>
      }
    </div>
  );
}