"use client";
import React from 'react';
import ReactFlow, { MiniMap, Controls, Background, Handle } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import 'react-flow-renderer/dist/theme-default.css';
import Image from "next/image";
// import './roadmap.css'

// Custom Node Component with Handles
const CustomNode = ({ data }) => {
    const [state, setState] = React.useState(false);
    return (
        <div className={` p-2 rounded-[50%] relative bg-white h-[84px] ${data.ground} w-[180px] flex justify-center items-center` }>
            <Handle
                type="target"
                position="top"
                className={'bg-black'}
                style={{ background: '#000', width: '0px', height: '0px' ,opacity:0}}
            />
            <Image src={data.src} className={'absolute z-2 bottom-0'} alt={''} width={200} height={900} onMouseEnter={()=>alert('d')}/>
            {/*<Image src={'/image/boss1.png'} className={'absolute z-3 bottom-[53px] left-[25px]'} alt={''} width={130} height={900} />*/}
            {/*<div className={'absolute bottom-0 left-0 w-full h-[102px] test rounded-[50%]'}></div>*/}
            <Handle
                type="source"
                position="bottom"
                style={{ background: 'transparent', width: '0px', height: '0px',opacity:0 }}
            />
        </div>
    );
};

// Define node types
const nodeTypes = {
    custom: CustomNode,
};

// Define static nodes with custom styles and data
const initialNodes = [
    {
        id: '1',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: {
            src:'/image/m1.png',
            ground:'g1'
        },
    },
    {
        id: '2',
        type: 'custom',
        position: { x: 400, y: 200 }, // Adjusted spacing
        data: {
            label: 'Design Phase',
            icon: '🎨',
            background: '#cce5ff',
            borderColor: '#0052cc',
            color: '#003087',
            src:'/image/m2.png',
            ground:'g2'

        },
    },
    {
        id: '3',
        type: 'custom',
        position: { x: 0, y: 400 },
        data: {
            label: 'Development',
            background: '#fff3cd',
            borderColor: '#ffca2c',
            color: '#664d03',
            src:'/image/m3.png',
            ground:'g3'

        },
    },
/*    {
        id: '4',
        type: 'custom',
        position: { x: 400, y: 600 },
        data: {
            label: 'Testing',
            background: '#e2e3e5',
            borderColor: '#6c757d',
            color: '#343a40',
            src:'/image/m1.png',
            ground:'g4'

        },
        className: 'custom-testing-node',
    },
    {
        id: '5',
        type: 'custom',
        position: { x: 0, y: 800 },
        data: {
            label: 'Deployment',
            background: '#f8d7da',
            borderColor: '#dc3545',
            color: '#721c24',
            src:'/image/m1.png',
            ground:'g5'

        },
    },*/
];

// Define edges with verified source and target IDs
const initialEdges = [
    { id: 'e1-2', source: '1', target: '2',type:'bezier', animated: true, style: { strokeLineCap:'round',stroke: '#fdfdfd', strokeWidth: 8,strokeDasharray: 'none' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#fdfdfd', strokeWidth: 8,strokeDasharray: 'none'  } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#828282', strokeWidth: 5,strokeDasharray: 'none'  } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#828282', strokeWidth: 5,strokeDasharray: 'none'  } },
];

const Roadmap = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={nodeTypes}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={true}
                // zoomOnScroll={true}
                // panOnScroll={true}
                fitView
            >

                {/*<Controls />*/}
                <Background  gap={20} size={0} className={'bg-[#000]'} />
            </ReactFlow>
        </div>
    );
};

export default Roadmap;
