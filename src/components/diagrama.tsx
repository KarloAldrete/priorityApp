'use client';

import { useCallback, useEffect, useState } from 'react';

import '@xyflow/react/dist/style.css';
import { ReactFlow, Background, BackgroundVariant, applyEdgeChanges, applyNodeChanges, Node, Edge } from '@xyflow/react';
import CustomNode from '@/components/customNode';

export interface Actividad {
    tipo: 'subtarea-completada' | 'comentario';
    descripcion: string;
    fecha: Date;
}

export interface Comentario {
    usuario: string;
    mensaje: string;
    fecha: Date;
}

export interface Subtarea {
    nombre: string;
    descripcion: string;
    completed: boolean;
    estado: string;
}

export interface Tarea {
    nombre: string;
    descripcion: string;
    'Tiempo de desarrollo': string;
    estado: string;
    tareas: Subtarea[];
    etapa: string;
    actividades: Actividad[];
    comentarios: Comentario[];
}

interface ProjectData {
    id: number;
    owner: string;
    title: string;
    data: {
        fases: Tarea[];
    };
};

const nodeTypes = {
    custom: CustomNode,
};

const initialEdges: Edge[] = [];

const alturaNodoInitial = (tareasLenght: number) => {

    const alturaNodo = tareasLenght * 80 + tareasLenght * 20;

    return alturaNodo / 2 - 40;
}

export const Diagrama = ({ projectData }: { projectData: ProjectData }) => {

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState(initialEdges);

    useEffect(() => {
        const initialNode = {
            id: '0',
            type: 'custom',
            data: { name: 'INICIO', isInicio: true },
            position: { x: 0, y: alturaNodoInitial(projectData.data.fases.length) },
        };

        const mappedNodes = projectData.data.fases.map((tarea, index) => ({
            id: `${index + 1}`,
            type: 'custom',
            data: { name: tarea.nombre, tareasLenght: tarea.tareas.length },
            position: { x: 500, y: index * (80 + 20) }, // Eliminar las comillas alrededor de index
        }));

        setNodes([initialNode, ...mappedNodes]);

        const newEdges = mappedNodes.map((_, index) => ({
            id: `e0-${index + 1}`,
            source: '0',
            target: `${index + 1}`,
            style: { stroke: '#7174FE' },
            animated: true,
        }));

        setEdges([...initialEdges, ...newEdges]);

    }, [projectData]);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{
                    padding: 0.2,
                }}
                className='!bg-[#F1F5F9] !rounded-xl'
            >
                <Background
                    variant={BackgroundVariant.Lines}
                    gap={54}
                    color="#E3E7EA"
                />

            </ReactFlow>
        </>
    )
}